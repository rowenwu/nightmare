var fs = require('fs');

function WriteFile(str)
{
	fs.writeFile("crawl_out.txt", str, 'utf8', function(err) {
	    if(err) return console.log(err);
	    console.log("Asynchronous write: " + data.toString());
	}); 
}

var Nightmare = require('nightmare'), 
 	vo = require('vo'),      
	nightmare = Nightmare({ show: true });

var run = function*() {
	var result = yield nightmare
	  .goto('https://www.thecrossroadsmall.com/en/directory/map.html')
	  .wait('.Units')
	  .evaluate(function () {
	       // var parent = document.querySelector('.Units-Layer');
	       var children = document.getElementsByClassName("Units");
	       var selectors = new Array();
	       for(var i = 0; i < children.length; i++){
	       		var dataunit = children[i].getAttribute("data-unit");
	       		selectors.push('[data-unit="' + dataunit + '"]')
	       }	
	       return selectors;
	  })
	  .catch(function (error) {
	    console.error('failed:', error);
	  });

	var stores;
	yield function() {
		for(var i = 0; i < result.length; i++){
			var name = nightmare
			.click(result[i])
			.wait('.pop-up-window-container')
			.evaluate(function(){
	   			return document.querySelector('.store-detail').firstChild.textContent;
	   		});

	   		stores.push(name);
		}
	}
	
	yield nightmare.end();
	return stores;
}

vo(run)(function(err, result) {
  if (err) throw err

  results.forEach(function (text) {
    console.log(text)
  })
})





