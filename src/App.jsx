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
    description: 'Single-digit numbers only.',
  },
  {
    id: 'medium',
    label: 'Medium',
    name: 'Medium',
    description: 'Single and double digit mix.',
  },
  {
    id: 'hard',
    label: 'Hard',
    name: 'Hard',
    description: 'Double and triple digit mix.',
  },
]

const uiText = {
  bm: {
    appSubtitle: 'Pilih satu latihan untuk mula.',
    progress: 'Progress',
    basicDrills: 'Basic Drills',
    basicDescription: 'Pilih +, -, x, ÷ atau campuran',
    syllabusDescription: 'Topik ikut silibus',
    chooseOperation: 'Pilih satu operasi.',
    chooseDifficulty: 'Pilih tahap kesukaran.',
    chooseTopic: 'Pilih satu topik sahaja.',
    back: 'Back',
    answer: 'Jawapan',
    answerPlaceholder: 'Tulis nombor',
    hint: 'Hint',
    hideHint: 'Hide hint',
    check: 'Semak',
    next: 'Next',
    inputMode: 'Input',
    mcqMode: 'MCQ',
    writeAnswer: 'Tulis jawapan.',
    pickAnswer: 'Pilih jawapan.',
    correct: 'Betul.',
    answerWas: 'Jawapan',
    score: 'Score',
    correctCount: 'betul',
    recentMistakes: 'Kesilapan terakhir',
    noMistakes: 'Belum ada kesilapan.',
    language: 'BM',
    languageNext: 'EN',
    answered: 'Dijawab',
    outOf: 'daripada',
    yourAnswer: 'Jawab',
    rightAnswer: 'betul',
  },
  en: {
    appSubtitle: 'Choose one practice to start.',
    progress: 'Progress',
    basicDrills: 'Basic Drills',
    basicDescription: 'Choose +, -, x, ÷ or mixed',
    syllabusDescription: 'Syllabus topics',
    chooseOperation: 'Choose one operation.',
    chooseDifficulty: 'Choose difficulty.',
    chooseTopic: 'Choose one topic.',
    back: 'Back',
    answer: 'Answer',
    answerPlaceholder: 'Type a number',
    hint: 'Hint',
    hideHint: 'Hide hint',
    check: 'Check',
    next: 'Next',
    inputMode: 'Input',
    mcqMode: 'MCQ',
    writeAnswer: 'Type the answer.',
    pickAnswer: 'Pick an answer.',
    correct: 'Correct.',
    answerWas: 'Answer',
    score: 'Score',
    correctCount: 'correct',
    recentMistakes: 'Recent mistakes',
    noMistakes: 'No mistakes yet.',
    language: 'EN',
    languageNext: 'BM',
    answered: 'Answered',
    outOf: 'of',
    yourAnswer: 'Answered',
    rightAnswer: 'right',
  },
}

const operationText = {
  basicAdd: {
    bm: { label: 'Tambah', name: 'Tambah Asas', description: 'Tambah nombor kecil.' },
    en: { label: 'Addition', name: 'Basic Addition', description: 'Add small numbers.' },
  },
  basicSubtract: {
    bm: { label: 'Tolak', name: 'Tolak Asas', description: 'Tolak nombor kecil.' },
    en: { label: 'Subtraction', name: 'Basic Subtraction', description: 'Subtract small numbers.' },
  },
  basicMultiply: {
    bm: { label: 'Darab', name: 'Darab Asas', description: 'Latihan sifir asas.' },
    en: { label: 'Multiplication', name: 'Basic Multiplication', description: 'Practise core times tables.' },
  },
  basicDivide: {
    bm: { label: 'Bahagi', name: 'Bahagi Asas', description: 'Bahagi tepat tanpa baki.' },
    en: { label: 'Division', name: 'Basic Division', description: 'Exact division with no remainder.' },
  },
  basicMixed: {
    bm: { label: 'Campuran', name: 'Campuran Asas', description: 'Campuran operasi asas.' },
    en: { label: 'Mixed', name: 'Basic Mixed', description: 'A mix of basic operations.' },
  },
}

const difficultyText = {
  easy: {
    bm: { label: 'Senang', name: 'Senang', description: 'Nombor satu digit sahaja.' },
    en: { label: 'Easy', name: 'Easy', description: 'Single-digit numbers only.' },
  },
  medium: {
    bm: { label: 'Sederhana', name: 'Sederhana', description: 'Campuran satu dan dua digit.' },
    en: { label: 'Medium', name: 'Medium', description: 'Single and double digit mix.' },
  },
  hard: {
    bm: { label: 'Susah', name: 'Susah', description: 'Campuran dua dan tiga digit.' },
    en: { label: 'Hard', name: 'Hard', description: 'Double and triple digit mix.' },
  },
}

const topicText = {
  basic: { bm: { label: 'Basic', name: 'Basic Drills' }, en: { label: 'Basic', name: 'Basic Drills' } },
  number: { bm: { label: 'Nombor', name: 'Nombor & Operasi' }, en: { label: 'Numbers', name: 'Numbers & Operations' } },
  fraction: { bm: { label: 'Pecahan', name: 'Pecahan, Perpuluhan & Peratus' }, en: { label: 'Fractions', name: 'Fractions, Decimals & Percentages' } },
  money: { bm: { label: 'Wang', name: 'Wang' }, en: { label: 'Money', name: 'Money' } },
  time: { bm: { label: 'Masa', name: 'Masa & Waktu' }, en: { label: 'Time', name: 'Time' } },
  measure: { bm: { label: 'Ukuran', name: 'Ukuran & Sukatan' }, en: { label: 'Measure', name: 'Measurement' } },
  space: { bm: { label: 'Ruang', name: 'Ruang' }, en: { label: 'Space', name: 'Space' } },
  ratio: { bm: { label: 'Nisbah', name: 'Koordinat, Nisbah & Kadaran' }, en: { label: 'Ratio', name: 'Coordinates, Ratio & Proportion' } },
  data: { bm: { label: 'Data', name: 'Pengurusan Data' }, en: { label: 'Data', name: 'Data Handling' } },
}

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

function randomFromRanges(ranges) {
  const [min, max] = pick(ranges)
  return randomInt(min, max)
}

function getBasicRanges(difficulty) {
  if (difficulty === 'easy') {
    return {
      add: [[1, 9]],
      subtractTop: [[2, 9]],
      multiplyTop: [[1, 9]],
      multiplyBottom: [[1, 9]],
      divideAnswer: [[1, 9]],
      divisor: [[1, 9]],
    }
  }

  if (difficulty === 'hard') {
    return {
      add: [[10, 999]],
      subtractTop: [[100, 999]],
      multiplyTop: [[10, 999]],
      multiplyBottom: [[2, 99]],
      divideAnswer: [[10, 999]],
      divisor: [[2, 99]],
    }
  }

  return {
    add: [[1, 9], [10, 99]],
    subtractTop: [[10, 99]],
    multiplyTop: [[10, 99]],
    multiplyBottom: [[1, 9]],
    divideAnswer: [[10, 99]],
    divisor: [[2, 9]],
  }
}

function getGradeLabel(grade, language) {
  return language === 'bm' ? grade.label : `Standard ${grade.id}`
}

function getOperationText(operation, language) {
  return operationText[operation.id]?.[language] ?? {
    label: operation.label,
    name: operation.name,
    description: operation.description,
  }
}

function getDifficultyText(difficulty, language) {
  return difficultyText[difficulty.id]?.[language] ?? {
    label: difficulty.label,
    name: difficulty.name,
    description: difficulty.description,
  }
}

function getTopicText(topic, language) {
  if (operationText[topic.id]) {
    return operationText[topic.id][language]
  }

  return topicText[topic.id]?.[language] ?? {
    label: topic.shortLabel ?? topic.label,
    name: topic.name,
  }
}

function Icon({ name }) {
  const commonProps = {
    className: 'icon',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2.4',
    'aria-hidden': true,
  }

  if (name === 'plus') {
    return (
      <svg {...commonProps}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    )
  }

  if (name === 'minus') {
    return (
      <svg {...commonProps}>
        <path d="M5 12h14" />
      </svg>
    )
  }

  if (name === 'multiply') {
    return (
      <svg {...commonProps}>
        <path d="m7 7 10 10M17 7 7 17" />
      </svg>
    )
  }

  if (name === 'divide') {
    return (
      <svg {...commonProps}>
        <path d="M5 12h14" />
        <circle cx="12" cy="6.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (name === 'mixed') {
    return (
      <svg {...commonProps}>
        <path d="M7 5v6M4 8h6M15 7h5M16 15l4 4M20 15l-4 4" />
      </svg>
    )
  }

  if (name === 'book') {
    return (
      <svg {...commonProps}>
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H20v17H8.5A3.5 3.5 0 0 0 5 22V5.5Z" />
        <path d="M5 5.5A3.5 3.5 0 0 0 1.5 2H1v17h.5A3.5 3.5 0 0 1 5 22" />
      </svg>
    )
  }

  if (name === 'chart') {
    return (
      <svg {...commonProps}>
        <path d="M4 19V5M9 19v-7M14 19V8M19 19v-4" />
      </svg>
    )
  }

  if (name === 'star') {
    return (
      <svg {...commonProps}>
        <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path d="M12 3v18M3 12h18" />
    </svg>
  )
}

function operationIcon(operationId) {
  if (operationId === 'basicAdd') return 'plus'
  if (operationId === 'basicSubtract') return 'minus'
  if (operationId === 'basicMultiply') return 'multiply'
  if (operationId === 'basicDivide') return 'divide'
  return 'mixed'
}

function ScorePill({ attempts, language, score }) {
  const text = uiText[language]

  return (
    <div className="score-pill" aria-label={`${text.score}: ${score}/${attempts}`}>
      <Icon name="chart" />
      <span>{score}/{attempts}</span>
    </div>
  )
}

function createArithmeticQuestion(grade, topic = 'mixed', difficulty = 'medium') {
  const pool = topic === 'basic' ? ['add', 'subtract', 'multiply', 'divide'] : ['add', 'subtract', 'multiply', 'divide']
  const operation = topic === 'mixed' || topic === 'basic' ? pick(pool) : topic
  const basicRanges = getBasicRanges(difficulty)
  const isBasicOperation = ['add', 'subtract', 'multiply', 'divide', 'basic'].includes(topic)

  if (operation === 'add') {
    const top = isBasicOperation ? randomFromRanges(basicRanges.add) : randomInt(2, Math.min(grade.max, 9999))
    const bottom = isBasicOperation ? randomFromRanges(basicRanges.add) : randomInt(2, Math.min(grade.max, 9999))
    return makeVerticalQuestion(top, bottom, '+', top + bottom, 'Tambah dari kanan.')
  }

  if (operation === 'subtract') {
    const top = isBasicOperation ? randomFromRanges(basicRanges.subtractTop) : randomInt(10, Math.min(grade.max, 9999))
    const bottom = randomInt(2, top)
    return makeVerticalQuestion(top, bottom, '-', top - bottom, 'Tolak dari kanan. Pinjam jika perlu.')
  }

  if (operation === 'multiply') {
    const top = isBasicOperation ? randomFromRanges(basicRanges.multiplyTop) : randomInt(2, grade.basicFactorMax)
    const bottom = isBasicOperation ? randomFromRanges(basicRanges.multiplyBottom) : randomInt(2, grade.basicFactorMax)
    return makeVerticalQuestion(top, bottom, 'x', top * bottom, 'Guna sifir. Darab ialah tambah berulang.')
  }

  const divisor = isBasicOperation ? randomFromRanges(basicRanges.divisor) : randomInt(2, grade.basicFactorMax)
  const answer = isBasicOperation ? randomFromRanges(basicRanges.divideAnswer) : randomInt(2, grade.basicFactorMax)
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
  const [language, setLanguage] = useState('bm')
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
  const text = uiText[language]

  return (
    <main className="app-shell">
      {view === 'home' ? (
        <HomeScreen
          attempts={attempts}
          language={language}
          onOpenProgress={() => setView('progress')}
          onPickBasic={() => setView('basic')}
          onPickGrade={(nextGradeId) => {
            setGradeId(nextGradeId)
            setView('topics')
          }}
          onToggleLanguage={() => setLanguage((value) => (value === 'bm' ? 'en' : 'bm'))}
          score={score}
          text={text}
        />
      ) : null}

      {view === 'basic' ? (
        <BasicScreen
          language={language}
          operations={basicOperations}
          onBack={() => setView('home')}
          onPickOperation={(operationId) => {
            setBasicOperationId(operationId)
            setView('difficulty')
          }}
          text={text}
        />
      ) : null}

      {view === 'difficulty' ? (
        <DifficultyScreen
          difficulties={basicDifficulties}
          language={language}
          operation={basicOperations.find((item) => item.id === basicOperationId) ?? basicOperations[0]}
          onBack={() => setView('basic')}
          onPickDifficulty={(difficultyId) => startPractice(3, basicOperationId, difficultyId)}
          text={text}
        />
      ) : null}

      {view === 'topics' ? (
        <TopicScreen
          grade={currentGrade}
          language={language}
          topics={syllabusTopics[gradeId]}
          onBack={() => setView('home')}
          onPickTopic={(nextTopic) => startPractice(gradeId, nextTopic)}
          text={text}
        />
      ) : null}

      {view === 'practice' ? (
        <PracticeScreen
          answerMode={answerMode}
          answerText={answerText}
          attempts={attempts}
          canCheck={canCheck}
          currentGrade={currentGrade}
          currentDifficulty={currentDifficulty}
          currentTopic={currentTopic}
          choices={choices}
          feedbackStatus={status}
          language={language}
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
          score={score}
          status={status}
          text={text}
          typedAnswer={typedAnswer}
        />
      ) : null}

      {view === 'progress' ? (
        <ProgressScreen
          attempts={attempts}
          mistakes={mistakes}
          onBack={() => setView('home')}
          score={score}
          text={text}
        />
      ) : null}
    </main>
  )
}

function HomeScreen({ attempts, language, onOpenProgress, onPickBasic, onPickGrade, onToggleLanguage, score, text }) {
  return (
    <section className="screen home-screen" aria-labelledby="app-title">
      <header className="simple-header">
        <div>
          <h1 id="app-title">Maths Skills</h1>
          <p>{text.appSubtitle}</p>
        </div>
        <div className="header-actions">
          <button className="quiet-button language-button" type="button" onClick={onToggleLanguage}>
            {text.language} / {text.languageNext}
          </button>
          <button className="quiet-button icon-button" type="button" onClick={onOpenProgress}>
            <Icon name="chart" />
            <span>{text.progress}</span>
          </button>
        </div>
      </header>

      <ScoreSummary attempts={attempts} language={language} score={score} />

      <button className="choice-card primary-choice" type="button" onClick={onPickBasic}>
        <Icon name="star" />
        <span>{text.basicDrills}</span>
        <small>{text.basicDescription}</small>
      </button>

      <div className="grade-list" aria-label="Pilih Darjah">
        {grades.map((grade) => (
          <button className="choice-card" key={grade.id} type="button" onClick={() => onPickGrade(grade.id)}>
            <Icon name="book" />
            <span>{getGradeLabel(grade, language)}</span>
            <small>{text.syllabusDescription}</small>
          </button>
        ))}
      </div>
    </section>
  )
}

function ScoreSummary({ attempts, language, score }) {
  const text = uiText[language]

  return (
    <section className="score-summary" aria-label={text.progress}>
      <ScorePill attempts={attempts} language={language} score={score} />
      <span>{text.answered}: {attempts}</span>
    </section>
  )
}

function BasicScreen({ language, operations, onBack, onPickOperation, text }) {
  return (
    <section className="screen" aria-labelledby="basic-title">
      <header className="simple-header">
        <button className="quiet-button" type="button" onClick={onBack}>
          {text.back}
        </button>
        <div>
          <h1 id="basic-title">Basic</h1>
          <p>{text.chooseOperation}</p>
        </div>
      </header>

      <div className="topic-list">
        {operations.map((item) => {
          const display = getOperationText(item, language)

          return (
            <button className="choice-card" key={item.id} type="button" onClick={() => onPickOperation(item.id)}>
              <Icon name={operationIcon(item.id)} />
              <span>{display.label}</span>
              <small>{display.description}</small>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function DifficultyScreen({ difficulties, language, operation, onBack, onPickDifficulty, text }) {
  const operationDisplay = getOperationText(operation, language)

  return (
    <section className="screen" aria-labelledby="difficulty-title">
      <header className="simple-header">
        <button className="quiet-button" type="button" onClick={onBack}>
          {text.back}
        </button>
        <div>
          <h1 id="difficulty-title">{operationDisplay.label}</h1>
          <p>{text.chooseDifficulty}</p>
        </div>
      </header>

      <div className="topic-list">
        {difficulties.map((item) => {
          const display = getDifficultyText(item, language)

          return (
            <button className={`choice-card difficulty-${item.id}`} key={item.id} type="button" onClick={() => onPickDifficulty(item.id)}>
              <Icon name="star" />
              <span>{display.label}</span>
              <small>{display.description}</small>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function TopicScreen({ grade, language, topics, onBack, onPickTopic, text }) {
  return (
    <section className="screen" aria-labelledby="topic-title">
      <header className="simple-header">
        <button className="quiet-button" type="button" onClick={onBack}>
          {text.back}
        </button>
        <div>
          <h1 id="topic-title">{getGradeLabel(grade, language)}</h1>
          <p>{text.chooseTopic}</p>
        </div>
      </header>

      <div className="topic-list">
        {topics.map((item) => {
          const display = getTopicText(item, language)

          return (
            <button className="choice-card" key={item.id} type="button" onClick={() => onPickTopic(item.id)}>
              <Icon name="book" />
              <span>{display.label}</span>
              <small>{display.name}</small>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function PracticeScreen({
  answerMode,
  answerText,
  attempts,
  canCheck,
  currentGrade,
  currentDifficulty,
  currentTopic,
  choices,
  feedbackStatus,
  language,
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
  score,
  status,
  text,
  typedAnswer,
}) {
  const topicDisplay = getTopicText(currentTopic, language)
  const difficultyDisplay = getDifficultyText(currentDifficulty, language)
  const feedback =
    status === 'correct'
      ? text.correct
      : status === 'incorrect'
        ? `${text.answerWas}: ${answerText}`
        : answerMode === 'input'
          ? text.writeAnswer
          : text.pickAnswer

  return (
    <section className="screen practice-screen" aria-labelledby="practice-title">
      <header className="practice-header">
        <button className="quiet-button" type="button" onClick={onBack}>
          {text.back}
        </button>
        <div>
          <h1 id="practice-title">{topicDisplay.label}</h1>
          <p>{currentTopic.id?.startsWith('basic') ? difficultyDisplay.name : getGradeLabel(currentGrade, language)}</p>
        </div>
        <button className="quiet-button" type="button" onClick={onToggleMode}>
          {answerMode === 'input' ? text.mcqMode : text.inputMode}
        </button>
      </header>

      <ScoreSummary attempts={attempts} language={language} score={score} />

      <section className="question-card clean-card" aria-live="polite">
        {question.display === 'vertical' ? (
          <VerticalProblem question={question} />
        ) : (
          <TextProblem question={question} />
        )}

        {showHint ? <p className="hint">{question.hint}</p> : null}

        {answerMode === 'input' ? (
          <label className="answer-input">
            <span>{text.answer}</span>
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
              placeholder={text.answerPlaceholder}
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
            {showHint ? text.hideHint : text.hint}
          </button>
          {status === 'ready' ? (
            <button className="primary" type="button" onClick={onCheck} disabled={!canCheck}>
              {text.check}
            </button>
          ) : (
            <button className="primary" type="button" onClick={onNext}>
              {text.next}
            </button>
          )}
        </div>
      </section>
    </section>
  )
}

function ProgressScreen({ attempts, mistakes, onBack, score, text }) {
  return (
    <section className="screen" aria-labelledby="progress-title">
      <header className="simple-header">
        <button className="quiet-button" type="button" onClick={onBack}>
          {text.back}
        </button>
        <div>
          <h1 id="progress-title">{text.progress}</h1>
          <p>{score}/{attempts} {text.correctCount}</p>
        </div>
      </header>

      <div className="progress-card">
        <Icon name="chart" />
        <span>{text.score}</span>
        <strong>{score}/{attempts}</strong>
      </div>

      <section className="mistake-list">
        <h2>{text.recentMistakes}</h2>
        {mistakes.length === 0 ? (
          <p>{text.noMistakes}</p>
        ) : (
          <ul>
            {mistakes.map((mistake) => (
              <li key={mistake.id}>
                <span>{mistake.question}</span>
                <small>
                  {text.yourAnswer} {mistake.selectedAnswer}, {text.rightAnswer} {mistake.answer}
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
