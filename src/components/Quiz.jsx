import { useMemo, useState } from 'react'
import ventiQuiz from '../images/venti-quiz.webp'
import ventiGift from '../images/venti-gift.webp'

const REGISTER_URL =
  'https://ventorme.ai/register?utm_source=hacknext&utm_campaign=team-052'

const TOTAL_STEPS = 8

const ABCD_QUESTIONS = [
  {
    id: 'n_free_topic',
    text: 'Учитель даёт свободное задание — исследуй любую тему. Ты скорее...',
    options: {
      a: 'Собираю данные, строю структуру и делаю чёткий аналитический разбор',
      b: 'Выбираю необычный угол и делаю что-то нестандартное и визуально сильное',
      c: 'Сразу ищу, как это связано с реальными людьми и их потребностями',
      d: 'Организую процесс: план, сроки, раздаю задачи',
    },
  },
  {
    id: 'n_team_role',
    text: 'В групповом проекте твоя естественная роль — это...',
    options: {
      a: 'Аналитик — собираю данные, проверяю факты, выявляю риски',
      b: 'Генератор идей — придумываю концепции, делаю продукт интереснее',
      c: 'Коммуникатор — связываю команду, веду переговоры, презентую',
      d: 'Организатор — распределяю задачи, слежу за дедлайнами',
    },
  },
  {
    id: 'n_new_task',
    text: 'Как ты подходишь к новой задаче?',
    options: {
      a: 'Разбиваю на части и анализирую по шагам',
      b: 'Ищу нестандартный, креативный путь',
      c: 'Обсуждаю с другими, собираю мнения',
      d: 'Сразу прикидываю план и берусь за дело',
    },
  },
  {
    id: 'n_work_with',
    text: 'С чем тебе интереснее работать?',
    options: {
      a: 'С данными и числами',
      b: 'С идеями и образами',
      c: 'С людьми',
      d: 'С предметами и техникой',
    },
  },
  {
    id: 'mq_hours',
    text: 'Чем бы ты занимался часами, даже бесплатно?',
    options: {
      a: 'Копаться в технике: разбирать, собирать, чинить',
      b: 'Создавать своё: рисунок, видео, тексты, музыка',
      c: 'Быть с людьми: помогать, объяснять, разруливать',
      d: 'Придумывать, как заработать, и договариваться',
    },
  },
  {
    id: 'mq_subjects',
    text: 'Какие предметы даются легче всего?',
    options: {
      a: 'Математика и физика',
      b: 'Биология и химия',
      c: 'Языки, литература, история',
      d: 'Общество, экономика, право',
    },
  },
]

const LIKERTS = {
  lk_it: 'Мне интересно создавать программы, сайты или работать с данными',
  lk_engineering:
    'Мне нравится придумывать и собирать: устройства, роботов, механизмы',
  lk_design:
    'Мне нравится придумывать, как вещи и приложения выглядят и удобны',
  lk_media: 'Мне интересно работать с текстами, видео, соцсетями и доносить идеи',
  lk_medicine:
    'Мне интересно, как устроено здоровье и как помогать людям лечиться',
  lk_psychology:
    'Мне интересно понимать, почему люди ведут себя так, как ведут',
  lk_economics: 'Мне интересно, как работают деньги и экономика',
  lk_law: 'Мне интересны законы, справедливость и правила, по которым живут люди',
  lk_languages:
    'Мне интересны иностранные языки, разные культуры и общение с людьми из других стран',
}

const AXIS_PAIRS = {
  a: ['lk_it', 'lk_engineering'],
  b: ['lk_design', 'lk_languages'],
  c: ['lk_medicine', 'lk_psychology'],
  d: ['lk_economics', 'lk_law'],
}

const SPECIAL_MAP = {
  mq_hours: { a: ['a'], b: ['b', 'b'], c: ['c', 'c'], d: ['d'] },
  mq_subjects: { a: ['a', 'a'], b: ['a', 'c'], c: ['b'], d: ['d', 'd'] },
}

const AXES = {
  a: {
    emoji: '🛠️',
    title: 'Технологии и инженерия',
    professions: [
      'Программист',
      'AI-аналитик',
      'Data Scientist',
      'Инженер',
      'Архитектор',
    ],
  },
  b: {
    emoji: '🖌️',
    title: 'Дизайн, медиа и языки',
    professions: [
      'UX/UI-дизайнер',
      'Графический дизайнер',
      'Контент-мейкер',
      'Переводчик',
      'Маркетолог',
    ],
  },
  c: {
    emoji: '🩺',
    title: 'Люди и здоровье',
    professions: [
      'Врач',
      'Психолог',
      'Педагог',
      'HR-специалист',
      'Социальный работник',
    ],
  },
  d: {
    emoji: '💼',
    title: 'Бизнес и право',
    professions: [
      'Предприниматель',
      'Юрист',
      'Экономист',
      'Продуктовый менеджер',
      'Аналитик рынка',
    ],
  },
}

const OPTION_KEYS = ['a', 'b', 'c', 'd']
const SCALE_VALUES = [1, 2, 3, 4, 5]

function computeLeadingAxis(answers) {
  const scores = { a: 0, b: 0, c: 0, d: 0 }

  for (const question of ABCD_QUESTIONS) {
    const value = answers[question.id]
    if (typeof value !== 'string') continue

    const map = SPECIAL_MAP[question.id]
    if (map) {
      for (const axis of map[value] ?? []) scores[axis] += 3
      continue
    }
    if (value in scores) scores[value] += 2
  }

  return OPTION_KEYS.reduce(
    (best, axis) => (scores[axis] > scores[best] ? axis : best),
    'a',
  )
}

function buildSteps(answers) {
  const abcdSteps = ABCD_QUESTIONS.map((question) => ({
    kind: 'abcd',
    id: question.id,
  }))

  const allAnswered = ABCD_QUESTIONS.every(
    (question) => typeof answers[question.id] === 'string',
  )
  if (!allAnswered) return abcdSteps

  const axis = computeLeadingAxis(answers)
  return [
    ...abcdSteps,
    ...AXIS_PAIRS[axis].map((id) => ({ kind: 'likert', id })),
  ]
}

function computeAxisScores(answers) {
  const scores = { a: 0, b: 0, c: 0, d: 0 }

  for (const question of ABCD_QUESTIONS) {
    const value = answers[question.id]
    if (typeof value !== 'string') continue

    const map = SPECIAL_MAP[question.id]
    if (map) {
      for (const axis of map[value] ?? []) scores[axis] += 3
      continue
    }
    if (value in scores) scores[value] += 2
  }

  for (const [axis, ids] of Object.entries(AXIS_PAIRS)) {
    for (const id of ids) {
      const value = answers[id]
      if (typeof value === 'number') scores[axis] += value
    }
  }

  return scores
}

export default function Quiz() {
  const [phase, setPhase] = useState('intro')
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  const steps = useMemo(() => buildSteps(answers), [answers])
  const safeIndex = Math.min(stepIndex, steps.length - 1)
  const step = steps[safeIndex]

  const answeredCount = steps.filter(
    (item) => answers[item.id] !== undefined,
  ).length
  const progress =
    phase === 'result'
      ? 100
      : Math.round(
          (Math.min(answeredCount + 1, TOTAL_STEPS) / TOTAL_STEPS) * 100,
        )

  const directions = useMemo(() => {
    if (phase !== 'result') return []
    const scores = computeAxisScores(answers)
    const max = Math.max(...Object.values(scores), 1)
    return Object.entries(AXES)
      .map(([id, meta]) => ({
        id,
        ...meta,
        pct: Math.round(96 * Math.pow(scores[id] / max, 1.3)),
      }))
      .sort((first, second) => second.pct - first.pct)
  }, [phase, answers])

  const commit = (id, value) => {
    const merged = { ...answers, [id]: value }
    const nextSteps = buildSteps(merged)
    const ids = new Set(nextSteps.map((item) => item.id))
    const next = Object.fromEntries(
      Object.entries(merged).filter(([key]) => ids.has(key)),
    )

    setAnswers(next)

    const complete =
      nextSteps.length === TOTAL_STEPS &&
      nextSteps.every((item) => next[item.id] !== undefined)

    if (complete) {
      setPhase('result')
    } else {
      setStepIndex((current) => Math.min(current + 1, TOTAL_STEPS - 1))
    }
  }

  const handleStart = () => {
    setAnswers({})
    setStepIndex(0)
    setPhase('quiz')
  }

  const handleBack = () => {
    if (phase === 'result') {
      setPhase('quiz')
      setStepIndex(TOTAL_STEPS - 1)
      return
    }
    setStepIndex((current) => Math.max(0, current - 1))
  }

  const handleReset = () => {
    setAnswers({})
    setStepIndex(0)
    setPhase('intro')
  }

  const counter = Math.min(answeredCount + 1, TOTAL_STEPS)
  const question = step?.kind === 'abcd'
    ? ABCD_QUESTIONS.find((item) => item.id === step.id)
    : null

  return (
    <section className="section quiz-section" id="test">
      <div className="container">
        <div className="quiz">
          {phase === 'intro' && (
            <div className="quiz-card quiz-card--intro">
              <img
                className="quiz-card__venti"
                src={ventiQuiz}
                alt=""
                aria-hidden="true"
              />
              <div className="quiz-badges">
                <span className="quiz-badge">2 мин</span>
                <span className="quiz-badge">Бесплатно</span>
              </div>
              <p className="quiz-intro-title">
                Ответь на <span>8 вопросов</span> и получи личный план
                поступления
              </p>
              <button type="button" className="quiz-start" onClick={handleStart}>
                Начать тест
              </button>
            </div>
          )}

          {phase === 'quiz' && step && (
            <div className="quiz-card quiz-card--quiz">
              <div className="quiz-head">
                {safeIndex > 0 ? (
                  <button
                    type="button"
                    className="quiz-back-btn"
                    onClick={handleBack}
                    aria-label="Назад"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 3 5 8l5 5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <span className="quiz-head__spacer" aria-hidden="true" />
                )}
                <div className="quiz-track" aria-hidden="true">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <span className="quiz-count">
                  {counter}/{TOTAL_STEPS}
                </span>
              </div>

              {question && (
                <>
                  <p className="quiz-statement">{question.text}</p>
                  <div className="quiz-options">
                    {OPTION_KEYS.map((key) => {
                      const active = answers[question.id] === key
                      return (
                        <button
                          key={key}
                          type="button"
                          className={`quiz-opt${active ? ' is-active' : ''}`}
                          onClick={() => commit(question.id, key)}
                        >
                          <span className="quiz-opt__radio" aria-hidden="true" />
                          <span className="quiz-opt__label">
                            {question.options[key]}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {step.kind === 'likert' && (
                <>
                  <p className="quiz-statement">{LIKERTS[step.id]}</p>
                  <div className="quiz-scale">
                    <div className="quiz-scale__labels">
                      <span className="quiz-scale__disagree">
                        Не согласен
                      </span>
                      <span className="quiz-scale__agree">Согласен</span>
                    </div>
                    <div className="quiz-scale__row">
                      {SCALE_VALUES.map((value) => (
                        <button
                          key={value}
                          type="button"
                          aria-label={String(value)}
                          className={`quiz-scale__dot${
                            answers[step.id] === value ? ' is-active' : ''
                          }`}
                          onClick={() => commit(step.id, value)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {phase === 'result' && (
            <div className="quiz-card quiz-card--result">
              <img
                className="quiz-card__venti quiz-card__venti--gift"
                src={ventiGift}
                alt=""
                aria-hidden="true"
              />
              <span className="quiz-label">Готово! Твой результат</span>
              <h3 className="quiz-result-title">
                Мы подобрали твои направления
              </h3>
              <p className="quiz-result-sub">
                Мы выделили 3 направления и разбор твоих сильных сторон.
              </p>

              <ul className="quiz-dirs">
                {directions.slice(0, 3).map((item) => (
                  <li className="quiz-dir" key={item.id}>
                    <span className="quiz-dir__emoji" aria-hidden="true">
                      {item.emoji}
                    </span>
                    <span className="quiz-dir__name">{item.title}</span>
                    <span className="quiz-dir__match">{item.pct}%</span>
                  </li>
                ))}
              </ul>

              {directions[0] && (
                <>
                  <p className="quiz-prof-title">Профессии</p>
                  <div className="quiz-profs">
                    {directions[0].professions.map((profession) => (
                      <span className="quiz-prof" key={profession}>
                        {profession}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <div className="quiz-actions">
                <a
                  className="quiz-cta"
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Создать аккаунт и открыть результат
                </a>
                <button
                  type="button"
                  className="quiz-retake"
                  onClick={handleReset}
                >
                  Пройти заново
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
