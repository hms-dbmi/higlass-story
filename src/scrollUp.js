globalVars.reverse = function(json) { 
  var reloadInd = [];
	var zoomInd = [];
	var zoomReloadInd = [];
	var reverseFunctions = [];
  var mediaArr = [];

  for(var i=0; i<json.mediaSections.length; i++) {
    if(json.mediaSections[i].activate !== "none") {
      mediaArr.push(json.mediaSections[i]);
    }
  }

  var isEmpty = function(func) {
    var empty = function() {};
    return func.toString()===empty.toString();
  }
  
	for(var i=0; i<json.textSections.length; i++) { // ensure every section has a corresponding function within reverseFunctions
		reverseFunctions.push( function() {});
  }

  for(var i=0; i<mediaArr.length; i++) { // assign default function to every type of media
    var thisMedia = mediaArr[i];
    if(thisMedia.activate === "img") {
      let imgParams = thisMedia.activateParams;
      reverseFunctions[thisMedia.startPos] = function() {
        globalVars.addImg(imgParams);
      };
    } else if (thisMedia.activate === "vid") {
      let vidParams = thisMedia.activateParams;
      reverseFunctions[thisMedia.startPos] = function() {
        globalVars.addVid(vidParams);
      };
    } else if (thisMedia.activate === "fig") {
      let figParams = thisMedia.activateParams;
      reverseFunctions[thisMedia.startPos] = function() {
        globalVars.addFig(figParams[0], figParams[1]);
      };
    } else {
      reverseFunctions[thisMedia.startPos] = function() {
        globalVars.addHg();
      };
    }
  }

  for(var i=0; i<mediaArr.length; i++) { // assign img, hg, fig, or vid loading function to section before next media
    var thisMedia = mediaArr[i];
    if(thisMedia.activate === "img") {
      for(var j=thisMedia.startPos+1; j<json.textSections.length; j++) {
        if(!isEmpty(reverseFunctions[j])) {
          let imgParams = thisMedia.activateParams;
          reverseFunctions[j-1] = function() {
            globalVars.addImg(imgParams);
          }
          break;
        }
      }
    } else if(thisMedia.activate === "vid") {
      for(var j=thisMedia.startPos+1; j<json.textSections.length; j++) {
        if(!isEmpty(reverseFunctions[j])) {
          let vidParams = thisMedia.activateParams;
          reverseFunctions[j-1] = function() {
            globalVars.addVid(vidParams);
          }
          break;
        }
      }
    } else if(thisMedia.activate === "fig") {
      for(var j=thisMedia.startPos+1; j<json.textSections.length; j++) {
        if(!isEmpty(reverseFunctions[j])) {
          let figParams = thisMedia.activateParams;
          reverseFunctions[j-1] = function() {
            globalVars.addFig(figParams[0], figParams[1]);
          }
          break;
        }
      }
    } else {
      for(var j=thisMedia.startPos+1; j<json.textSections.length; j++) {
        if(!isEmpty(reverseFunctions[j])) {
          reverseFunctions[j-1] = function() {
            globalVars.addHg();
          }
          break;
        }
      }
    }
  }
  
  for(var i=0; i<mediaArr.length; i++) {    
		if(mediaArr[i].activate === "reload") {
			reloadInd.push(i);
		}
		// ZOOM
		if(mediaArr[i].activate === "zoom") { // find index of every zoom that is not preceded by another zoom before it is preceded by a reload
			for(var j=i+1; j<mediaArr.length; j++) { // for every zoom, zoom at that spot or last "none" if there are any 
				if(mediaArr[j].activate == "zoom" || mediaArr[j].activate == "reload" || mediaArr[j].activate == "img" || mediaArr[j].activate == "vid" || mediaArr[j].activate == "fig") { 
					let zoomParams = mediaArr[i].activateParams;
					reverseFunctions[mediaArr[j].startPos-1] = function() {
						globalVars.addHg();
						for(var k=0; k<Object.keys(zoomParams).length; k++) {
							globalVars.hgv.zoomTo(zoomParams[k][0], zoomParams[k][1], zoomParams[k][2], zoomParams[k][3], zoomParams[k][4], 0);
						}
					}
					break;
				}
			}
			for(var j=i-1; j>=0; j--) { // make note of indexes of all "zoom"s that are not preceded by another zoom before being preceded by a reload
				if(mediaArr[j].activate === "reload") {
					zoomInd.push(i)
					break;
				} else if (mediaArr[j].activate === "zoom") {
					break;
				}
			} 
		}
	}

  // RELOAD
  for(var i=0; i<reloadInd.length-1; i++) { // for every reload, previous hg step should contain reload of previous viewconf
		let loadUrl = mediaArr[reloadInd[i]].activateParams.url;
    for(var j=reloadInd[i+1]-1; j>=0; j--) { 
      if(mediaArr[j].activate === "reload" || mediaArr[j].activate === "zoom") {
        reverseFunctions[mediaArr[j+1].startPos-1] = function() {
        globalVars.addHg();
        globalVars.loadViewConf(loadUrl);
    }
        break;
      }
    }
	}
  
  // UNZOOM (load...zoom)
  for(var i=0; i<zoomInd.length; i++) { // for every zoom, previous hg step should contain zoom to coords of previous load unless there is another zoom in the way
		for(var j=reloadInd.length-1; j>=0; j--) {
			if(mediaArr[reloadInd[j]].startPos < mediaArr[zoomInd[i]].startPos) {
				let unZoomParams = mediaArr[reloadInd[j]].activateParams; 
				reverseFunctions[mediaArr[reloadInd[j]+1].startPos-1] = function() { // unzoom //// but none
					globalVars.addHg();
					for(var k=0; k<Object.keys(unZoomParams).length-1; k++) { // end set at length-1 bc activateParams.url increases length by 1
						globalVars.hgv.zoomTo(unZoomParams[k][0], unZoomParams[k][1], unZoomParams[k][2], unZoomParams[k][3], unZoomParams[k][4], 0);
					}
				}
				break;
			}
		}
	}
  
  // RELOAD AND ZOOM (zoom...load)
  for(var i=1; i<reloadInd.length; i++) { // find all zooms adjacent to reloads or with "none"s in between
    let loadZoomUrl = mediaArr[reloadInd[i-1]].activateParams.url;
    for(var j=reloadInd[i]-1; j>=0; j--) {
      if(mediaArr[j].activate === "zoom") {
        let loadZoomParams = mediaArr[j].activateParams; 
        reverseFunctions[mediaArr[reloadInd[i]-1].startPos-1] = function() { //// BUG: load overrides zoom
        	globalVars.addHg();
          globalVars.loadViewConfAndZoom(loadZoomUrl, loadZoomParams);
        }
        break;
      } else if (mediaArr[j].activate === "reload") {
        break;
      }
    }
  }
  return reverseFunctions;
}