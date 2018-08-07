$(document).ready(function (){ 

  $("#inputJSON").click(function(){
    $("#jsonModal").modal();
  });

  $(".modal-footer").on('click', '#submitJSON', function() {
    $("#jsonText").submit();
  });

  $(".modal-body").on('submit', '#jsonText', function() {
    loadJSON(jsonText.value);
  });

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
    document.getElementById('jsonText').value = '';
    document.getElementById('inputJSON').style.display = 'none';
  }

});

// globalVars.loadJSON = function(json) {
//   var activateFunctions = globalVars.activate(json);
//   var reverseFunctions = globalVars.reverse(json);

//   for (var tNum in json.textSections) { 
//     sections.innerHTML += "<section class='step'>" + json.textSections[tNum] + "</section>"; 
//   }

//   scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions)
// }