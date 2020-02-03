/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let array = str.split('-');
  let newArr = array.slice(0, 1);

  for (let item of array.slice(1)) {
    newArr.push(item[0].toUpperCase() + item.slice(1));
  }

  str = newArr.join("");

  return str;
}
