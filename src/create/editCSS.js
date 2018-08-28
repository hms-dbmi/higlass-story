import { json } from './jsonModal.js';

export function cssEngine(rule) {
  var css = document.createElement('style'); // Creates <style></style>
  css.className = 'customCSS';
  css.type = 'text/css'; // Specifies the type
  if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
  else css.appendChild(document.createTextNode(rule)); // Support for the rest
  document.getElementsByTagName("head")[0].appendChild(css); // Specifies where to place the css
}

export function openCSSModal() {
  $("#editCSS").click(function(){
    $("#cssModal").modal();
  });
}

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
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
    a.href = 'data:' + data;
    a.download = 'data.json';
    a.innerHTML = 'Download JSON';
  });
}

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

  $(".modal-body").on('submit', '#selFont', function( event ) {
    $("<style/>", {text: ".inlineText {font-family: " + selFont.value + ";}"}).appendTo('head');
  	json.fontFamily = selFont.value;
  	event.preventDefault();
  });

  $(".modal-body").on('submit', '#selFontColor', function( event ) {
  	$("<style/>", {text: ".inlineText {color: " + selFontColor.value + ";}"}).appendTo('head');
  	json.fontColor = selFontColor.value;
  	event.preventDefault();
  });

  $(".modal-body").on('submit', '#selFontSize', function( event ) {
  	$("<style/>", {text: ".inlineText {font-size: " + selFontSize.value/16 + "rem;}"}).appendTo('head');
  	json.fontSize = selFontSize.value;
  	event.preventDefault();
  });

  $(".modal-body").on('submit', '#selBgColor', function( event ) {
  	document.body.style.backgroundColor = selBgColor.value;
  	json.bgColor = selBgColor.value;
  	event.preventDefault();
  });

  $(".modal-body").on('submit', '#cssText', function( event ) {
    cssEngine(cssText.value);
    json.css = document.getElementById('cssText').value;
    document.getElementById('cssText').value = '';
    event.preventDefault();
  });
}