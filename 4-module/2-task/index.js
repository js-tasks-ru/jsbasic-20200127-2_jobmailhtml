/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
  for (let i = 0; i < Object.keys(table.rows).length; i++) {
    table.rows[i].cells[i].style.backgroundColor = "red";
  }
}
