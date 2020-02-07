/**
 * showSalary
 * @param {Array} data - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(data, age) {
  let result = data.filter(item => item.age <= age).map(item => item.name + ", " + item.balance + "\n");

  let x = result.join("");

  return x.substring(0, x.length - 1);
}
