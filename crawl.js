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
    .wait('.Units')
    .click('.Units')
    .wait('.pop-up-window-container')
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
 //    .then(function(result){
	//   	result.reduce(function(accumulator, selector) {
	// 	    return nightmare
	// 	        .wait(selector)
	// 	        .click(selector)
	//			
	// 	        .evaluate(function(){
	// 				WriteFile(document.querySelector('.store-detail').firstChild.textContent);
	// 			})
	// 	});
	// })
    // .then(function(){
    // 	return nightmare.end();
    // })
    .end()
    .then(function(result) {
    	for(var i = 0; i < result.length; i++){
    		WriteFile(result[i] +'\n');
    		console.log(result[i]);
    	}
    	wstream.end();
    })
    .catch(function (error) {
    	console.error('failed:', error);
    });



