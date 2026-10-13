import { useState } from 'react'
import { IconArrow, IconHeart, IconTarget } from './Icons'

const STEPS = [
  {
    id: 'step-1',
    num: '01',
    title: 'Подбери университеты и стипендии',
    desc: 'Найди варианты под свои баллы, профиль и бюджет.',
  },
  { id: 'step-2', num: '02', title: 'Получи план поступления' },
  { id: 'step-3', num: '03', title: 'Подготовься к экзаменам' },
  { id: 'step-4', num: '04', title: 'Подготовь эссе и заявки' },
]

const FILTERS = ['Все варианты', 'Стипендии', 'По направлению']

const UNIVERSITIES = [
  {
    id: 'kmu',
    title: 'KMU International Student Scholarship Type A',
    university: 'Kaohsiung Medical University',
    country: 'Тайвань',
    tag: 'Стипендии',
  },
  {
    id: 'ocu',
    title: 'Dance Talent Scholarships',
    university: 'Oklahoma City University',
    country: 'США',
    tag: 'По направлению',
  },
  {
    id: 'roma',
    title: 'ISEE-based progressive fee reduction',
    university: 'Roma Tre University',
    country: 'Италия',
    tag: 'Стипендии',
  },
]

const STEP_CONTENT = {
  'step-2': {
    title: 'Твой персональный план поступления',
    items: [
      {
        title: 'Календарь дедлайнов',
        text: 'Все сроки по вузам, экзаменам и документам в одном расписании.',
      },
      {
        title: 'Чек-лист документов',
        text: 'Пошаговый список того, что подготовить и когда подать.',
      },
      {
        title: 'Напоминания о сроках',
        text: 'Платформа подскажет, что сделать на этой неделе.',
      },
    ],
  },
  'step-3': {
    title: 'Подготовка к экзаменам под контролем',
    items: [
      {
        title: 'Диагностика SAT / IELTS',
        text: 'Быстрый тест покажет стартовый уровень и пробелы.',
      },
      {
        title: 'Персональные тренажёры',
        text: 'Задания под твой уровень — от лексики до математики.',
      },
      {
        title: 'Прогресс и слабые места',
        text: 'Следи за динамикой и фокусируйся на том, что даёт баллы.',
      },
    ],
  },
  'step-4': {
    title: 'Эссе и заявки без ошибок',
    items: [
      {
        title: 'Конструктор эссе',
        text: 'Структура, подсказки и примеры сильных вступлений.',
      },
      {
        title: 'Проверка черновика',
        text: 'Обратная связь по содержанию, логике и языку.',
      },
      {
        title: 'Финальная заявка',
        text: 'Соберите пакет документов и отправьте без пропусков.',
      },
    ],
  },
}

export default function Roadmap() {
  const [activeStep, setActiveStep] = useState('step-1')
  const [activeFilter, setActiveFilter] = useState('Все варианты')
  const [favorites, setFavorites] = useState([])

  const visibleUniversities =
    activeFilter === 'Все варианты'
      ? UNIVERSITIES
      : UNIVERSITIES.filter((item) => item.tag === activeFilter)

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const renderPanel = (withBar) => {
    const bar = withBar && (
      <div className="roadmap__bar">
        <span className="roadmap__bar-text">
          Доступно по платной подписке Plus
        </span>
        <a className="btn btn-lime roadmap__bar-btn" href="#cta">
          Посмотреть Plus
          <IconArrow />
        </a>
      </div>
    )

    if (activeStep === 'step-1') {
      return (
        <>
          <p className="roadmap__panel-title">Подходящие варианты для тебя</p>
          <div className="filters" role="group" aria-label="Фильтры">
            {FILTERS.map((filter) => (
              <button
                type="button"
                key={filter}
                className={`filter${
                  activeFilter === filter ? ' is-active' : ''
                }`}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="uni-list">
            {visibleUniversities.map((item) => {
              const isFavorite = favorites.includes(item.id)
              return (
                <article className="uni" key={item.id}>
                  <div>
                    <h3 className="uni__title">{item.title}</h3>
                    <p className="uni__meta">
                      <strong>{item.university}</strong> · {item.country}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`heart${isFavorite ? ' is-active' : ''}`}
                    aria-label={
                      isFavorite
                        ? 'Убрать из избранного'
                        : 'Добавить в избранное'
                    }
                    aria-pressed={isFavorite}
                    onClick={() => toggleFavorite(item.id)}
                  >
                    <IconHeart filled={isFavorite} />
                  </button>
                </article>
              )
            })}
          </div>

          {bar}
        </>
      )
    }

    const stepContent = STEP_CONTENT[activeStep]

    return (
      <>
        <p className="roadmap__panel-title">{stepContent.title}</p>
        <div className="panel-list">
          {stepContent.items.map((item) => (
            <div className="panel-list__item" key={item.title}>
              <span className="panel-list__dot" aria-hidden="true">
                <IconTarget />
              </span>
              <div>
                <p className="panel-list__title">{item.title}</p>
                <p className="panel-list__text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        {bar}
      </>
    )
  }

  return (
    <section className="section roadmap" id="roadmap">
      <div className="container">
        <div className="section__head">
          <span className="section__eyebrow">Ventorme Plus</span>
          <h2 className="section__title">
            Твой путь поступления с Ventorme Plus
          </h2>
          <p className="section__sub">
            От выбора университета до подготовки заявки — шаг за шагом в одной
            платформе
          </p>
        </div>

        <div className="roadmap__grid">
          <div className="steps" role="tablist" aria-label="Шаги поступления">
            {STEPS.map((step) => {
              const isActive = activeStep === step.id
              return (
                <div
                  className={`step-item${isActive ? ' is-active' : ''}`}
                  key={step.id}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`step${isActive ? ' is-active' : ''}`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <span className="step__num">{step.num}</span>
                    <span>
                      <span className="step__title">{step.title}</span>
                      {step.desc && (
                        <span className="step__desc">{step.desc}</span>
                      )}
                    </span>
                  </button>

                  {isActive && (
                    <div className="step__accordion">{renderPanel(false)}</div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="roadmap__panel">{renderPanel(true)}</div>
        </div>

        <a className="btn btn-lime roadmap__mobile-cta" href="#cta">
          Посмотреть Plus
          <IconArrow />
        </a>
      </div>
    </section>
  )
}
