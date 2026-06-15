import { useMemo, useState } from 'react'
import './App.css'

const grades = [
  { id: 3, label: 'Darjah 3', max: 99, basicFactorMax: 9 },
  { id: 4, label: 'Darjah 4', max: 999, basicFactorMax: 12 },
  { id: 5, label: 'Darjah 5', max: 9999, basicFactorMax: 12 },
  { id: 6, label: 'Darjah 6', max: 99999, basicFactorMax: 12 },
]

const topics = [
  { id: 'multiplyDivide', label: 'x ÷', name: 'Asas Darab & Bahagi' },
  { id: 'multiply', label: 'x', name: 'Darab' },
  { id: 'divide', label: '÷', name: 'Bahagi' },
  { id: 'add', label: '+', name: 'Tambah' },
  { id: 'subtract', label: '-', name: 'Tolak' },
  { id: 'mixed', label: 'Mix', name: 'Semua' },
]

const topicPool = ['add', 'subtract', 'multiply', 'divide']
const multiplyDividePool = ['multiply', 'divide']
const practiceModes = [
  { id: 'input', label: 'Tulis jawapan' },
  { id: 'mcq', label: 'Pilihan jawapan' },
]

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickTopic(topic) {
  if (topic === 'multiplyDivide') {
    return multiplyDividePool[randomInt(0, multiplyDividePool.length - 1)]
  }

  if (topic !== 'mixed') {
    return topic
  }

  return topicPool[randomInt(0, topicPool.length - 1)]
}

function createQuestion(gradeId, selectedTopic) {
  const grade = grades.find((item) => item.id === gradeId) ?? grades[0]
  const topic = pickTopic(selectedTopic)

  if (topic === 'add') {
    const top = randomInt(2, grade.max)
    const bottom = randomInt(2, grade.max)

    return {
      top,
      bottom,
      operator: '+',
      answer: top + bottom,
      hint: 'Tambah dari kanan: sa, puluh, ratus. Simpan nombor bawa jika jumlah lebih 9.',
    }
  }

  if (topic === 'subtract') {
    const larger = randomInt(10, grade.max)
    const smaller = randomInt(2, larger)

    return {
      top: larger,
      bottom: smaller,
      operator: '-',
      answer: larger - smaller,
      hint: 'Tolak dari kanan. Jika atas lebih kecil, pinjam 1 daripada tempat di sebelah kiri.',
    }
  }

  if (topic === 'multiply') {
    const top = randomInt(2, grade.basicFactorMax)
    const bottom = randomInt(2, grade.basicFactorMax)

    return {
      top,
      bottom,
      operator: 'x',
      answer: top * bottom,
      hint: 'Guna sifir. Contoh: 4 x 3 sama seperti 4 + 4 + 4.',
    }
  }

  const divisor = randomInt(2, grade.basicFactorMax)
  const answer = randomInt(2, grade.basicFactorMax)
  const top = divisor * answer

  return {
    top,
    bottom: divisor,
    operator: '÷',
    answer,
    hint: 'Bahagi ialah lawan darab. Fikir: nombor bawah darab berapa jadi nombor atas?',
  }
}

function makeChoices(answer) {
  const choices = new Set([answer])
  const spread = Math.max(6, Math.ceil(Math.abs(answer) * 0.15))

  while (choices.size < 4) {
    const candidate = answer + randomInt(-spread, spread)
    if (candidate >= 0) {
      choices.add(candidate)
    }
  }

  return [...choices].sort(() => Math.random() - 0.5)
}

function VerticalProblem({ question }) {
  const width = Math.max(
    String(question.top).length,
    String(question.bottom).length + 1,
    String(question.answer).length,
  )

  return (
    <div className="vertical-problem" aria-label={`${question.top} ${question.operator} ${question.bottom}`}>
      <div className="problem-row">
        <span></span>
        <span>{String(question.top).padStart(width - 1, ' ')}</span>
      </div>
      <div className="problem-row">
        <span>{question.operator}</span>
        <span>{String(question.bottom).padStart(width - 1, ' ')}</span>
      </div>
      <div className="answer-line"></div>
    </div>
  )
}

function App() {
  const [gradeId, setGradeId] = useState(3)
  const [topic, setTopic] = useState('multiplyDivide')
  const [question, setQuestion] = useState(() => createQuestion(3, 'multiplyDivide'))
  const [choices, setChoices] = useState(() => makeChoices(question.answer))
  const [practiceMode, setPracticeMode] = useState('input')
  const [typedAnswer, setTypedAnswer] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [status, setStatus] = useState('ready')
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [mistakes, setMistakes] = useState([])

  const currentGrade = useMemo(
    () => grades.find((grade) => grade.id === gradeId) ?? grades[0],
    [gradeId],
  )

  function startQuestion(nextGradeId = gradeId, nextTopic = topic) {
    const nextQuestion = createQuestion(nextGradeId, nextTopic)
    setQuestion(nextQuestion)
    setChoices(makeChoices(nextQuestion.answer))
    setTypedAnswer('')
    setSelectedAnswer(null)
    setStatus('ready')
    setShowHint(false)
  }

  function handleGradeChange(nextGradeId) {
    setGradeId(nextGradeId)
    startQuestion(nextGradeId, topic)
  }

  function handleTopicChange(nextTopic) {
    setTopic(nextTopic)
    startQuestion(gradeId, nextTopic)
  }

  function checkAnswer() {
    const submittedAnswer =
      practiceMode === 'input' ? Number(typedAnswer) : selectedAnswer

    if (!Number.isFinite(submittedAnswer) || status !== 'ready') {
      return
    }

    const isCorrect = submittedAnswer === question.answer
    setAttempts((value) => value + 1)

    if (isCorrect) {
      setScore((value) => value + 1)
      setStreak((value) => value + 1)
      setStatus('correct')
      return
    }

    setStreak(0)
    setStatus('incorrect')
    setMistakes((items) => [
      {
        id: crypto.randomUUID(),
        question: `${question.top} ${question.operator} ${question.bottom}`,
        selectedAnswer: submittedAnswer,
        answer: question.answer,
      },
      ...items.slice(0, 4),
    ])
  }

  const feedback =
    status === 'correct'
      ? 'Betul. Bagus, teruskan.'
      : status === 'incorrect'
        ? `Belum tepat. Jawapan yang betul ialah ${question.answer}.`
        : practiceMode === 'input'
          ? 'Tulis jawapan, kemudian tekan Semak.'
          : 'Pilih jawapan, kemudian tekan Semak.'

  const canCheck =
    status === 'ready' &&
    (practiceMode === 'input' ? typedAnswer.trim() !== '' : selectedAnswer !== null)

  return (
    <main className="app-shell">
      <section className="practice-panel" aria-labelledby="app-title">
        <header className="app-header">
          <div>
            <h1 id="app-title">Maths Skills</h1>
            <p>Mula dengan asas darab dan bahagi</p>
          </div>
          <div className="mini-score" aria-label="Skor">
            <span>{score}/{attempts}</span>
            <small>Streak {streak}</small>
          </div>
        </header>

        <div className="control-block" aria-label="Pilih darjah">
          {grades.map((grade) => (
            <button
              className={grade.id === gradeId ? 'selected' : ''}
              key={grade.id}
              type="button"
              onClick={() => handleGradeChange(grade.id)}
            >
              {grade.label}
            </button>
          ))}
        </div>

        <div className="control-block topic-block" aria-label="Pilih topik">
          {topics.map((item) => (
            <button
              className={item.id === topic ? 'selected' : ''}
              key={item.id}
              type="button"
              onClick={() => handleTopicChange(item.id)}
              title={item.name}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mode-switch" aria-label="Pilih cara menjawab">
          {practiceModes.map((mode) => (
            <button
              className={mode.id === practiceMode ? 'selected' : ''}
              key={mode.id}
              type="button"
              onClick={() => {
                setPracticeMode(mode.id)
                setTypedAnswer('')
                setSelectedAnswer(null)
                setStatus('ready')
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <section className="question-card" aria-live="polite">
          <p className="lesson-label">{currentGrade.label} - {topics.find((item) => item.id === topic)?.name}</p>
          <VerticalProblem question={question} />

          {showHint ? <p className="hint">{question.hint}</p> : null}

          {practiceMode === 'input' ? (
            <label className="answer-input">
              <span>Jawapan</span>
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Tulis nombor"
                type="text"
                value={typedAnswer}
                disabled={status !== 'ready'}
                onChange={(event) => {
                  setTypedAnswer(event.target.value.replace(/\D/g, ''))
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && canCheck) {
                    checkAnswer()
                  }
                }}
              />
            </label>
          ) : (
            <div className="answer-grid" aria-label="Pilihan jawapan">
              {choices.map((choice) => (
                <button
                  className={selectedAnswer === choice ? 'selected-answer' : ''}
                  disabled={status !== 'ready'}
                  key={choice}
                  type="button"
                  onClick={() => setSelectedAnswer(choice)}
                >
                  {choice}
                </button>
              ))}
            </div>
          )}

          <p className={`feedback ${status}`}>{feedback}</p>

          <div className="action-row">
            <button className="secondary" type="button" onClick={() => setShowHint((value) => !value)}>
              {showHint ? 'Tutup hint' : 'Hint'}
            </button>
            {status === 'ready' ? (
              <button className="primary" type="button" onClick={checkAnswer} disabled={!canCheck}>
                Semak
              </button>
            ) : (
              <button className="primary" type="button" onClick={() => startQuestion()}>
                Soalan seterusnya
              </button>
            )}
          </div>
        </section>

        <details className="mistake-review">
          <summary>Ulang semula kesilapan</summary>
          {mistakes.length === 0 ? (
            <p>Belum ada kesilapan. Cuba beberapa soalan dahulu.</p>
          ) : (
            <ul>
              {mistakes.map((mistake) => (
                <li key={mistake.id}>
                  <span>{mistake.question}</span>
                  <small>
                    Jawab {mistake.selectedAnswer}, betul {mistake.answer}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </details>
      </section>
    </main>
  )
}

export default App
