/**
 * Компонент, который реализует сортируемую таблицу
 * @param {Array} items - данные, которые нужно отобразить
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },
 *
 * @constructor
 */
function SortableTable(items) {
  /**
   * @property {Element} - обязательно свойство, которое ссылается на элемент <table>
   */
  this.el = document.createElement('table');

  let fragment = new DocumentFragment();
  let wrapHeader = document.createElement('thead');
  let wrapBody = document.createElement('tbody');

  let user = {};

  for (let variable of items) {
    let cell, cellRow, cellTitle;

    cellRow = document.createElement('tr');
    cellRowHeader = document.createElement('tr');

    Object.assign(user, variable);

    for (let item in variable) {
      cell = document.createElement('td');
      cell.append(variable[item]);
      cellRow.append(cell);
    }
    
    wrapBody.append(cellRow);
  }

  for (var itemname in user) {
    cellTitle = document.createElement('td');
    let newName = itemname[0].toUpperCase() + itemname.slice(1);
    cellTitle.append(newName);
    cellRowHeader.append(cellTitle);
  }

  wrapHeader.append(cellRowHeader);

  fragment.append(wrapHeader);
  fragment.append(wrapBody);

  this.el.append(fragment);

  /**
   * Метод выполняет сортировку таблицы
   * @param {number} column - номер колонки, по которой
   * нужно выполнить сортировку (отсчет начинается от 0)
   * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
   */
  this.sort = (column, desc = false) => {

    let sortedRows = Array.from(this.el.rows);
    let currentCol = this.el.rows[1].cells[column].innerHTML;
    let newSort;

    if (desc) {
      if (Number(currentCol)) {
        newSort = sortedRows.slice(1).sort((rowA, rowB) => rowB.cells[column].textContent - rowA.cells[column].textContent);
      } else if (String(currentCol)) {
        newSort = sortedRows.slice(1).sort((rowA, rowB) => rowA.cells[column].textContent > rowB.cells[column].textContent ? 1 : -1).reverse();
      }
    } else {
      if (Number(currentCol)) {
        newSort = sortedRows.slice(1).sort((rowA, rowB) => rowA.cells[column].textContent - rowB.cells[column].textContent);
      } else if (String(currentCol)) {
        newSort = sortedRows.slice(1).sort((rowA, rowB) => rowA.cells[column].textContent > rowB.cells[column].textContent ? 1 : -1);
      }
    }

    wrapBody.append(...newSort);
    return this.el.append(wrapBody);
  };
}
