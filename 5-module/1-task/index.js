/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  let cellAge, cellHidden;

  for (let i = 0; i < Object.keys(table.rows).length; i++) {
    let cellSex = table.rows[i].cells[2];

    if (cellSex.textContent === "m") {
      cellSex.closest('tr').classList.add("male");
    } else if (cellSex.textContent === "f") {
      cellSex.closest('tr').classList.add("female");
    }

    cellAge = table.rows[i].cells[1];

    if (cellAge.textContent < 18) {
      cellAge.closest('tr').style.textDecoration = "line-through";
    }

    cellHidden = table.rows[i].cells[3];

    if (cellHidden.closest('tr').closest('tbody')) {
      if (cellHidden.getAttribute('data-available') == 'true') {
        cellHidden.closest('tr').classList.add("available");
      } else if (cellHidden.getAttribute('data-available') == 'false') {
        cellHidden.closest('tr').classList.add("unavailable");
      } else {
        cellHidden.closest('tr').hidden = true;
      }
    }
  }
}
