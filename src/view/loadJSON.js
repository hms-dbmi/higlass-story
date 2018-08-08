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
    };
    reader.readAsText(input.files[0]);
  };

  document.getElementById('submitJSON').addEventListener('click', openFile, false);

  loadJSON = function(json) { 
    sections.innerHTML = "";
    json = JSON.parse(json);
    globalVars.details = json;
    globalVars.loadHg(json.initialHg);
    var activateFunctions = globalVars.activate(json);
    var reverseFunctions = globalVars.reverse(json);
    for (var tNum in json.textSections) { 
      sections.innerHTML += "<section class='step'>" + json.textSections[tNum] + "</section>"; 
    }
    scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions);
    document.getElementById('inputJSON').style.display = 'none';
    globalVars.setCSS();
  }

});