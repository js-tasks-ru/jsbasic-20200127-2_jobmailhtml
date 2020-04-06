/**
 * promiseClick
 * @param {Element} button index
 * @returns {Promise}
 */

function promiseClick(button) {
 return new Promise(function(resolve, reject) {
   button.addEventListener('click', event => clickFunc(event), { once: true });

   function clickFunc(event) {
     resolve(event);
   }
 });
}
