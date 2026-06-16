import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const GROQ_VISION_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct'
const GROQ_CHAT_COMPLETIONS_URL = 'https://api.groq.com/openai/v1/chat/completions'

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (error) {
        reject(error)
      }
    })

    request.on('error', reject)
  })
}

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(payload))
}

function groqWorkRecognitionPlugin(env) {
  return {
    name: 'groq-work-recognition',
    configureServer(server) {
      server.middlewares.use('/api/recognize-work', async (request, response) => {
        if (request.method !== 'POST') {
          sendJson(response, 405, { error: 'Method not allowed' })
          return
        }

        if (!env.GROQ_API_KEY) {
          sendJson(response, 500, { error: 'GROQ_API_KEY is not set.' })
          return
        }

        try {
          const { imageDataUrl, question } = await readJsonBody(request)

          if (!imageDataUrl?.startsWith('data:image/png;base64,')) {
            sendJson(response, 400, { error: 'A PNG data URL is required.' })
            return
          }

          const groqResponse = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${env.GROQ_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: GROQ_VISION_MODEL,
              messages: [
                {
                  role: 'user',
                  content: [
                    {
                      type: 'text',
                      text: [
                        'You are reading a primary school maths student canvas.',
                        'Do not solve the maths problem yourself.',
                        `Problem shown to student: ${question ?? 'unknown'}.`,
                        'Read only the final answer the student wrote in the final-answer boxes near the bottom.',
                        'Return strict JSON only: {"answer":"digits only or empty string","confidence":0 to 1}.',
                      ].join(' '),
                    },
                    {
                      type: 'image_url',
                      image_url: { url: imageDataUrl },
                    },
                  ],
                },
              ],
              temperature: 0.1,
              max_completion_tokens: 80,
              response_format: { type: 'json_object' },
            }),
          })

          const groqPayload = await groqResponse.json()

          if (!groqResponse.ok) {
            sendJson(response, groqResponse.status, {
              error: groqPayload?.error?.message ?? 'Groq recognition failed.',
            })
            return
          }

          const content = groqPayload?.choices?.[0]?.message?.content ?? '{}'
          const parsed = JSON.parse(content)
          const answer = String(parsed.answer ?? '').replace(/\D/g, '')
          const confidence = Number(parsed.confidence ?? 0)

          sendJson(response, 200, {
            answer,
            confidence: Number.isFinite(confidence) ? confidence : 0,
          })
        } catch {
          sendJson(response, 500, { error: 'Could not recognise the work.' })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), groqWorkRecognitionPlugin(env)],
  }
})
