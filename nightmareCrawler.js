var Nightmare = require('nightmare');       
var nightmare = Nightmare({ show: true })

nightmare
  .goto('https://www.thecrossroadsmall.com/en/directory/map.html')
  .wait('.view-switcher__button')
  .click('.view-switcher__button')
  .evaluate(function () {
      return document.querySelector('.view-switcher__button').textContent;
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('failed:', error);
  });