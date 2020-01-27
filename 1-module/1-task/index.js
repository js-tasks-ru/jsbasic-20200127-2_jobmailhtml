/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let x = 1;

  if (n == 0) {
    x = 1;
  } else {
    for (let i = 1; i <= n; i++) {
      x *= i;
    }
  }

  return x;
}
