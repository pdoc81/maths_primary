import { useEffect, useMemo, useRef, useState } from 'react'
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
    answerMode: 'Cara jawab',
    inputMode: 'Input',
    mcqMode: 'MCQ',
    workMode: 'Kerja',
    clearWork: 'Padam',
    undoWork: 'Undur',
    submitWork: 'Semak kerja',
    workArea: 'Ruang kerja',
    workHint: 'Guna jari atau pensel untuk kira.',
    finalAnswer: 'Jawapan akhir',
    finalAnswerHint: 'Tulis satu digit dalam setiap kotak.',
    recognizedAnswer: 'Dibaca',
    readingWork: 'Membaca kerja...',
    answerNotRead: 'Saya belum dapat baca jawapan itu.',
    writeAnswer: 'Tulis jawapan.',
    pickAnswer: 'Pilih jawapan.',
    workAnswer: 'Tulis kerja dan jawapan akhir.',
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
    answerMode: 'Answer mode',
    inputMode: 'Input',
    mcqMode: 'MCQ',
    workMode: 'Work',
    clearWork: 'Clear',
    undoWork: 'Undo',
    submitWork: 'Check work',
    workArea: 'Working area',
    workHint: 'Use your finger or pencil to work it out.',
    finalAnswer: 'Final answer',
    finalAnswerHint: 'Write one digit in each box.',
    recognizedAnswer: 'Read as',
    readingWork: 'Reading work...',
    answerNotRead: 'I could not read that answer yet.',
    writeAnswer: 'Type the answer.',
    pickAnswer: 'Pick an answer.',
    workAnswer: 'Show your working and final answer.',
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

function prepareDrawingCanvas(canvas, { grid = false } = {}) {
  const snapshot = canvas.width > 0 && canvas.height > 0 ? canvas.toDataURL() : ''
  const rect = canvas.getBoundingClientRect()
  const scale = window.devicePixelRatio || 1

  canvas.width = Math.max(1, Math.floor(rect.width * scale))
  canvas.height = Math.max(1, Math.floor(rect.height * scale))

  const context = canvas.getContext('2d')
  context.setTransform(scale, 0, 0, scale, 0, 0)
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.lineWidth = grid ? 4 : 8
  context.strokeStyle = '#14213d'
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, rect.width, rect.height)

  if (snapshot) {
    const image = new Image()
    image.onload = () => context.drawImage(image, 0, 0, rect.width, rect.height)
    image.src = snapshot
  }
}

function getInkBounds(canvas) {
  const context = canvas.getContext('2d')
  const { width, height } = canvas
  const pixels = context.getImageData(0, 0, width, height).data
  let left = width
  let top = height
  let right = 0
  let bottom = 0
  let inkCount = 0

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4
      const isInk = pixels[index] < 180 && pixels[index + 1] < 180 && pixels[index + 2] < 180

      if (isInk) {
        left = Math.min(left, x)
        top = Math.min(top, y)
        right = Math.max(right, x)
        bottom = Math.max(bottom, y)
        inkCount += 1
      }
    }
  }

  if (inkCount < 8) return null

  return { left, top, right, bottom, inkCount }
}

function normalizeDigitCanvas(sourceCanvas) {
  const bounds = getInkBounds(sourceCanvas)
  if (!bounds) return null

  const size = 28
  const padding = 3
  const sourceWidth = bounds.right - bounds.left + 1
  const sourceHeight = bounds.bottom - bounds.top + 1
  const targetScale = Math.min((size - padding * 2) / sourceWidth, (size - padding * 2) / sourceHeight)
  const targetWidth = sourceWidth * targetScale
  const targetHeight = sourceHeight * targetScale
  const targetCanvas = document.createElement('canvas')
  const targetContext = targetCanvas.getContext('2d')

  targetCanvas.width = size
  targetCanvas.height = size
  targetContext.fillStyle = '#ffffff'
  targetContext.fillRect(0, 0, size, size)
  targetContext.drawImage(
    sourceCanvas,
    bounds.left,
    bounds.top,
    sourceWidth,
    sourceHeight,
    (size - targetWidth) / 2,
    (size - targetHeight) / 2,
    targetWidth,
    targetHeight,
  )

  return targetContext.getImageData(0, 0, size, size).data
}

function createDigitTemplates() {
  const fonts = [
    'bold 25px Arial',
    'bold 25px Trebuchet MS',
    'bold 25px Comic Sans MS',
  ]

  return Array.from({ length: 10 }, (_, digit) => {
    const variants = fonts.map((font) => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      canvas.width = 28
      canvas.height = 28
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, 28, 28)
      context.fillStyle = '#14213d'
      context.font = font
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText(String(digit), 14, 15)

      return context.getImageData(0, 0, 28, 28).data
    })

    return { digit, variants }
  })
}

function imageToBinary(data) {
  const bits = []

  for (let index = 0; index < data.length; index += 4) {
    bits.push(data[index] < 190 && data[index + 1] < 190 && data[index + 2] < 190)
  }

  return bits
}

function compareDigitImages(input, template) {
  const inputBits = imageToBinary(input)
  const templateBits = imageToBinary(template)
  let intersection = 0
  let union = 0

  for (let index = 0; index < inputBits.length; index += 1) {
    if (inputBits[index] || templateBits[index]) union += 1
    if (inputBits[index] && templateBits[index]) intersection += 1
  }

  return union === 0 ? 0 : intersection / union
}

function scoreRegion(bits, xMin, xMax, yMin, yMax) {
  let ink = 0
  let total = 0

  for (let y = yMin; y < yMax; y += 1) {
    for (let x = xMin; x < xMax; x += 1) {
      total += 1
      if (bits[y * 28 + x]) ink += 1
    }
  }

  return total === 0 ? 0 : ink / total
}

function recognizeDigitBySegments(sourceCanvas) {
  const normalized = normalizeDigitCanvas(sourceCanvas)
  if (!normalized) return null

  const bits = imageToBinary(normalized)
  const segments = {
    top: scoreRegion(bits, 8, 20, 0, 5) > 0.045,
    upperLeft: scoreRegion(bits, 0, 6, 6, 12) > 0.045,
    upperRight: scoreRegion(bits, 22, 28, 6, 12) > 0.045,
    middle: scoreRegion(bits, 8, 20, 12, 16) > 0.045,
    lowerLeft: scoreRegion(bits, 0, 6, 17, 23) > 0.045,
    lowerRight: scoreRegion(bits, 22, 28, 17, 23) > 0.045,
    bottom: scoreRegion(bits, 8, 20, 23, 28) > 0.045,
  }
  const digitSegments = {
    0: ['top', 'upperLeft', 'upperRight', 'lowerLeft', 'lowerRight', 'bottom'],
    1: ['upperRight', 'lowerRight'],
    2: ['top', 'upperRight', 'middle', 'lowerLeft', 'bottom'],
    3: ['top', 'upperRight', 'middle', 'lowerRight', 'bottom'],
    4: ['upperLeft', 'upperRight', 'middle', 'lowerRight'],
    5: ['top', 'upperLeft', 'middle', 'lowerRight', 'bottom'],
    6: ['top', 'upperLeft', 'middle', 'lowerLeft', 'lowerRight', 'bottom'],
    7: ['top', 'upperRight', 'lowerRight'],
    8: ['top', 'upperLeft', 'upperRight', 'middle', 'lowerLeft', 'lowerRight', 'bottom'],
    9: ['top', 'upperLeft', 'upperRight', 'middle', 'lowerRight', 'bottom'],
  }
  let best = { digit: null, score: -Infinity }

  for (const [digit, activeSegments] of Object.entries(digitSegments)) {
    const expected = new Set(activeSegments)
    let score = 0

    for (const segment of Object.keys(segments)) {
      const isExpected = expected.has(segment)
      const isActive = segments[segment]
      score += isExpected === isActive ? 1 : -1.25
    }

    if (score > best.score) {
      best = { digit: Number(digit), score }
    }
  }

  return best.score < 1 ? null : best.digit
}

function recognizeDigitFromPoints(points) {
  if (points.length < 2) return null

  const xValues = points.map((point) => point.x)
  const yValues = points.map((point) => point.y)
  const left = Math.min(...xValues)
  const right = Math.max(...xValues)
  const top = Math.min(...yValues)
  const bottom = Math.max(...yValues)
  const width = Math.max(1, right - left)
  const height = Math.max(1, bottom - top)
  const normalizedPoints = points.map((point) => ({
    x: ((point.x - left) / width) * 28,
    y: ((point.y - top) / height) * 28,
  }))
  const countPoints = (xMin, xMax, yMin, yMax) =>
    normalizedPoints.filter((point) => point.x >= xMin && point.x <= xMax && point.y >= yMin && point.y <= yMax).length
  const threshold = Math.max(2, points.length * 0.025)
  const segments = {
    top: countPoints(7, 21, 0, 6) >= threshold,
    upperLeft: countPoints(0, 7, 5, 13) >= threshold,
    upperRight: countPoints(21, 28, 5, 13) >= threshold,
    middle: countPoints(7, 21, 11, 17) >= threshold,
    lowerLeft: countPoints(0, 7, 15, 23) >= threshold,
    lowerRight: countPoints(21, 28, 15, 23) >= threshold,
    bottom: countPoints(7, 21, 22, 28) >= threshold,
  }
  const digitSegments = {
    0: ['top', 'upperLeft', 'upperRight', 'lowerLeft', 'lowerRight', 'bottom'],
    1: ['upperRight', 'lowerRight'],
    2: ['top', 'upperRight', 'middle', 'lowerLeft', 'bottom'],
    3: ['top', 'upperRight', 'middle', 'lowerRight', 'bottom'],
    4: ['upperLeft', 'upperRight', 'middle', 'lowerRight'],
    5: ['top', 'upperLeft', 'middle', 'lowerRight', 'bottom'],
    6: ['top', 'upperLeft', 'middle', 'lowerLeft', 'lowerRight', 'bottom'],
    7: ['top', 'upperRight', 'lowerRight'],
    8: ['top', 'upperLeft', 'upperRight', 'middle', 'lowerLeft', 'lowerRight', 'bottom'],
    9: ['top', 'upperLeft', 'upperRight', 'middle', 'lowerRight', 'bottom'],
  }
  let best = { digit: null, score: -Infinity }

  for (const [digit, activeSegments] of Object.entries(digitSegments)) {
    const expected = new Set(activeSegments)
    let score = 0

    for (const segment of Object.keys(segments)) {
      const isExpected = expected.has(segment)
      const isActive = segments[segment]
      score += isExpected === isActive ? 1 : -1.25
    }

    if (score > best.score) {
      best = { digit: Number(digit), score }
    }
  }

  return best.score < 1 ? null : best.digit
}

function recognizeDigit(sourceCanvas) {
  const segmentDigit = recognizeDigitBySegments(sourceCanvas)
  if (segmentDigit !== null) return segmentDigit

  const normalized = normalizeDigitCanvas(sourceCanvas)
  if (!normalized) return null

  let best = { digit: null, score: 0 }

  for (const template of createDigitTemplates()) {
    for (const variant of template.variants) {
      const score = compareDigitImages(normalized, variant)

      if (score > best.score) {
        best = { digit: template.digit, score }
      }
    }
  }

  return best.score < 0.12 ? null : best.digit
}

function WorkCanvas({ answerDigitCount, onSubmitAnswer, question, status, text }) {
  const workCanvasRef = useRef(null)
  const answerCanvasRefs = useRef([])
  const answerPointsRef = useRef([])
  const drawingRef = useRef(null)
  const undoStackRef = useRef([])
  const [hasUndo, setHasUndo] = useState(false)
  const [hasAnswerInk, setHasAnswerInk] = useState(false)
  const [recognizedAnswer, setRecognizedAnswer] = useState(null)
  const [readError, setReadError] = useState(false)
  const [isReadingWork, setIsReadingWork] = useState(false)

  useEffect(() => {
    const canvases = [workCanvasRef.current, ...answerCanvasRefs.current].filter(Boolean)

    function resizeCanvases() {
      canvases.forEach((canvas) => prepareDrawingCanvas(canvas, { grid: canvas === workCanvasRef.current }))
    }

    resizeCanvases()
    window.addEventListener('resize', resizeCanvases)

    return () => window.removeEventListener('resize', resizeCanvases)
  }, [answerDigitCount])

  function getCanvasPoint(canvas, event) {
    const rect = canvas.getBoundingClientRect()

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  function recordAnswerLine(index, startPoint, endPoint) {
    const steps = Math.max(1, Math.ceil(Math.hypot(endPoint.x - startPoint.x, endPoint.y - startPoint.y) / 4))

    for (let step = 0; step <= steps; step += 1) {
      const progress = step / steps
      answerPointsRef.current[index].push({
        x: startPoint.x + (endPoint.x - startPoint.x) * progress,
        y: startPoint.y + (endPoint.y - startPoint.y) * progress,
      })
    }
  }

  function startDrawing(event, canvas, type, answerIndex = null) {
    const context = canvas.getContext('2d')
    const point = getCanvasPoint(canvas, event)

    if (type === 'work') {
      undoStackRef.current = [...undoStackRef.current.slice(-9), canvas.toDataURL()]
      setHasUndo(true)
    } else {
      setHasAnswerInk(true)
      setRecognizedAnswer(null)
      setReadError(false)
      setIsReadingWork(false)
      answerPointsRef.current[answerIndex] ??= []
      answerPointsRef.current[answerIndex].push(point)
    }

    drawingRef.current = { answerIndex, canvas, point, type }
    canvas.setPointerCapture(event.pointerId)

    context.beginPath()
    context.arc(point.x, point.y, type === 'work' ? 2 : 4, 0, Math.PI * 2)
    context.fillStyle = '#14213d'
    context.fill()
  }

  function draw(event) {
    if (!drawingRef.current) return

    const { answerIndex, canvas, point, type } = drawingRef.current
    const context = canvas.getContext('2d')
    const nextPoint = getCanvasPoint(canvas, event)

    context.beginPath()
    context.moveTo(point.x, point.y)
    context.lineTo(nextPoint.x, nextPoint.y)
    context.stroke()

    if (type === 'answer') {
      recordAnswerLine(answerIndex, point, nextPoint)
    }

    drawingRef.current = { answerIndex, canvas, point: nextPoint, type }
  }

  function stopDrawing(event) {
    const activeCanvas = drawingRef.current?.canvas
    drawingRef.current = null

    if (activeCanvas?.hasPointerCapture(event.pointerId)) {
      activeCanvas.releasePointerCapture(event.pointerId)
    }
  }

  function clearCanvas(canvas) {
    const context = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()

    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, rect.width, rect.height)
  }

  function clearAll() {
    if (workCanvasRef.current) clearCanvas(workCanvasRef.current)
    answerCanvasRefs.current.filter(Boolean).forEach(clearCanvas)
    answerPointsRef.current = []
    undoStackRef.current = []
    setHasUndo(false)
    setHasAnswerInk(false)
    setRecognizedAnswer(null)
    setReadError(false)
    setIsReadingWork(false)
  }

  function undoWork() {
    const canvas = workCanvasRef.current
    const snapshot = undoStackRef.current.pop()

    if (!snapshot) return

    const context = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const image = new Image()

    image.onload = () => {
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, rect.width, rect.height)
      context.drawImage(image, 0, 0, rect.width, rect.height)
    }
    image.src = snapshot
    setHasUndo(undoStackRef.current.length > 0)
  }

  function getLocalRecognizedAnswer() {
    const digits = answerCanvasRefs.current
      .slice(0, answerDigitCount)
      .map((canvas, index) => {
        const points = answerPointsRef.current[index] ?? []
        return recognizeDigitFromPoints(points) ?? (canvas ? recognizeDigit(canvas) : null)
      })

    if (digits.some((digit) => digit === null)) {
      return null
    }

    return Number(digits.join(''))
  }

  function makeRecognitionImage() {
    const workCanvas = workCanvasRef.current
    const answerCanvases = answerCanvasRefs.current.slice(0, answerDigitCount).filter(Boolean)
    const padding = 28
    const labelHeight = 26
    const answerGap = 10
    const answerHeight = answerCanvases.length > 0 ? Math.max(...answerCanvases.map((canvas) => canvas.height)) : 0
    const answerWidth = answerCanvases.reduce((sum, canvas) => sum + canvas.width, 0) + Math.max(0, answerCanvases.length - 1) * answerGap
    const width = Math.max(workCanvas.width, answerWidth) + padding * 2
    const height = padding * 3 + labelHeight * 2 + workCanvas.height + answerHeight
    const outputCanvas = document.createElement('canvas')
    const context = outputCanvas.getContext('2d')

    outputCanvas.width = width
    outputCanvas.height = height
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, width, height)
    context.fillStyle = '#14213d'
    context.font = 'bold 24px Arial'
    context.fillText(text.workArea, padding, padding + 20)
    context.drawImage(workCanvas, padding, padding + labelHeight)
    context.fillText(text.finalAnswer, padding, padding * 2 + labelHeight + workCanvas.height + 20)

    let x = padding
    const y = padding * 2 + labelHeight * 2 + workCanvas.height
    answerCanvases.forEach((canvas) => {
      context.strokeStyle = '#8bbfc5'
      context.lineWidth = 3
      context.strokeRect(x, y, canvas.width, canvas.height)
      context.drawImage(canvas, x, y)
      x += canvas.width + answerGap
    })

    return outputCanvas.toDataURL('image/png')
  }

  async function recognizeWithGroq() {
    const response = await fetch('/api/recognize-work', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageDataUrl: makeRecognitionImage(),
        question: describeQuestion(question),
      }),
    })

    if (!response.ok) return null

    const result = await response.json()
    const answer = String(result.answer ?? '').replace(/\D/g, '')

    return answer === '' ? null : Number(answer)
  }

  async function submitWork() {
    if (isReadingWork || status !== 'ready') return

    setIsReadingWork(true)
    setReadError(false)

    const answer = await recognizeWithGroq().catch(() => null) ?? getLocalRecognizedAnswer()

    setIsReadingWork(false)

    if (!Number.isFinite(answer)) {
      setRecognizedAnswer(null)
      setReadError(true)
      return
    }

    setRecognizedAnswer(answer)
    setReadError(false)
    onSubmitAnswer(answer)
  }

  return (
    <section className="work-panel" aria-labelledby="work-title">
      <div className="work-panel-header">
        <div>
          <h2 id="work-title">{text.workArea}</h2>
          <p>{text.workHint}</p>
        </div>
        <div className="work-tools">
          <button className="secondary compact-button" type="button" onClick={undoWork} disabled={!hasUndo || status !== 'ready'}>
            {text.undoWork}
          </button>
          <button className="secondary compact-button" type="button" onClick={clearAll} disabled={status !== 'ready'}>
            {text.clearWork}
          </button>
        </div>
      </div>

      <canvas
        ref={workCanvasRef}
        className="scratch-canvas"
        aria-label={text.workArea}
        onPointerCancel={stopDrawing}
        onPointerDown={(event) => startDrawing(event, workCanvasRef.current, 'work')}
        onPointerLeave={stopDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
      />

      <div className="final-answer-panel">
        <div>
          <h3>{text.finalAnswer}</h3>
          <p>{text.finalAnswerHint}</p>
        </div>
        <div className="digit-canvas-row">
          {Array.from({ length: answerDigitCount }, (_, index) => (
            <canvas
              key={index}
              ref={(canvas) => {
                answerCanvasRefs.current[index] = canvas
              }}
              className="digit-canvas"
              aria-label={`${text.finalAnswer} ${index + 1}`}
              onPointerCancel={stopDrawing}
              onPointerDown={(event) => startDrawing(event, answerCanvasRefs.current[index], 'answer', index)}
              onPointerLeave={stopDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
            />
          ))}
        </div>
      </div>

      {recognizedAnswer !== null ? (
        <p className="work-submitted">{text.recognizedAnswer}: {recognizedAnswer}</p>
      ) : null}
      {isReadingWork ? <p className="feedback">{text.readingWork}</p> : null}
      {readError ? <p className="feedback incorrect">{text.answerNotRead}</p> : null}

      <button className="primary" type="button" onClick={submitWork} disabled={!hasAnswerInk || isReadingWork || status !== 'ready'}>
        {text.submitWork}
      </button>
    </section>
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
  const [questionKey, setQuestionKey] = useState(0)
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
    setQuestionKey((value) => value + 1)
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

  function checkAnswer(recognizedAnswer) {
    const submittedAnswer =
      answerMode === 'work'
        ? recognizedAnswer
        : answerMode === 'input'
          ? Number(typedAnswer)
          : selectedAnswer

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
    (answerMode === 'input'
      ? typedAnswer.trim() !== ''
      : answerMode === 'mcq'
        ? selectedAnswer !== null
        : false)

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
          onChangeMode={(nextMode) => {
            setAnswerMode(nextMode)
            setTypedAnswer('')
            setSelectedAnswer(null)
            setStatus('ready')
          }}
          question={question}
          questionKey={questionKey}
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
  onChangeMode,
  onCheck,
  onNext,
  onToggleHint,
  question,
  questionKey,
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
          : answerMode === 'mcq'
            ? text.pickAnswer
            : text.workAnswer

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
        <label className="mode-select">
          <span>{text.answerMode}</span>
          <select value={answerMode} onChange={(event) => onChangeMode(event.target.value)}>
            <option value="input">{text.inputMode}</option>
            <option value="mcq">{text.mcqMode}</option>
            <option value="work">{text.workMode}</option>
          </select>
        </label>
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
        ) : answerMode === 'mcq' ? (
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
        ) : (
          <WorkCanvas
            answerDigitCount={String(Math.abs(question.answer)).length}
            key={questionKey}
            onSubmitAnswer={onCheck}
            question={question}
            status={status}
            text={text}
          />
        )}

        <p className={`feedback ${feedbackStatus}`}>{feedback}</p>

        <div className="action-row">
          <button className="secondary" type="button" onClick={onToggleHint}>
            {showHint ? text.hideHint : text.hint}
          </button>
          {status === 'ready' && answerMode !== 'work' ? (
            <button className="primary" type="button" onClick={onCheck} disabled={!canCheck}>
              {text.check}
            </button>
          ) : status !== 'ready' ? (
            <button className="primary" type="button" onClick={onNext}>
              {text.next}
            </button>
          ) : (
            <span className="work-action-spacer" aria-hidden="true"></span>
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
