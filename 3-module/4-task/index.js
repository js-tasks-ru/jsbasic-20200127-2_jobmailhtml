/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
  let newArray = [];
  for (let key of users) {
    newArray.push(key.name);
  }
  return newArray;
}
