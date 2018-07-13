$(document).ready(function (){ 

	var a = document.createElement('a');
	a.id = "downloadLink";
	var container = document.getElementById('scrollingText');
	container.appendChild(a);

	var activateFunctions = [];

	$("#scrollingText").on('click', '#submitText', function() {
	  $( "#sectionText" ).submit();
	});

	$("#scrollingText").on('submit', '#sectionText', function( event ) {
	  sections.innerHTML += "<section class='step'>" + mmd(sectionText.value) + "</section>"; 
	  globalVars.json.textSections.push(mmd(sectionText.value));
	  if($('#selDisplay').val()==='hg' || $('#selDisplay').val()==='choose') {
		  globalVars.hgv.shareViewConfigAsLink("http://higlass.io/api/v1/viewconfs")
				.then((sharedViewConfig) => {
					globalVars.viewConfUrls.push("http://higlass.io/api/v1/viewconfs/?d=" + sharedViewConfig.id);
					if(typeof globalVars.prevViewConf !== 'undefined') {
				  	var trans = globalVars.typeOfChange(globalVars.prevViewConf, globalVars.hgv.exportAsViewConfString(), globalVars.viewConfUrls.slice(-1)[0]);
						var hgObj = {
							"activate": trans[0],
							"activateParams": trans[1],
						};
						globalVars.json.mediaSections.push(hgObj);
						switch(trans[0]) {
							case "reload":
								var loadParams = trans[1].url;
								activateFunctions.push( function() {
									globalVars.selHg();
									globalVars.loadViewConf(loadParams);
								});
								break;
							case "zoom":
								var zoomParams = trans[1];
								activateFunctions.push( function() {
									globalVars.selHg();
									for(var i=0; i<Object.keys(zoomParams).length; i++) {
										globalVars.hgv.zoomTo(zoomParams[i][0], zoomParams[i][1], zoomParams[i][2], zoomParams[i][3], zoomParams[i][4], 0);
									}
								});
								break;
							default:
								activateFunctions.push( function() {
									globalVars.selHg();
								});
						}
			  	} else {
			  		var url = globalVars.viewConfUrls[0];
			  		var initialViewConf = JSON.parse(globalVars.hgv.exportAsViewConfString());
			  		activateFunctions.push( function() {
			  			globalVars.selHg();
			  			globalVars.loadViewConf(url);
			  		});
			  		var hgObj = {
			  			"activate": "reload",
			  			"activateParams": {}
			  		};
			  		hgObj.activateParams.url = url;
	          for(var i=0; i<initialViewConf.views.length; i++) {
		          hgObj.activateParams[i] = [initialViewConf.views[i].uid, initialViewConf.views[i].initialXDomain[0], initialViewConf.views[i].initialXDomain[1], 
		          initialViewConf.views[i].initialYDomain[0], initialViewConf.views[i].initialYDomain[1]];
		        }
			  		globalVars.json.mediaSections.push(hgObj);
			  	}
			  	globalVars.prevViewConf = globalVars.hgv.exportAsViewConfString();
			  	var reverseFunctions = globalVars.reverse(globalVars.json);
			  	scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions)

			  	var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
					a.href = 'data:' + data;
					a.download = 'data.json';
					a.innerHTML = 'Download JSON';
				})
					.catch((err) => { console.error('Something did not work. Sorry', err); });

			} else if($('#selDisplay').val()==='img') {
				let currentImage = globalVars.img;
				activateFunctions.push( function() {
					img.innerHTML = "<img src=\"" + currentImage + "\">";
					globalVars.selImg();
				});
				var imgObj = {
					"activate": "img",
					"activateParams": currentImage
				};
				globalVars.json.mediaSections.push(imgObj);
				var reverseFunctions = globalVars.reverse(globalVars.json);
				scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions)
		  	var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
				a.href = 'data:' + data;
				a.download = 'data.json';
				a.innerHTML = 'Download JSON';

			} else {
				let currentVid = globalVars.vid;
				activateFunctions.push( function() {
					$('#vid').attr('src',currentVid);
					globalVars.selVid();
				});
				var vidObj = {
					"activate": "vid",
					"activateParams": currentVid
				};
				globalVars.json.mediaSections.push(vidObj);
				var reverseFunctions = globalVars.reverse(globalVars.json);
				scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions)
				var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
				a.href = 'data:' + data;
				a.download = 'data.json';
				a.innerHTML = 'Download JSON';
			}
		document.getElementById('sectionText').value = "";
	  event.preventDefault();
	});

});