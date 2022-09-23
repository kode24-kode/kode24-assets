/**
 * fetches data for company league (bedriftsligaen) and displays a table in the left menu of kode24.no
 */
import { getCompanyLeagueTableData } from "../API/api";

export async function initCompanyLeague() {
  const companyLeagueData = await getCompanyLeagueTableData();
  console.log(companyLeagueData);
  document
    .getElementById("left-menu")
    .prepend(drawCompanyLeagueTableMarkup(companyLeagueData));
}

/**
 * Draw company league markup with container and heading
 * @param {*} data
 * @returns
 */
function drawCompanyLeagueTableMarkup(data) {
  let tableWrapper = document.createElement("nav");
  tableWrapper.classList.add("company-league-table-wrapper");
  let table = document.createElement("table");
  tableWrapper.innerHTML = `<h3>${data.name}</h3>`;
  table.classList.add("company-league-table");
  table.innerHTML = data.standings
    .map(
      (leagueRow) => `<tr>
        <td>
            <img src="${leagueRow.team.imageUrl}" alt="${leagueRow.team.name}" />
        </td>
        <td>${leagueRow.team.name}</td>
        <td>${leagueRow.points}</td>
    </tr>`
    )
    .join("");
  tableWrapper.append(table);
  return tableWrapper;
}
