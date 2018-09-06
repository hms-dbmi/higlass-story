import { hgv, loadViewConf } from './loadHg.js'
import { addText, addImg, addYt, addVid, addHg } from './shiftFocus.js';

/**
* Based on the order of elements added to the report, create an array of functions to change
* the report depending on which section the user is at when scrolling down
* @param {Object} json - metadata of report 
* @return {Function[]} Array of functions to be triggered as the user scrolls down
*/
export function activate(json) { 
  var activateFunctions = [];

  for (var i=0; i<json.textSections.length; i++) {
    activateFunctions.push( function() {});
  }

  for (var mNum in json.mediaSections) {
    const media = json.mediaSections[mNum];
    const mediaParams = media.activateParams;
    switch (media.activate) {
      case "reload":
        activateFunctions[media.startPos] = function () {
          addHg();
          loadViewConf(mediaParams.url);
        }
        break;
      case "zoom":
        activateFunctions[media.startPos] = function () {
          addHg();
          for(var i=0; i<Object.keys(mediaParams.zoom).length; i++) {
            hgv.zoomTo(mediaParams.zoom[i][0], mediaParams.zoom[i][1], mediaParams.zoom[i][2], mediaParams.zoom[i][3], mediaParams.zoom[i][4], 0);
          }
        }      
        break;
      case "none":
        activateFunctions[media.startPos] = function () {
          addHg();
        }  
        break;   
      case "img":
        activateFunctions[media.startPos] = function () { addImg(mediaParams) };
        break;
      case "vid":
        activateFunctions[media.startPos] = function () { addVid(mediaParams) };
        break;
      case "yt":
        activateFunctions[media.startPos] = function () { addYt(mediaParams) };
        break;
      case "text":
        activateFunctions[media.startPos] = function () { addText(mediaParams) };
        break;
      default: 
        break;
    } 
  }
  return activateFunctions;
}