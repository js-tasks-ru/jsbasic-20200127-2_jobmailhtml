/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  // let x = name.length;
  // if (x < 4 || x == 0 || name.includes(" ")) {
  //   return false;
  // } else {
  //   return true;
  // }
  let x = String(name);
  if (x.length < 4 || name === undefined ||  x.includes(" ")) {
    return false;
  } else {
    return true;
  }
}

function sayHello() {
  const userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
