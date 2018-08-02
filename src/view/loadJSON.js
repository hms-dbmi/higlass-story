globalVars.loadJSON = function(json) {
  var activateFunctions = globalVars.activate(json);
  var reverseFunctions = globalVars.reverse(json);

  for (var tNum in json.textSections) { 
    sections.innerHTML += "<section class='step'>" + json.textSections[tNum] + "</section>"; 
  }

  scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions)
}