/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let node = document.createElement("ul");
  let fragment = new DocumentFragment();

  for (let variable of friends) {
    let li = document.createElement('li');
    li.append(variable.firstName + " " + variable.lastName);
    fragment.append(li);
  }

  node.append(fragment);

  return node;
}
