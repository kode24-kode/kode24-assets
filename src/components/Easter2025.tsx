import { EasterTask } from "../types"
export default function EasterComponent ({task}) {
  return (
    <div id="easter-teaser">
      <h1>🐥Dagens påskerebus🐥</h1>
      {task.error && (
        <div>
          <p>Første rebusoppgave kommer mandag 15. april, følg med!</p>
        </div>
      )}
      {!task.error && (
        <div>{task.task.map((task, key) => (
          <p key={key}>{task}</p>
        ))}</div>
      )}
      {!task.error && (
        <div className="counter">
          <span>{task.progressLength} har svart hittil</span>
        </div>
      )}
      {!task.error && (
        <div className="controls">
          <a className="button" href="https://www.kode24.no/paaskerebus-2025">Løs oppgaven</a>
        </div>
      )}
    </div>
  )
}