/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  let x = str.toLowerCase();

  if (x.includes("1xbet") == 1 || x.includes("xxx") == 1) {
    return true;
  } else {
    return false;
  }
}
