/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  let newArray = [];

  for (let item of arr) {
    if (item >= a && item <= b) {
      newArray.push(item);
    }
  }

  return newArray;
}
