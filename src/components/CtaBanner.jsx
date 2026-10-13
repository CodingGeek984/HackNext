import mascot from '../images/Rectangle.png'

export default function CtaBanner() {
  return (
    <section className="cta-wrap" id="cta">
      <div className="container">
        <div className="cta">
          <span className="cta__glow" aria-hidden="true" />
          <span className="cta__stripes" aria-hidden="true" />

          <div className="cta__content">
            <h2 className="cta__title">
              Твоё поступление начинается с первого шага
            </h2>
            <p className="cta__sub">
              Найди подходящее направление и узнай свой уровень SAT и IELTS. Начни
              бесплатно в Ventorme.
            </p>
            <a className="btn btn-lime btn-lg cta__btn" href="#top">
              Начать бесплатно
            </a>
          </div>

          <div className="cta__media">
            <span className="cta__orb" aria-hidden="true" />
            <img
              className="cta__mascot"
              src={mascot}
              alt="Талисман VentorMe — снежный барс"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
