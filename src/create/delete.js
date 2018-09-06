import { download } from './editHTML.js';
import { json } from './jsonModal.js';
import { reverse } from '../scrollUp.js';
import { activate } from '../scrollDown.js';
import { scrollerDisplay } from '../../third_party/scrollerDisplay.js'

/**
 * When the X icon in the section is clicked, delete that section
 * from the page and the JSON object and re-calculate scrolling
 * actions
 */
export function deleteSections() {
  $(document).on("click", ".fa-clickable", function() { 
    var num = $(this).parent().parent().index();
    sections.removeChild(sections.children[num]);
    json.textSections.splice(num, 1);
    for(var i=0; i<json.mediaSections.length; i++) {
      if(json.mediaSections[i].startPos === num) {
        json.mediaSections.splice(num, 1);
        if(i < json.mediaSections.length) {
          for(var j=i; j<json.mediaSections.length; j++) { // change media.startPos to reflect new section nums
            json.mediaSections[j].startPos = json.mediaSections[j].startPos - 1;
          }
        }
      }
    } 
    var activateFunctions = activate(json);
    var reverseFunctions = reverse(json);
    download(json);
    scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); 
  });
}