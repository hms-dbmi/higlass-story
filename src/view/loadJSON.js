import { activate } from '../scrollDown.js';
import { reverse } from '../scrollUp.js';
import { setCSS } from './editCSS.js';
import { loadHg } from '../loadHg.js';
import { scrollerDisplay } from '../../third_party/scrollerDisplay.js'

export var details = null;

$(document).ready(function (){ 

  $("#inputJSON").click(function(){
    $("#jsonModal").modal();
  });

  var openFile = function(event) {
    var input = document.getElementById("userFile");

    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;
      loadJSON(text);
      return text;
    };
    reader.readAsText(input.files[0]);
  };

  document.getElementById('submitJSON').addEventListener('click', openFile, false);

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

});