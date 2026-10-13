import Hero from './components/Hero'
import Features from './components/Features'
import Roadmap from './components/Roadmap'
import Comparison from './components/Comparison'
import CtaBanner from './components/CtaBanner'

const CURRENT_YEAR = new Date().getFullYear()

function App() {
  return (
    <div className="page" id="top">
      <Hero />
      <main>
        <Features />
        <Roadmap />
        <Comparison />
        <CtaBanner />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span className="brand">
            <span className="brand__mark" aria-hidden="true">
              V
            </span>
            VentorMe
          </span>
          <span className="footer__text">
            © {CURRENT_YEAR} VentorMe. Платформа поступления и
            подготовки к экзаменам.
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
