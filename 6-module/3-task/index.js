'use strict';

class Menu {
  template = `
  <ul class="list-group sidebar">
    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cameraphotos">Camera &amp; Photo</a>
      <ul class="dropdown-menu">

       <li data-id="cameraphotos_accessories" class="dropdown-item"><a>Accessories</a></li>

      </ul>
    </li>

    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cinema">Home Cinema, TV &amp; Video</a>
      <ul class="dropdown-menu">

       <li data-id="cinema_audio" class="dropdown-item"><a>Audio</a></li>

       <li data-id="cinema_video" class="dropdown-item"><a>Video</a></li>

      </ul>
    </li>
  </ul>
  `;

  constructor(element) {
    this.el = element;

    // add template for html page
    this.el.insertAdjacentHTML(`afterBegin`, this.template);

    // navi group item
    this._naviGroup = this.el.querySelectorAll('.list-group-item');

    for (let item of this._naviGroup) {
      item.addEventListener('pointerenter', event => this.pointerEnter(event));
      item.addEventListener('pointerleave', event => this.pointerEnter(event));
    }

    // search back Drop
    this._backDrop = document.querySelector('.backdrop');
  }

  pointerEnter(event) {
    let target = event.target;
    this._dropMenu = target.querySelector('.dropdown-menu');
    this._dropMenu.classList.toggle("show");

    this._backDrop.classList.toggle("show");
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Menu = Menu;
