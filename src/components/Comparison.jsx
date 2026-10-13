import { IconCheck, IconCross } from './Icons'

const ROWS = [
  {
    label: 'Подборка вузов по профилю с требованиями и объяснениями',
    chat: false,
    ventorme: true,
  },
  {
    label: 'Каталог стипендий с фильтрами и дедлайнами',
    chat: false,
    ventorme: true,
  },
  {
    label: 'Тренажёры экзаменов с отслеживанием прогресса',
    chat: false,
    ventorme: true,
  },
  {
    label: 'Профиль с баллами, достижениями и документами',
    chat: false,
    ventorme: true,
  },
  {
    label: 'ИИ-помощник для вопросов и объяснений',
    chat: true,
    ventorme: true,
  },
]

function Mark({ value }) {
  return (
    <span className={`mark ${value ? 'mark--yes' : 'mark--no'}`}>
      {value ? <IconCheck /> : <IconCross />}
    </span>
  )
}

export default function Comparison() {
  return (
    <section className="section" id="compare">
      <div className="container">
        <div className="compare">
          <div className="compare__head">
            <h2 className="compare__title">
              Всё для поступления — в одном месте
            </h2>
          </div>

          <div className="compare__scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Возможности</th>
                  <th scope="col" className="is-center">
                    Обычный ИИ-чат*
                  </th>
                  <th scope="col" className="is-center is-brand">
                    Ventorme
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td className="is-center">
                      <Mark value={row.chat} />
                    </td>
                    <td className="is-center">
                      <Mark value={row.ventorme} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
