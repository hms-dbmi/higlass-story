import { loadViewConf } from './loadHg.js';
import { addText, addImg, addYt, addVid, addHg } from './shiftFocus.js';

export function reverse(json) { 
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
        addImg(imgParams);
      };
    } else if (thisMedia.activate === "vid") {
      let vidParams = thisMedia.activateParams;
      reverseFunctions[thisMedia.startPos] = function() {
        addVid(vidParams);
      };
    } else if (thisMedia.activate === "yt") {
      let ytParams = thisMedia.activateParams;
      reverseFunctions[thisMedia.startPos] = function() {
        addYt(ytParams);
      };
    } else if (thisMedia.activate === "text") {
      let textParams = thisMedia.activateParams;
      reverseFunctions[thisMedia.startPos] = function() {
        addText(textParams);
      };
    } else {
      reverseFunctions[thisMedia.startPos] = function() {
        addHg();
      };
    }
  }

  for(var i=0; i<mediaArr.length; i++) { // assign img, hg, text, yt, or vid loading function to section before next media
    var thisMedia = mediaArr[i];
    if(thisMedia.activate === "img") {
      for(var j=thisMedia.startPos+1; j<json.textSections.length; j++) {
        if(!isEmpty(reverseFunctions[j])) {
          let imgParams = thisMedia.activateParams;
          reverseFunctions[j-1] = function() {
            addImg(imgParams);
          }
          break;
        }
      }
    } else if(thisMedia.activate === "vid") {
      for(var j=thisMedia.startPos+1; j<json.textSections.length; j++) {
        if(!isEmpty(reverseFunctions[j])) {
          let vidParams = thisMedia.activateParams;
          reverseFunctions[j-1] = function() {
            addVid(vidParams);
          }
          break;
        }
      }
    } else if(thisMedia.activate === "yt") {
      for(var j=thisMedia.startPos+1; j<json.textSections.length; j++) {
        if(!isEmpty(reverseFunctions[j])) {
          let ytParams = thisMedia.activateParams;
          reverseFunctions[j-1] = function() {
            addYt(ytParams);
          }
          break;
        }
      }
    } else if(thisMedia.activate === "text") {
      for(var j=thisMedia.startPos+1; j<json.textSections.length; j++) {
        if(!isEmpty(reverseFunctions[j])) {
          let textParams = thisMedia.activateParams;
          reverseFunctions[j-1] = function() {
            addText(textParams);
          }
          break;
        }
      }
    } else {
      for(var j=thisMedia.startPos+1; j<json.textSections.length; j++) {
        if(!isEmpty(reverseFunctions[j])) {
          reverseFunctions[j-1] = function() {
            addHg();
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
				if(mediaArr[j].activate == "zoom" || mediaArr[j].activate == "reload" || mediaArr[j].activate == "img" || mediaArr[j].activate == "vid" || mediaArr[j].activate == "yt" || mediaArr[j].activate == "text") { 
					let zoomParams = mediaArr[i].activateParams.zoom;
					reverseFunctions[mediaArr[j].startPos-1] = function() {
						addHg();
						for(var k=0; k<Object.keys(zoomParams).length; k++) {
							hgv.zoomTo(zoomParams[k][0], zoomParams[k][1], zoomParams[k][2], zoomParams[k][3], zoomParams[k][4], 0);
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
          addHg();
          loadViewConf(loadUrl);
        }
        break;
      }
    }
	}
  
  // UNZOOM (load...zoom)
  for(var i=0; i<zoomInd.length; i++) { // for every zoom, previous hg step should contain zoom to coords of previous load unless there is another zoom in the way
		for(var j=reloadInd.length-1; j>=0; j--) {
			if(mediaArr[reloadInd[j]].startPos < mediaArr[zoomInd[i]].startPos) {
				let unZoomParams = mediaArr[reloadInd[j]].activateParams.zoom; 
				reverseFunctions[mediaArr[reloadInd[j]+1].startPos-1] = function() { // unzoom 
					addHg();
					for(var k=0; k<Object.keys(unZoomParams).length; k++) { 
						hgv.zoomTo(unZoomParams[k][0], unZoomParams[k][1], unZoomParams[k][2], unZoomParams[k][3], unZoomParams[k][4], 0);
					}
				}
				break;
			}
		}
	}
  
  // RELOAD AND ZOOM (zoom...load)
  for(var i=1; i<reloadInd.length; i++) { // find all zooms adjacent to reloads or with "none"s in between
    for(var j=reloadInd[i]-1; j>=0; j--) {
      if(mediaArr[j].activate === "zoom") {
        let loadZoomUrl = mediaArr[j].activateParams.url; 
        reverseFunctions[mediaArr[j+1].startPos-1] = function() { //// BUG: load overrides zoom
        	addHg(); 
          loadViewConf(loadZoomUrl);
        }
        break;
      } else if (mediaArr[j].activate === "reload") {
        break;
      }
    }
  }

  return reverseFunctions;
}