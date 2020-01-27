/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let x = 0;
  for (let key in salaries) {
    if (Number(salaries[key])) {
      x += salaries[key];
    } else {
      x;
    }
  }

  return x;
}
