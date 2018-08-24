import { activate } from '../scrollDown.js';
import { reverse } from '../scrollUp.js';
import { loadHg } from '../loadHg.js';
import { scrollerDisplay } from '../../third_party/scrollerDisplay.js'

var details = null;

export function openFile(event) {
  console.log("hi")
  var input = document.getElementById("userFile");

  var reader = new FileReader();
  reader.onload = function(){
    var text = reader.result;
    loadJSON(text);
    return text;
  };
  reader.readAsText(input.files[0]);
};

var loadJSON = function(json) { 
  sections.innerHTML = "";
  var json = JSON.parse(json);
  details = json;
  loadHg(json.initialHg);
  var activateFunctions = activate(json);
  var reverseFunctions = reverse(json);
  for (var tNum in json.textSections) { 
    sections.innerHTML += "<section class='step'>" + json.textSections[tNum] + "</section>"; 
  }
  scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions);
  document.getElementById('inputJSON').style.display = 'none';
  setCSS();
}

function cssEngine(rule) {
  var css = document.createElement('style'); // Creates <style></style>
  css.className = 'customCSS';
  css.type = 'text/css'; // Specifies the type
  if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
  else css.appendChild(document.createTextNode(rule)); // Support for the rest
  document.getElementsByTagName("head")[0].appendChild(css); // Specifies where to place the css
}

function setCSS() {
  document.getElementById('scrollingText').style.fontFamily = details.fontFamily;
  document.getElementById('scrollingText').style.color = details.fontColor;
  document.getElementById('scrollingText').style.fontSize = details.fontSize/16 + "rem";
  document.body.style.background = details.bgColor;
  cssEngine(details.css);
}