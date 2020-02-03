/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let arr = str.split(',').join(' ').split(' ');
  let x = [];
  for (let number of arr) {
    if (Number(number)) {
      x.push(number);
    }
  }

  x.sort(function(a, b) { return a - b; });
  
  let d = {};

  d.min = +x[0];
  d.max = +x[x.length - 1];

  return d;
}
