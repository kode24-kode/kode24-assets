import { useState } from "react";
import type { Christmas2025Highscore } from "../types";
export default function CompetitionHighscore({
  highscore,
}: {
  highscore: Christmas2025Highscore;
  //teams: [HighscoreTeam] | undefined;
}) {
  const [usersLength] = useState(5);
  const [teamsLength] = useState(5);
  return (
    <div className="desktop-row card christmas-highscore">
      <div className="heading">
        <h2 className="heading-title">
          <span className="jingle">🎄</span> Julekalender 2025{" "}
          <span className="jingle">🎄</span>
        </h2>
      </div>
      <p>
        <strong>Nye vinnersjanser hver dag!</strong>
      </p>

      <a className="button" href="https://tomarchy.kode24.no">
        Bli med!
      </a>
      <a
        className="button secondary"
        href="https://www.kode24.no/artikkel/kode24s-julekalender-2025-bli-konsulent-i-tomarchy/250397"
      >
        Les mer om konkurransen
      </a>
      <div className="heading">
        <h3 className="heading-title">toppliste brukere:</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Poeng</th>
          </tr>
        </thead>
        <tbody>
          {highscore.user &&
            highscore.user.slice(0, usersLength).map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.totalscore}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="heading">
        <h3 className="heading-title">toppliste lag:</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Poeng</th>
          </tr>
        </thead>
        <tbody>
          {highscore.team &&
            highscore.team.slice(0, teamsLength).map((team) => (
              <tr key={team.id}>
                <td>{team.name}</td>
                <td>{team.totalscore}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="sponsors">
        <p>Sponset av:</p>
        <div className="sponsor">
          <a href="https://telenor.no/jobb">
            <img
              src="https://kode24-image-cache.onrender.com/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F2i41qvsb%2Fproduction%2F652100590f78b8482fa4def186bde76442d87f57-128x99.png%3Ffit%3Dmax%26format%3Dwebp"
              alt="telenor-logo"
            />
          </a>
        </div>
        <div className="sponsor">
          <a href="https://partner.kode24.no/capgemini">
            <img
              src="https://kode24-image-cache.onrender.com/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F2i41qvsb%2Fproduction%2F185a60eef25e713da075f37bcfb40ce35c1ffc6d-1308x291.png%3Ffit%3Dmax%26format%3Dwebp"
              alt="capgemini-logo"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
