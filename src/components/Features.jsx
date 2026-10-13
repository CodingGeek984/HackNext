import examMascot from '../images/Exam mascot from Ventorme.png'
import graduationMascot from '../images/img.png'
import ribbon from '../images/Path-1.png'
import accentArc from '../assets/hero.png'

const CARDS = [
  {
    id: 'plan',
    tone: 'card-pink',
    span: 'span-2',
    title: 'Построй план твоего поступления',
    text: 'мы помогаем собрать твой план от начала выбора ВУЗ-а до подачи документов',
  },
  {
    id: 'essay',
    tone: 'card-purple',
    span: 'span-2',
    title: 'Напиши сильное эссе',
    text: 'прокачай свое эссе в нашем констукторе',
  },
  {
    id: 'exams',
    tone: 'card-lime',
    span: 'span-2',
    title: 'Подготовься к экзаменам',
    text: 'Отслеживай процесс подготовки к SAT, IELTS/TOEFL и школьным баллам',
    media: {
      src: examMascot,
      alt: 'Талисман подготовки к экзаменам',
      badge: 'corner',
    },
  },
  {
    id: 'scholarships',
    tone: 'card-purple',
    span: 'span-3',
    title: 'Найди стипендии',
    text: 'Получи подборку грантов и финансовых программ под твой профиль',
  },
  {
    id: 'apply',
    tone: 'card-purple',
    span: 'span-3',
    title: 'Подай заявки',
    text: 'Собери полный пакет документов и отправь заявки без ошибок',
    media: {
      src: graduationMascot,
      alt: 'Талисман выпускника VentorMe в академической шапочке',
      badge: 'white',
    },
  },
]

export default function Features() {
  return (
    <section className="section features" id="features">
      <div className="features__ribbon" aria-hidden="true">
        <img
          className="features__ribbon-img"
          src={ribbon}
          alt=""
          loading="lazy"
        />
        <img
          className="features__accent"
          src={accentArc}
          alt=""
          loading="lazy"
        />
      </div>

      <div className="container">
        <div className="section__head">
          <h2 className="section__title">Все что нужно в одной платформе</h2>
        </div>

        <div className="bento">
          {CARDS.map((card, index) => (
            <article
              key={card.id}
              className={`bento__card ${card.tone} ${card.span}${
                card.media ? ` bento__card--badge-${card.media.badge}` : ''
              }`}
            >
              <span className="bento__index" aria-hidden="true">
                0{index + 1}
              </span>

              <div className="bento__body">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>

              {card.media && (
                <div
                  className={`mascot-orb mascot-orb--${card.media.badge}`}
                  aria-hidden="true"
                >
                  <img
                    className="mascot-orb__img"
                    src={card.media.src}
                    alt=""
                    loading="lazy"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
