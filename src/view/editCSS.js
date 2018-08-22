import { details } from './loadJSON.js';

function cssEngine(rule) {
  var css = document.createElement('style'); // Creates <style></style>
  css.className = 'customCSS';
  css.type = 'text/css'; // Specifies the type
  if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
  else css.appendChild(document.createTextNode(rule)); // Support for the rest
  document.getElementsByTagName("head")[0].appendChild(css); // Specifies where to place the css
}

export function setCSS() {
	document.getElementById('scrollingText').style.fontFamily = details.fontFamily;
	document.getElementById('scrollingText').style.color = details.fontColor;
	document.getElementById('scrollingText').style.fontSize = details.fontSize/16 + "rem";
	document.body.style.background = details.bgColor;
  cssEngine(details.css);
}

