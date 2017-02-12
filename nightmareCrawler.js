var Nightmare = require('nightmare');       
var nightmare = Nightmare({ show: true })

nightmare
  .goto('https://www.thecrossroadsmall.com/en/directory/map.html')
  .wait('.Units')
  .click('.Units')
  .wait('.pop-up-window-container')
  .evaluate(function () {
      var child = document.querySelector('.store-detail').firstElementChild;
      return child.textContent;
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('failed:', error);
  });