import { json } from './jsonModal.js';
import { download } from './editHTML.js'

/**
* Append CSS style rules to the head of the document so 
* that they are loaded last
* 
* @param   {String} rule - CSS entered by the user as text
*/
export function cssEngine(rule) {
  var css = document.createElement('style'); // Creates <style></style>
  css.className = 'customCSS';
  css.type = 'text/css'; // Specifies the type
  if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
  else css.appendChild(document.createTextNode(rule)); // Support for the rest
  document.getElementsByTagName("head")[0].appendChild(css); // Specifies where to place the css
}

/**
* When "Edit CSS" button is clicked, open corresponding modal
*/
export function openCSSModal() {
  $("#editCSS").click(function(){
    $("#cssModal").modal();
  });
}

/**
* When "Reset CSS" button is clicked, reset all styles back
* to default in the page and the JSON object, and reset inputs
* in modal back to default values
*/
export function removeCSS() {
  $(".modal-footer").on('click', '#removeCSS', function() {
    json.fontFamily = "Helvetica Neue";
    json.fontColor = "black";
    json.fontSize = 22;
    json.bgColor = "#f9f9f9";
    json.css = '';
    $("<style/>", {text: ".inlineText {font-family: 'Helvetica Neue';}"}).appendTo('head');
    $("<style/>", {text: ".inlineText {color: 'black';}"}).appendTo('head');
    $("<style/>", {text: ".inlineText {font-size: " + 22/16 + "rem;}"}).appendTo('head');
    document.body.style.backgroundColor = "#f9f9f9";
    $('.customCSS').remove();
    $("#selFont").val("").change();
    $("#selFontColor").val("").change();
    document.getElementById('selFontSize').value = 22;
    $("#selBgColor").val("").change();
    document.getElementById('cssText').value = '';
    var a = document.getElementById("downloadLink");
    download(json);
  });
}

/**
When "Submit CSS" button is clicked, submit all inputs to 
call their respective functions to add styles
*/
export function editCSS() {
  $(".modal-footer").on('click', '#submitCSS', function() {
    $( "#selFont" ).submit();
    $( "#selFontColor" ).submit();
    $( "#selFontSize" ).submit();
    $( "#selBgColor" ).submit();
    $( "#cssText" ).submit();
    var a = document.getElementById("downloadLink");
  	var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
  	a.href = 'data:' + data;
  	a.download = 'data.json';
  	a.innerHTML = 'Download JSON';
  });

  /**
  * Append style to head to change font; update JSOn object 
  */
  $(".modal-body").on('submit', '#selFont', function( event ) {
    $("<style/>", {text: ".inlineText {font-family: " + selFont.value + ";}"}).appendTo('head');
  	json.fontFamily = selFont.value;
  	event.preventDefault();
  });

  /**
  * Append style to head to change font color; change JSOn object 
  */
  $(".modal-body").on('submit', '#selFontColor', function( event ) {
  	$("<style/>", {text: ".inlineText {color: " + selFontColor.value + ";}"}).appendTo('head');
  	json.fontColor = selFontColor.value;
  	event.preventDefault();
  });

  /**
  * Append style to head to change font size; change JSOn object 
  */
  $(".modal-body").on('submit', '#selFontSize', function( event ) {
  	$("<style/>", {text: ".inlineText {font-size: " + selFontSize.value/16 + "rem;}"}).appendTo('head');
  	json.fontSize = selFontSize.value;
  	event.preventDefault();
  });

  /**
  * Append style to head to change background color; change JSOn object 
  */
  $(".modal-body").on('submit', '#selBgColor', function( event ) {
  	document.body.style.backgroundColor = selBgColor.value;
  	json.bgColor = selBgColor.value;
  	event.preventDefault();
  });

  /**
  * Call cssEngine(rule) to add user's styles from text input
  * to the page, and update JSON object 
  */
  $(".modal-body").on('submit', '#cssText', function( event ) {
    cssEngine(cssText.value);
    json.css = document.getElementById('cssText').value;
    document.getElementById('cssText').value = '';
    event.preventDefault();
  });
}