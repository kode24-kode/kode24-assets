/**
 * fetches data for company league (bedriftsligaen) and displays a table in the left menu of kode24.no
 */
import { getChristmasCalendarHighscore } from '../API/api';

export async function initChristmasCalendarTable() {
  try {
    const christmasCalendarHighscore =
      await getChristmasCalendarHighscore();
    document
      .getElementById('left-menu')
      .prepend(
        drawChristmasCalendarHighscore(christmasCalendarHighscore)
      );
  } catch (error) {
    console.error(error);
  }
}

/**
 * Draw company league markup with container and heading
 * @param {*} data
 * @returns
 */
function drawChristmasCalendarHighscore(data) {
  let tableNav = document.createElement('nav');
  let tableWrapper = document.createElement('a');
  tableWrapper.setAttribute(
    'href',
    'https://www.kode24.no/julekalender'
  );
  tableWrapper.setAttribute('target', '_blank');
  tableWrapper.classList.add('christmas-calendar-table-wrapper');
  let table = document.createElement('table');
  tableWrapper.innerHTML = `<h3>Julekalender 2022 🎄</h3>
    <table class="christmas-calendar-table">

    <tbody>${data.teamScores
      .slice(0, 10)
      .map(
        (user, index) => `<tr>
        <td>${user.name}</td>
        <td>${user.points}</td>
      </tr>`
      )
      .join('')}
    </tbody>
    </table>
    <button class="button">Bli med! Premier hver dag</button>
  `;
  tableNav.append(tableWrapper);
  return tableNav;
}
