globalVars.reverse = function(json) { 
  var reloadInd = [];
	var zoomInd = [];
	var zoomReloadInd = [];
	var reverseFunctions = [];
  
	for(var i=0; i<json.mediaSections.length; i++) { // find index of every step that contains a reload
		if(json.mediaSections[i].activate === "img") {
			reverseFunctions.push( function() {
				globalVars.selImg();
			});
		} else if (json.mediaSections[i].activate === "vid") {
			reverseFunctions.push( function() {
				globalVars.selVid();
			});
		} else {
			reverseFunctions.push( function() {
				globalVars.selHg();
			});
		}
  }
  
  for(var i=0; i<json.mediaSections.length; i++) {    
		if(json.mediaSections[i].activate === "reload") {
			reloadInd.push(i)
		}
		// ZOOM
		if(json.mediaSections[i].activate === "zoom") { // find index of every zoom that is not preceded by another zoom before it is preceded by a reload
			for(var j=i+1; j<json.mediaSections.length; j++) { // for every zoom, zoom at that spot or last "none" if there are any 
				if(json.mediaSections[j].activate == "zoom" || json.mediaSections[j].activate == "reload") {
					let zoomParams = json.mediaSections[i].activateParams;
					reverseFunctions[j-1] = function() {
						globalVars.selHg();
						for(var k=0; k<Object.keys(zoomParams).length; k++) {
							globalVars.hgv.zoomTo(zoomParams[k][0], zoomParams[k][1], zoomParams[k][2], zoomParams[k][3], zoomParams[k][4], 0);
						}
					}
					break;
				}
			}
			for(var j=i-1; j>=0; j--) { // make note of indexes of all "zoom"s that are not preceded by another zoom before being preceded by a reload
				if(json.mediaSections[j].activate === "reload") {
					zoomInd.push(i)
					break;
				} else if (json.mediaSections[j].activate === "zoom") {
					break;
				}
			} 
		}
	}
  
  // RELOAD
  for(var i=0; i<reloadInd.length-1; i++) { // for every reload, previous step should contain reload of previous viewconf
		let loadUrl = json.mediaSections[reloadInd[i]].activateParams.url;
    reverseFunctions[reloadInd[i+1]-1] = function() { 
    	globalVars.selHg();
      globalVars.loadViewConf(loadUrl);
    }
	}
  
  // UNZOOM 
  for(var i=0; i<zoomInd.length; i++) { // for every zoom, previous step should contain zoom to coords of previous load unless there is another zoom in the way
		for(var j=reloadInd.length-1; j>=0; j--) {
			if(reloadInd[j] < zoomInd[i]) {
				let unZoomParams = json.mediaSections[reloadInd[j]].activateParams; 
				reverseFunctions[zoomInd[i]-1] = function() { // unzoom
					globalVars.selHg();
					for(var k=0; k<Object.keys(unZoomParams).length-1; k++) { // end set at length-1 bc activateParams.url increases length by 1
						globalVars.hgv.zoomTo(unZoomParams[k][0], unZoomParams[k][1], unZoomParams[k][2], unZoomParams[k][3], unZoomParams[k][4], 0);
					}
				}
				break;
			}
		}
	}
  
  // RELOAD AND ZOOM
  for(var i=1; i<reloadInd.length; i++) { // find all zooms adjacent to reloads or with "none"s in between
    let loadZoomUrl = json.mediaSections[reloadInd[i-1]].activateParams.url;
    for(var j=reloadInd[i]-1; j>=0; j--) {
      if(json.mediaSections[j].activate === "zoom") {
        let loadZoomParams = json.mediaSections[j].activateParams; 
        reverseFunctions[reloadInd[i]-1] = function() { //// BUG: load overrides zoom
        	globalVars.selHg();
          globalVars.loadViewConfAndZoom(loadZoomUrl, loadZoomParams);
        }
        break;
      } else if (json.mediaSections[j].activate === "reload") {
        break;
      }
    }
  }
  return reverseFunctions;
}