globalVars.reverse = function(json) { 
  var reloadInd = [];
	var zoomInd = [];
	var zoomReloadInd = [];
	var reverseFunctions = [];
  
	for(var i=0; i<json.sections.length; i++) { // find index of every step that contains a reload
		reverseFunctions.push( function() {});
  }
  
  for(var i=0; i<json.sections.length; i++) {    
		if(json.sections[i].activate === "reload") {
			reloadInd.push(i)
		}
		// ZOOM
		if(json.sections[i].activate === "zoom") { // find index of every zoom that is not preceded by another zoom before it is preceded by a reload
			for(var j=i+1; j<json.sections.length; j++) { // for every zoom, zoom at that spot or last "none" if there are any 
				if(json.sections[j].activate !== "none") {
					let zoomParams = json.sections[i].activateParams;
					reverseFunctions[j-1] = function() {
						for(var k=0; k<Object.keys(zoomParams).length; k++) {
							globalVars.hgv.zoomTo(zoomParams[k][0], zoomParams[k][1], zoomParams[k][2], zoomParams[k][3], zoomParams[k][4], 300);
						}
					}
					break;
				}
			}
			for(var j=i-1; j>=0; j--) { // make note of indexes of all "zoom"s that are not preceded by another zoom before being preceded by a reload
				if(json.sections[j].activate === "reload") {
					zoomInd.push(i)
					break;
				} else if (json.sections[j].activate === "zoom") {
					break;
				}
			} 
		}
	}
  
  // RELOAD
  for(var i=0; i<reloadInd.length-1; i++) { // for every reload, previous step should contain reload of previous viewconf
		let loadUrl = json.sections[reloadInd[i]].activateParams.url;
    reverseFunctions[reloadInd[i+1]-1] = function() { 
      globalVars.loadViewConf(loadUrl);
    }
	}
  
  // UNZOOM 
  for(var i=0; i<zoomInd.length; i++) { // for every zoom, previous step should contain zoom to coords of previous load unless there is another zoom in the way
		for(var j=reloadInd.length-1; j>=0; j--) {
			if(reloadInd[j] < zoomInd[i]) {
				let unZoomParams = json.sections[reloadInd[j]].activateParams; 
				reverseFunctions[zoomInd[i]-1] = function() { // unzoom
					for(var k=0; k<Object.keys(unZoomParams).length-1; k++) { // end set at length-1 bc activateParams.url increases length by 1
						globalVars.hgv.zoomTo(unZoomParams[k][0], unZoomParams[k][1], unZoomParams[k][2], unZoomParams[k][3], unZoomParams[k][4], 300);
					}
				}
				break;
			}
		}
	}
  
  // RELOAD AND ZOOM
  for(var i=1; i<reloadInd.length; i++) { // find all zooms adjacent to reloads or with "none"s in between
    let loadZoomUrl = json.sections[reloadInd[i-1]].activateParams.url;
    for(var j=reloadInd[i]-1; j>=0; j--) {
      if(json.sections[j].activate === "zoom") {
        let loadZoomParams = json.sections[j].activateParams; 
        reverseFunctions[reloadInd[i]-1] = function() { //// BUG: load overrides zoom
          globalVars.loadViewConf(loadZoomUrl);
          for(var k=0; k<Object.keys(loadZoomParams).length; k++) {
						globalVars.hgv.zoomTo(loadZoomParams[k][0], loadZoomParams[k][1], loadZoomParams[k][2], loadZoomParams[k][3], loadZoomParams[k][4], 300);
					}
        }
        break;
      } else if (json.sections[j].activate === "reload") {
        break;
      }
    }
  }
  return reverseFunctions;
}