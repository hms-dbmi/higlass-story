import { activate } from '../scrollDown.js';
import { reverse } from '../scrollUp.js';
import { loadHg } from '../loadHg.js';
import { scrollerDisplay } from '../../third_party/scrollerDisplay.js';
import details from './data.json';

$(document).ready(function (){ 
  loadJSON(details);
});

/**
* Populate report using JSON file
*
* @param   {Object} obj - content of JSON file
*/
var loadJSON = function(json) { 
  sections.innerHTML = "";
  loadHg(json.initialHg);
  var activateFunctions = activate(json);
  var reverseFunctions = reverse(json);
  for (var tNum in json.textSections) { 
    sections.innerHTML += "<section class='step'>" + json.textSections[tNum] + "</section>"; 
  }
  scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions);
  setCSS();
}

/**
* Append CSS style rules to the head of the document so 
* that they are loaded last
* 
* @param   {String} rule - CSS rules from JSON file
*/
function cssEngine(rule) {
  var css = document.createElement('style'); // Creates <style></style>
  css.className = 'customCSS';
  css.type = 'text/css'; // Specifies the type
  if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
  else css.appendChild(document.createTextNode(rule)); // Support for the rest
  document.getElementsByTagName("head")[0].appendChild(css); // Specifies where to place the css
}

/**
* Change the look of the report using the attributes in the JSON file
*
* @param   {Object} json - content of JSON file
*/
function setCSS() {
  document.getElementById('scrollingText').style.fontFamily = details.fontFamily;
  document.getElementById('scrollingText').style.color = details.fontColor;
  document.getElementById('scrollingText').style.fontSize = details.fontSize/16 + "rem";
  document.body.style.background = details.bgColor;
  cssEngine(details.css);
}