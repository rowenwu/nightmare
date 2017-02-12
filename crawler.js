var fs = require('fs');

function WriteFile(str)
{
	fs.writeFile("crawl_out.txt", str, 'utf8', function(err) {
	    if(err) return console.log(err);
	    console.log("Asynchronous read: " + data.toString());
	}); 
}

var Nightmare = require('nightmare');       
var nightmare = Nightmare({ show: true })

var dataUnits;
nightmare
	.goto('https://www.thecrossroadsmall.com/en/directory.html')
	// .scrollTo(bottom, left)
	.wait('.mall-directory-list--wrapper')
	// get list content
	// for each item in the list, add the name to the list, then click link...
	.evaluate(function () {
		// return document.querySelector('.Units-Layer').childNodes;
		return document.getElementsByClassName("mall-directory-list__content__info__info-sale");
	})
	.end()
	.then(function(result) {
		dataUnits = result;
		console.log("" + dataUnits.length);
		for(var i = 0; i < dataUnits.length; i++){
			console.log(i);
		}
	})
	.catch(function (error) {
		console.error('failed:', error);
	});
	// .click('.Units')
	// .wait('.pop-up-window-container')
	// .evaluate(function () {
	// 	var child = document.querySelector('.store-detail').firstElementChild;
	// 	return child.textContent;
	// })
	


