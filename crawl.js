var fs = require('fs');
var wstream = fs.createWriteStream('crawl_out.txt');

function WriteFile(str)
{
	// fs.writeFile("crawl_out.txt", str, 'utf8', function(err) {
	//     if(err) return console.log(err);
	// }); 
	wstream.write(str);
}

var Nightmare = require('nightmare'), 
	nightmare = Nightmare({ show: true });


var dataUnits = nightmare
    .goto('https://www.thecrossroadsmall.com/en/directory/map.html')
    .wait('[data-unit="18633"]')
    .click('[data-unit="18633"]')
    .wait('.pop-up-window-container')
    .evaluate(function () {
       // var parent = document.querySelector('.Units-Layer');
       var children = document.getElementsByClassName("Units");
       var selectors = new Array();
       for(var i = 0; i < children.length; i++){
       		var dataunit = children[i].getAttribute("data-unit");
       		if(dataunit != null)
       			selectors.push('[data-unit="' + dataunit + '"]')
       }	
       return selectors;
    })
    .then(function(result){
		return result.reduce(function (accumulator, selector) {
	  		return accumulator.then(function(stores){
			    return nightmare
			        .wait(selector)
			        .click(selector)
					.wait('.pop-up-window-container')
					.wait(1000)
			        .evaluate(function(){
						return document.querySelector('.store-detail').firstChild.textContent + "\n";
					})
					.then(function(store){
						stores.push(store);
						return stores;
					});
			});
		}, Promise.resolve([]));
	})
    // .end()
    // .then(function(result) {
    // 	for(var i = 0; i < result.length; i++){
    // 		WriteFile(result[i] +'\n');
    // 		console.log(result[i]);
    // 	}
    // 	wstream.end();
    // })
    .then(function(results){
    	
    	for(i = 0; i < results.length; i++)
    		WriteFile(results[i]);
    	wstream.end();
    	return nightmare.end();
    })
    .then(function() {
    	console.log('done');
  	})
    .catch(function (error) {
    	console.error('failed:', error);
    });



