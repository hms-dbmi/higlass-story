$(document).ready(function (){ 

	$("#scrollingText").on('click', '#submitText', function() {
	  $( "#exampleTextArea" ).submit();
	});

	$("#scrollingText").on('submit', '#exampleTextArea', function( event ) {
	  sections.innerHTML += "<section class='step'>" + mmd(exampleTextArea.value) + "</section>"; 

	  globalVars.hgv.shareViewConfigAsLink("http://higlass.io/api/v1/viewconfs")
			.then((sharedViewConfig) => {
				globalVars.viewConfUrls.push("http://higlass.io/api/v1/viewconfs/?d=" + sharedViewConfig.id);
				if(typeof globalVars.prevViewConf !== 'undefined') {

			  	var trans = globalVars.typeOfChange(globalVars.prevViewConf, globalVars.hgv.exportAsViewConfString(), globalVars.viewConfUrls.slice(-1)[0]);
			  	console.log(trans)
					var obj = {
						"text": mmd(exampleTextArea.value),
						"activate": trans[0],
						"activateParams": trans[1],
					}
					globalVars.json.sections.push(obj);
					switch(trans[0]) {
						case "reload":
							var loadParams = trans[1];
							globalVars.activateFunctions.push( function() {
								globalVars.loadHg(loadParams);
							});
							break;
						case "zoom":
							var zoomParams = trans[1];
							globalVars.activateFunctions.push( function() {
								for(var i=0; i<Object.keys(zoomParams).length; i++) {
									globalVars.hgv.zoomTo(zoomParams[i][0], zoomParams[i][1], zoomParams[i][2], zoomParams[i][3], zoomParams[i][4], 300);
								}
							});
							break;
						default:
							globalVars.activateFunctions.push( function() {});
					}
		  	} else {
		  		globalVars.json.initialHg = globalVars.viewConfUrls[0];
		  		globalVars.activateFunctions.push( function() {});
		  		globalVars.json.sections.push({"text": mmd(exampleTextArea.value), "activate": "none", "activateParams": {}});
		  	}
		  	console.log(globalVars.activateFunctions)
		  	scrollerDisplay(d3.select('#graphic'), 'step', globalVars.activateFunctions)
		  	document.getElementById('exampleTextArea').value = "";
		  	globalVars.prevViewConf = globalVars.hgv.exportAsViewConfString();

				var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
				var a = document.createElement('a');
				a.href = 'data:' + data;
				a.download = 'data.json';
				a.innerHTML = 'Download JSON';
				var container = document.getElementById('graphic');
				container.appendChild(a);
			})
				.catch((err) => { console.error('Something did not work. Sorry', err); });

	  event.preventDefault();
	});

});