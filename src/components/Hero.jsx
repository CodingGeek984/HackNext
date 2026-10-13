import { IconCheck } from './Icons'
import heroShape from '../images/Path.png'

const HERO_FEATURES = [
  'Построй план твоего поступления',
  'Напиши сильное эссе',
  'Подготовься к экзаменам',
  'Найди стипендии',
  'Подай заявки',
]

export default function Hero() {
  return (
    <header className="hero">
      <span className="hero__glow hero__glow--one" />
      <span className="hero__glow hero__glow--two" />
      <img
        className="hero__shape"
        src={heroShape}
        alt=""
        aria-hidden="true"
        loading="eager"
      />

      <div className="container">
        <div className="hero__top">
          <a className="brand" href="#top">
            <span className="brand__mark" aria-hidden="true">
              V
            </span>
            VentorMe
          </a>
          <nav className="nav" aria-label="Основная навигация">
            <a className="nav__link" href="#features">
              Возможности
            </a>
            <a className="nav__link" href="#roadmap">
              План поступления
            </a>
            <a className="nav__link" href="#compare">
              Почему Ventorme
            </a>
            <a className="nav__login" href="https://ventorme.ai/register?utm_source=hacknext&utm_campaign=team-052" target="_blank" rel="noopener noreferrer">
              Войти
            </a>
          </nav>
        </div>

        <div className="hero__grid">
          <div className="hero__left">
            <h1 className="hero__title">
              Определи направление для поступления и проверь подготовку к
              экзаменам
            </h1>
            <p className="hero__subtitle">
              Зарегистрируйся бесплатно и найди подходящее направление через
              мини-тест, оцени подготовку к ЕНТ, SAT и IELTS и узнай, чего не
              хватает для сильной заявки.
            </p>
            <div className="hero__cta-row">
              <a className="btn btn-lime btn-lg" href="https://ventorme.ai/register?utm_source=hacknext&utm_campaign=team-052" target="_blank" rel="noopener noreferrer">
                Начать бесплатно
              </a>
              <span className="hero__note">Без карты · 2 минуты на старт</span>
            </div>
          </div>

          <aside className="hero__card" aria-label="Возможности платформы">
            <p className="hero__card-label">Что внутри</p>
            <ul className="feature-list">
              {HERO_FEATURES.map((feature) => (
                <li className="feature-list__item" key={feature}>
                  <span className="check-dot" aria-hidden="true">
                    <IconCheck />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </header>
  )
}
