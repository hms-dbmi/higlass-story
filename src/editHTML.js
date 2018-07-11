$(document).ready(function (){ 

	var a = document.createElement('a');
	a.id = "downloadLink";
	var container = document.getElementById('scrollingText');
	container.appendChild(a);

	activateFunctions = [];

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
					var obj = {
						"text": mmd(exampleTextArea.value),
						"activate": trans[0],
						"activateParams": trans[1],
					}
					globalVars.json.sections.push(obj);
					switch(trans[0]) {
						case "reload":
							var loadParams = trans[1].url;
							activateFunctions.push( function() {
								globalVars.loadViewConf(loadParams);
							});
							break;
						case "zoom":
							var zoomParams = trans[1];
							activateFunctions.push( function() {
								for(var i=0; i<Object.keys(zoomParams).length; i++) {
									globalVars.hgv.zoomTo(zoomParams[i][0], zoomParams[i][1], zoomParams[i][2], zoomParams[i][3], zoomParams[i][4], 300);
								}
							});
							break;
						default:
							activateFunctions.push( function() {});
					}
		  	} else {
		  		var url = globalVars.viewConfUrls[0];
		  		var initialViewConf = JSON.parse(globalVars.hgv.exportAsViewConfString());
		  		activateFunctions.push( function() {
		  			globalVars.loadViewConf(url);
		  		});
		  		var obj = {};
		  		obj.text = mmd(exampleTextArea.value);
		  		obj.activate = "reload";
		  		obj.activateParams = {};
		  		obj.activateParams.url = url;
          for(var i=0; i<initialViewConf.views.length; i++) {
	          obj.activateParams[i] = [initialViewConf.views[i].uid, initialViewConf.views[i].initialXDomain[0], initialViewConf.views[i].initialXDomain[1], 
	          initialViewConf.views[i].initialYDomain[0], initialViewConf.views[i].initialYDomain[1]];
	        }
		  		globalVars.json.sections.push(obj);
		  	}
		  	document.getElementById('exampleTextArea').value = "";
		  	globalVars.prevViewConf = globalVars.hgv.exportAsViewConfString();
		  	var reverseFunctions = globalVars.reverse(globalVars.json);
		  	scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions)

				var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
				a.href = 'data:' + data;
				a.download = 'data.json';
				a.innerHTML = 'Download JSON';
				
			})
				.catch((err) => { console.error('Something did not work. Sorry', err); });

	  event.preventDefault();
	});

});