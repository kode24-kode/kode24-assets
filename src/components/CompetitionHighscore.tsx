import { HighScoreUser, HighscoreTeam } from '../types';
import { useState } from 'react';
export default function CompetitionHighscore({
  users,
  teams,
}: {
  users: [HighScoreUser] | undefined;
  teams: [HighscoreTeam] | undefined;
}) {
  const [usersLength] = useState(10);
  const [teamsLength] = useState(10);
  return (
    <>
      <h2>Bli med i årets påskekrim, vinn musematte!</h2>
      <img
        className="mousepad"
        src="https://www.dagbladet.no/files/2024/03/21/musematte-trykk.png"
        alt="musematte du kan vinne, illustrert av david skaufjord"
        loading="lazy"
      />
      <p>
        Hvem har hacket helse-pla-ge.com? TomsConsult trenger din
        hjelp til å løse oppgaver i{' '}
        <a href="https://konsulent2000.com">konsulent2000</a>!
      </p>
      <p>
        Hver dag frem mot påske trekker vi vinnere av en eksklusiv
        musematte, og andre premier.
      </p>
      <a
        className="button"
        href="https://www.kode24.no/artikkel/paskekrim-2024-noen-har-hacka-helseplattformen/81119804"
      >
        Les mer her
      </a>
      <h2>toppliste brukere:</h2>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Poeng</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.slice(0, usersLength).map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.totalscore}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h2>toppliste lag:</h2>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Poeng</th>
          </tr>
        </thead>
        <tbody>
          {teams &&
            teams.slice(0, teamsLength).map((team) => (
              <tr key={team.id}>
                <td>{team.name}</td>
                <td>{team.totalscore}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
