/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
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
class ClearedTable {
  constructor(data) {
    this.el = document.createElement('table');
    this.data = data;
    this.el.classList.add('pure-table');
    this.templateSheet(data);

    this.linkEvent = this.el.querySelectorAll('a');

    [...this.linkEvent].map( btn => btn.addEventListener("click", (id) => {
      let parentItem = btn.closest('tr');
      parentItem.remove();

      return  this.onRemoved(+id.target.closest('tr').getAttribute('data-id'));
    }));
  }

  templateSheet(data) {
    let fragment = new DocumentFragment();
    let wrapHeader = document.createElement('thead');
    let wrapBody = document.createElement('tbody');

    let user = {};
    let cell, cellRow, cellTitle, cellRowHeader;

    for (let variable of data) {
      cellRow = document.createElement('tr');
      cellRowHeader = document.createElement('tr');

      Object.assign(user, variable);

      for (let item in variable) {
        cell = document.createElement('td');
        if (!(item === "id")) {
          cell.append(variable[item]);
          cellRow.append(cell);
        }

        cellRow.setAttribute('data-id', variable.id);
      }

      cellRow.insertAdjacentHTML('beforeEnd', '<td><a href="#delete">X</a></td>');
      wrapBody.append(cellRow);
    }

    for (var itemname in user) {
      cellTitle = document.createElement('td');
      let newName = itemname[0].toUpperCase() + itemname.slice(1);
      if (!(itemname === "id")) {
        cellTitle.append(newName);
        cellRowHeader.append(cellTitle);
      }
    }

    cellRowHeader.insertAdjacentHTML('beforeEnd', '<td></td>');

    wrapHeader.append(cellRowHeader);

    fragment.append(wrapHeader);
    fragment.append(wrapBody);

    this.el.append(fragment);
  }

  /**
   * Метод который вызывается после удалении строки
   * @param {number} id - идентификатор удаляемого пользователя
   */
  onRemoved(id) {
    alert("Удалили пользователя с id " + id);
  }
}

window.ClearedTable = ClearedTable;
