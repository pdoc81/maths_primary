import { useMemo, useState } from 'react'
import './App.css'

const grades = [
  { id: 3, label: 'Darjah 3', max: 9999, basicFactorMax: 9 },
  { id: 4, label: 'Darjah 4', max: 99999, basicFactorMax: 12 },
  { id: 5, label: 'Darjah 5', max: 1000000, basicFactorMax: 12 },
  { id: 6, label: 'Darjah 6', max: 10000000, basicFactorMax: 12 },
]

const basicTopic = {
  id: 'basic',
  label: 'Basic Drills',
  shortLabel: 'Basic',
  name: 'Basic Drills',
  description: 'Sifir, darab dan bahagi asas.',
}

const basicOperations = [
  {
    id: 'basicAdd',
    operation: 'add',
    label: 'Addition',
    shortLabel: 'Tambah',
    name: 'Basic Addition',
    description: 'Tambah nombor kecil.',
  },
  {
    id: 'basicSubtract',
    operation: 'subtract',
    label: 'Subtraction',
    shortLabel: 'Tolak',
    name: 'Basic Subtraction',
    description: 'Tolak nombor kecil.',
  },
  {
    id: 'basicMultiply',
    operation: 'multiply',
    label: 'Multiplication',
    shortLabel: 'Darab',
    name: 'Basic Multiplication',
    description: 'Latihan sifir asas.',
  },
  {
    id: 'basicDivide',
    operation: 'divide',
    label: 'Division',
    shortLabel: 'Bahagi',
    name: 'Basic Division',
    description: 'Bahagi tepat tanpa baki.',
  },
  {
    id: 'basicMixed',
    operation: 'basic',
    label: 'Mixed',
    shortLabel: 'Mixed',
    name: 'Basic Mixed',
    description: 'Campuran operasi asas.',
  },
]

const basicDifficulties = [
  {
    id: 'easy',
    label: 'Easy',
    name: 'Easy',
    description: 'Small numbers, best for warm-up.',
  },
  {
    id: 'medium',
    label: 'Medium',
    name: 'Medium',
    description: 'Standard basic practice.',
  },
  {
    id: 'hard',
    label: 'Hard',
    name: 'Hard',
    description: 'Bigger numbers and harder facts.',
  },
]

const syllabusTopics = {
  3: [
    { id: 'number', label: 'Nombor & Operasi', shortLabel: 'Nombor', name: 'Nombor & Operasi' },
    { id: 'fraction', label: 'Pecahan & Perpuluhan', shortLabel: 'Pecahan', name: 'Pecahan, Perpuluhan & Peratus' },
    { id: 'money', label: 'Wang', shortLabel: 'Wang', name: 'Wang' },
    { id: 'time', label: 'Masa', shortLabel: 'Masa', name: 'Masa & Waktu' },
    { id: 'measure', label: 'Ukuran', shortLabel: 'Ukuran', name: 'Ukuran & Sukatan' },
    { id: 'space', label: 'Ruang', shortLabel: 'Ruang', name: 'Ruang' },
    { id: 'data', label: 'Data', shortLabel: 'Data', name: 'Pengurusan Data' },
  ],
  4: [
    { id: 'number', label: 'Nombor & Operasi', shortLabel: 'Nombor', name: 'Nombor & Operasi' },
    { id: 'fraction', label: 'Pecahan & Peratus', shortLabel: 'Pecahan', name: 'Pecahan, Perpuluhan & Peratus' },
    { id: 'money', label: 'Wang', shortLabel: 'Wang', name: 'Wang' },
    { id: 'time', label: 'Masa', shortLabel: 'Masa', name: 'Masa & Waktu' },
    { id: 'measure', label: 'Ukuran', shortLabel: 'Ukuran', name: 'Ukuran & Sukatan' },
    { id: 'space', label: 'Ruang', shortLabel: 'Ruang', name: 'Ruang' },
    { id: 'ratio', label: 'Koordinat & Nisbah', shortLabel: 'Koord', name: 'Koordinat, Nisbah & Kadaran' },
    { id: 'data', label: 'Data', shortLabel: 'Data', name: 'Pengurusan Data' },
  ],
  5: [
    { id: 'number', label: 'Nombor Bulat', shortLabel: 'Nombor', name: 'Nombor Bulat & Operasi' },
    { id: 'fraction', label: 'Pecahan & Peratus', shortLabel: 'Pecahan', name: 'Pecahan, Perpuluhan & Peratus' },
    { id: 'money', label: 'Wang', shortLabel: 'Wang', name: 'Wang' },
    { id: 'time', label: 'Masa', shortLabel: 'Masa', name: 'Masa & Waktu' },
    { id: 'measure', label: 'Ukuran', shortLabel: 'Ukuran', name: 'Ukuran & Sukatan' },
    { id: 'space', label: 'Ruang', shortLabel: 'Ruang', name: 'Ruang' },
    { id: 'ratio', label: 'Nisbah', shortLabel: 'Nisbah', name: 'Koordinat, Nisbah & Kadaran' },
    { id: 'data', label: 'Data', shortLabel: 'Data', name: 'Pengurusan Data' },
  ],
  6: [
    { id: 'number', label: 'Operasi Asas', shortLabel: 'Nombor', name: 'Nombor Bulat & Operasi Asas' },
    { id: 'fraction', label: 'Pecahan & Peratus', shortLabel: 'Pecahan', name: 'Pecahan, Perpuluhan & Peratus' },
    { id: 'money', label: 'Wang', shortLabel: 'Wang', name: 'Wang' },
    { id: 'time', label: 'Masa', shortLabel: 'Masa', name: 'Masa & Waktu' },
    { id: 'measure', label: 'Ukuran', shortLabel: 'Ukuran', name: 'Ukuran & Sukatan' },
    { id: 'space', label: 'Ruang', shortLabel: 'Ruang', name: 'Ruang' },
    { id: 'ratio', label: 'Nisbah', shortLabel: 'Nisbah', name: 'Koordinat, Nisbah & Kadaran' },
    { id: 'data', label: 'Data', shortLabel: 'Data', name: 'Data & Kebolehjadian' },
  ],
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick(items) {
  return items[randomInt(0, items.length - 1)]
}

function getBasicLimits(difficulty) {
  if (difficulty === 'easy') {
    return { addMax: 20, factorMax: 5 }
  }

  if (difficulty === 'hard') {
    return { addMax: 999, factorMax: 12 }
  }

  return { addMax: 100, factorMax: 9 }
}

function createArithmeticQuestion(grade, topic = 'mixed', difficulty = 'medium') {
  const pool = topic === 'basic' ? ['add', 'subtract', 'multiply', 'divide'] : ['add', 'subtract', 'multiply', 'divide']
  const operation = topic === 'mixed' || topic === 'basic' ? pick(pool) : topic
  const basicLimits = getBasicLimits(difficulty)
  const isBasicOperation = ['add', 'subtract', 'multiply', 'divide', 'basic'].includes(topic)

  if (operation === 'add') {
    const max = isBasicOperation ? basicLimits.addMax : Math.min(grade.max, 9999)
    const top = randomInt(2, max)
    const bottom = randomInt(2, max)
    return makeVerticalQuestion(top, bottom, '+', top + bottom, 'Tambah dari kanan.')
  }

  if (operation === 'subtract') {
    const max = isBasicOperation ? basicLimits.addMax : Math.min(grade.max, 9999)
    const top = randomInt(10, max)
    const bottom = randomInt(2, top)
    return makeVerticalQuestion(top, bottom, '-', top - bottom, 'Tolak dari kanan. Pinjam jika perlu.')
  }

  if (operation === 'multiply') {
    const factorMax = isBasicOperation ? basicLimits.factorMax : grade.basicFactorMax
    const top = randomInt(2, factorMax)
    const bottom = randomInt(2, factorMax)
    return makeVerticalQuestion(top, bottom, 'x', top * bottom, 'Guna sifir. Darab ialah tambah berulang.')
  }

  const factorMax = isBasicOperation ? basicLimits.factorMax : grade.basicFactorMax
  const divisor = randomInt(2, factorMax)
  const answer = randomInt(2, factorMax)
  return makeVerticalQuestion(
    divisor * answer,
    divisor,
    '÷',
    answer,
    'Bahagi ialah lawan darab. Fikir sifir yang sesuai.',
  )
}

function makeVerticalQuestion(top, bottom, operator, answer, hint) {
  return {
    display: 'vertical',
    top,
    bottom,
    operator,
    answer,
    answerLabel: '',
    hint,
  }
}

function createFractionQuestion(gradeId) {
  const type = pick(['fraction', 'decimal', 'percent'])

  if (type === 'fraction') {
    const denominator = randomInt(3, gradeId >= 5 ? 12 : 9)
    const numerator = randomInt(1, denominator - 1)
    const multiplier = randomInt(2, 5)
    return makeTextQuestion(
      `${numerator}/${denominator} sama dengan ?/${denominator * multiplier}`,
      numerator * multiplier,
      `/${denominator * multiplier}`,
      `Darab pembilang dan penyebut dengan ${multiplier}.`,
    )
  }

  if (type === 'decimal') {
    const tenths = randomInt(1, 9)
    return makeTextQuestion(
      `Tukar ${tenths}/10 kepada perpuluhan. Jawapan: 0.?`,
      tenths,
      'persepuluh',
      'Penyebut 10 bermaksud satu tempat perpuluhan.',
    )
  }

  const percent = pick([10, 20, 25, 50, 75])
  const whole = randomInt(2, 12) * 20
  return makeTextQuestion(
    `Berapakah ${percent}% daripada ${whole}?`,
    (percent * whole) / 100,
    '',
    'Peratus bermaksud daripada 100.',
  )
}

function makeTextQuestion(prompt, answer, answerLabel, hint) {
  return {
    display: 'text',
    prompt,
    answer,
    answerLabel,
    hint,
  }
}

function createQuestion(gradeId, selectedTopic, difficulty = 'medium') {
  const grade = grades.find((item) => item.id === gradeId) ?? grades[0]

  if (selectedTopic === 'basic') {
    return createArithmeticQuestion(grade, 'basic', difficulty)
  }

  if (selectedTopic.startsWith('basic')) {
    const basicOperation = basicOperations.find((item) => item.id === selectedTopic)
    return createArithmeticQuestion(grade, basicOperation?.operation ?? 'basic', difficulty)
  }

  if (selectedTopic === 'number') {
    return createArithmeticQuestion(grade, 'mixed')
  }

  if (selectedTopic === 'fraction') {
    return createFractionQuestion(gradeId)
  }

  if (selectedTopic === 'money') {
    const price = randomInt(2, 25)
    const quantity = randomInt(2, 6)
    return makeTextQuestion(
      `Satu barang berharga RM${price}. Jumlah untuk ${quantity} barang?`,
      price * quantity,
      'RM',
      'Darab harga dengan bilangan barang.',
    )
  }

  if (selectedTopic === 'time') {
    const hours = randomInt(1, 5)
    const minutes = pick([10, 15, 20, 30, 45])
    return makeTextQuestion(
      `Tukar ${hours} jam ${minutes} minit kepada minit.`,
      hours * 60 + minutes,
      'minit',
      '1 jam bersamaan 60 minit.',
    )
  }

  if (selectedTopic === 'measure') {
    const meters = randomInt(1, 9)
    const centimeters = pick([5, 10, 25, 40, 50, 75])
    return makeTextQuestion(
      `Tukar ${meters} m ${centimeters} cm kepada cm.`,
      meters * 100 + centimeters,
      'cm',
      '1 meter bersamaan 100 sentimeter.',
    )
  }

  if (selectedTopic === 'space') {
    const length = randomInt(3, 12)
    const width = randomInt(2, 10)
    return makeTextQuestion(
      `Panjang ${length} cm, lebar ${width} cm. Berapakah luas?`,
      length * width,
      'cm²',
      'Luas segi empat tepat = panjang x lebar.',
    )
  }

  if (selectedTopic === 'ratio') {
    const partA = randomInt(2, 5)
    const partB = randomInt(2, 5)
    const scale = randomInt(2, 6)
    return makeTextQuestion(
      `Nisbah biru:merah ialah ${partA}:${partB}. Jika biru ${partA * scale}, merah?`,
      partB * scale,
      'merah',
      `Darab kedua-dua bahagian nisbah dengan ${scale}.`,
    )
  }

  const values = [randomInt(2, 12), randomInt(2, 12), randomInt(2, 12), randomInt(2, 12)]
  return makeTextQuestion(
    `Data: ${values.join(', ')}. Jumlah semuanya?`,
    values.reduce((sum, value) => sum + value, 0),
    '',
    'Tambah semua nombor satu demi satu.',
  )
}

function makeChoices(answer) {
  const choices = new Set([answer])
  const spread = Math.max(4, Math.ceil(Math.abs(answer) * 0.2))

  while (choices.size < 4) {
    const candidate = answer + randomInt(-spread, spread)
    if (candidate >= 0 && Number.isInteger(candidate)) {
      choices.add(candidate)
    }
  }

  return [...choices].sort(() => Math.random() - 0.5)
}

function describeQuestion(question) {
  if (question.display === 'vertical') {
    return `${question.top} ${question.operator} ${question.bottom}`
  }

  return question.prompt
}

function VerticalProblem({ question }) {
  const width = Math.max(
    String(question.top).length,
    String(question.bottom).length + 1,
    String(question.answer).length,
  )

  return (
    <div className="vertical-problem" aria-label={describeQuestion(question)}>
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

function TextProblem({ question }) {
  return (
    <div className="text-problem">
      <p>{question.prompt}</p>
      {question.answerLabel ? <span>Jawapan dalam {question.answerLabel}</span> : null}
    </div>
  )
}

function App() {
  const [view, setView] = useState('home')
  const [gradeId, setGradeId] = useState(3)
  const [topic, setTopic] = useState('basic')
  const [basicOperationId, setBasicOperationId] = useState('basicMultiply')
  const [difficulty, setDifficulty] = useState('medium')
  const [question, setQuestion] = useState(() => createQuestion(3, 'basic'))
  const [choices, setChoices] = useState(() => makeChoices(question.answer))
  const [answerMode, setAnswerMode] = useState('input')
  const [typedAnswer, setTypedAnswer] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [status, setStatus] = useState('ready')
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [mistakes, setMistakes] = useState([])

  const currentGrade = useMemo(
    () => grades.find((grade) => grade.id === gradeId) ?? grades[0],
    [gradeId],
  )

  const currentDifficulty = useMemo(
    () => basicDifficulties.find((item) => item.id === difficulty) ?? basicDifficulties[1],
    [difficulty],
  )

  const currentTopic = useMemo(() => {
    const basicOperation = basicOperations.find((item) => item.id === topic)

    if (basicOperation) {
      return basicOperation
    }

    return syllabusTopics[gradeId].find((item) => item.id === topic) ?? basicTopic
  }, [gradeId, topic])

  function resetAnswerState(nextQuestion) {
    setQuestion(nextQuestion)
    setChoices(makeChoices(nextQuestion.answer))
    setTypedAnswer('')
    setSelectedAnswer(null)
    setStatus('ready')
    setShowHint(false)
  }

  function startPractice(nextGradeId, nextTopic, nextDifficulty = difficulty) {
    setGradeId(nextGradeId)
    setTopic(nextTopic)
    setDifficulty(nextDifficulty)
    resetAnswerState(createQuestion(nextGradeId, nextTopic, nextDifficulty))
    setView('practice')
  }

  function checkAnswer() {
    const submittedAnswer = answerMode === 'input' ? Number(typedAnswer) : selectedAnswer

    if (!Number.isFinite(submittedAnswer) || status !== 'ready') {
      return
    }

    const isCorrect = submittedAnswer === question.answer
    setAttempts((value) => value + 1)

    if (isCorrect) {
      setScore((value) => value + 1)
      setStatus('correct')
      return
    }

    setStatus('incorrect')
    setMistakes((items) => [
      {
        id: crypto.randomUUID(),
        question: describeQuestion(question),
        selectedAnswer: submittedAnswer,
        answer: question.answer,
        answerLabel: question.answerLabel,
      },
      ...items.slice(0, 4),
    ])
  }

  function nextQuestion() {
    resetAnswerState(createQuestion(gradeId, topic, difficulty))
  }

  const canCheck =
    status === 'ready' &&
    (answerMode === 'input' ? typedAnswer.trim() !== '' : selectedAnswer !== null)

  const answerText = `${question.answer}${question.answerLabel ? ` ${question.answerLabel}` : ''}`

  return (
    <main className="app-shell">
      {view === 'home' ? (
        <HomeScreen
          onOpenProgress={() => setView('progress')}
          onPickBasic={() => setView('basic')}
          onPickGrade={(nextGradeId) => {
            setGradeId(nextGradeId)
            setView('topics')
          }}
        />
      ) : null}

      {view === 'basic' ? (
        <BasicScreen
          operations={basicOperations}
          onBack={() => setView('home')}
          onPickOperation={(operationId) => {
            setBasicOperationId(operationId)
            setView('difficulty')
          }}
        />
      ) : null}

      {view === 'difficulty' ? (
        <DifficultyScreen
          difficulties={basicDifficulties}
          operation={basicOperations.find((item) => item.id === basicOperationId) ?? basicOperations[0]}
          onBack={() => setView('basic')}
          onPickDifficulty={(difficultyId) => startPractice(3, basicOperationId, difficultyId)}
        />
      ) : null}

      {view === 'topics' ? (
        <TopicScreen
          grade={currentGrade}
          topics={syllabusTopics[gradeId]}
          onBack={() => setView('home')}
          onPickTopic={(nextTopic) => startPractice(gradeId, nextTopic)}
        />
      ) : null}

      {view === 'practice' ? (
        <PracticeScreen
          answerMode={answerMode}
          answerText={answerText}
          canCheck={canCheck}
          currentGrade={currentGrade}
          currentDifficulty={currentDifficulty}
          currentTopic={currentTopic}
          choices={choices}
          feedbackStatus={status}
          onBack={() => setView(topic.startsWith('basic') ? 'difficulty' : 'topics')}
          onCheck={checkAnswer}
          onNext={nextQuestion}
          onToggleHint={() => setShowHint((value) => !value)}
          onToggleMode={() => {
            setAnswerMode((mode) => (mode === 'input' ? 'mcq' : 'input'))
            setTypedAnswer('')
            setSelectedAnswer(null)
            setStatus('ready')
          }}
          question={question}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          setTypedAnswer={setTypedAnswer}
          showHint={showHint}
          status={status}
          typedAnswer={typedAnswer}
        />
      ) : null}

      {view === 'progress' ? (
        <ProgressScreen
          attempts={attempts}
          mistakes={mistakes}
          onBack={() => setView('home')}
          score={score}
        />
      ) : null}
    </main>
  )
}

function HomeScreen({ onOpenProgress, onPickBasic, onPickGrade }) {
  return (
    <section className="screen home-screen" aria-labelledby="app-title">
      <header className="simple-header">
        <div>
          <h1 id="app-title">Maths Skills</h1>
          <p>Pilih satu latihan untuk mula.</p>
        </div>
        <button className="quiet-button" type="button" onClick={onOpenProgress}>
          Progress
        </button>
      </header>

      <button className="choice-card primary-choice" type="button" onClick={onPickBasic}>
        <span>Basic Drills</span>
        <small>Choose +, -, x, ÷ or mixed</small>
      </button>

      <div className="grade-list" aria-label="Pilih Darjah">
        {grades.map((grade) => (
          <button className="choice-card" key={grade.id} type="button" onClick={() => onPickGrade(grade.id)}>
            <span>{grade.label}</span>
            <small>Topik ikut silibus</small>
          </button>
        ))}
      </div>
    </section>
  )
}

function BasicScreen({ operations, onBack, onPickOperation }) {
  return (
    <section className="screen" aria-labelledby="basic-title">
      <header className="simple-header">
        <button className="quiet-button" type="button" onClick={onBack}>
          Back
        </button>
        <div>
          <h1 id="basic-title">Basic</h1>
          <p>Pilih satu operasi.</p>
        </div>
      </header>

      <div className="topic-list">
        {operations.map((item) => (
          <button className="choice-card" key={item.id} type="button" onClick={() => onPickOperation(item.id)}>
            <span>{item.label}</span>
            <small>{item.description}</small>
          </button>
        ))}
      </div>
    </section>
  )
}

function DifficultyScreen({ difficulties, operation, onBack, onPickDifficulty }) {
  return (
    <section className="screen" aria-labelledby="difficulty-title">
      <header className="simple-header">
        <button className="quiet-button" type="button" onClick={onBack}>
          Back
        </button>
        <div>
          <h1 id="difficulty-title">{operation.shortLabel}</h1>
          <p>Pilih tahap kesukaran.</p>
        </div>
      </header>

      <div className="topic-list">
        {difficulties.map((item) => (
          <button className="choice-card" key={item.id} type="button" onClick={() => onPickDifficulty(item.id)}>
            <span>{item.label}</span>
            <small>{item.description}</small>
          </button>
        ))}
      </div>
    </section>
  )
}

function TopicScreen({ grade, topics, onBack, onPickTopic }) {
  return (
    <section className="screen" aria-labelledby="topic-title">
      <header className="simple-header">
        <button className="quiet-button" type="button" onClick={onBack}>
          Back
        </button>
        <div>
          <h1 id="topic-title">{grade.label}</h1>
          <p>Pilih satu topik sahaja.</p>
        </div>
      </header>

      <div className="topic-list">
        {topics.map((item) => (
          <button className="choice-card" key={item.id} type="button" onClick={() => onPickTopic(item.id)}>
            <span>{item.label}</span>
            <small>{item.name}</small>
          </button>
        ))}
      </div>
    </section>
  )
}

function PracticeScreen({
  answerMode,
  answerText,
  canCheck,
  currentGrade,
  currentDifficulty,
  currentTopic,
  choices,
  feedbackStatus,
  onBack,
  onCheck,
  onNext,
  onToggleHint,
  onToggleMode,
  question,
  selectedAnswer,
  setSelectedAnswer,
  setTypedAnswer,
  showHint,
  status,
  typedAnswer,
}) {
  const feedback =
    status === 'correct'
      ? 'Betul.'
      : status === 'incorrect'
        ? `Jawapan: ${answerText}`
        : answerMode === 'input'
          ? 'Tulis jawapan.'
          : 'Pilih jawapan.'

  return (
    <section className="screen practice-screen" aria-labelledby="practice-title">
      <header className="practice-header">
        <button className="quiet-button" type="button" onClick={onBack}>
          Back
        </button>
        <div>
          <h1 id="practice-title">{currentTopic.shortLabel}</h1>
          <p>{currentTopic.id?.startsWith('basic') ? currentDifficulty.name : currentGrade.label}</p>
        </div>
        <button className="quiet-button" type="button" onClick={onToggleMode}>
          {answerMode === 'input' ? 'MCQ' : 'Input'}
        </button>
      </header>

      <section className="question-card clean-card" aria-live="polite">
        {question.display === 'vertical' ? (
          <VerticalProblem question={question} />
        ) : (
          <TextProblem question={question} />
        )}

        {showHint ? <p className="hint">{question.hint}</p> : null}

        {answerMode === 'input' ? (
          <label className="answer-input">
            <span>Jawapan</span>
            <input
              autoFocus
              disabled={status !== 'ready'}
              inputMode="numeric"
              onChange={(event) => setTypedAnswer(event.target.value.replace(/\D/g, ''))}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && canCheck) {
                  onCheck()
                }
              }}
              pattern="[0-9]*"
              placeholder="Tulis nombor"
              type="text"
              value={typedAnswer}
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

        <p className={`feedback ${feedbackStatus}`}>{feedback}</p>

        <div className="action-row">
          <button className="secondary" type="button" onClick={onToggleHint}>
            {showHint ? 'Hide hint' : 'Hint'}
          </button>
          {status === 'ready' ? (
            <button className="primary" type="button" onClick={onCheck} disabled={!canCheck}>
              Semak
            </button>
          ) : (
            <button className="primary" type="button" onClick={onNext}>
              Next
            </button>
          )}
        </div>
      </section>
    </section>
  )
}

function ProgressScreen({ attempts, mistakes, onBack, score }) {
  return (
    <section className="screen" aria-labelledby="progress-title">
      <header className="simple-header">
        <button className="quiet-button" type="button" onClick={onBack}>
          Back
        </button>
        <div>
          <h1 id="progress-title">Progress</h1>
          <p>{score}/{attempts} betul</p>
        </div>
      </header>

      <div className="progress-card">
        <span>Score</span>
        <strong>{score}/{attempts}</strong>
      </div>

      <section className="mistake-list">
        <h2>Kesilapan terakhir</h2>
        {mistakes.length === 0 ? (
          <p>Belum ada kesilapan.</p>
        ) : (
          <ul>
            {mistakes.map((mistake) => (
              <li key={mistake.id}>
                <span>{mistake.question}</span>
                <small>
                  Jawab {mistake.selectedAnswer}, betul {mistake.answer}
                  {mistake.answerLabel ? ` ${mistake.answerLabel}` : ''}
                </small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}

export default App
