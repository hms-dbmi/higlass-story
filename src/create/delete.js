// DELETE
$(document).on("click", ".fa-clickable", function() { 
  var num = $(this).parent().parent().index();
  sections.removeChild(sections.children[num]);
  globalVars.json.textSections.splice(num, 1);
  for(var i=0; i<globalVars.json.mediaSections.length; i++) {
    if(globalVars.json.mediaSections[i].startPos === num) {
      globalVars.json.mediaSections.splice(num, 1);
      if(i < globalVars.json.mediaSections.length) {
        for(var j=i; j<globalVars.json.mediaSections.length; j++) { // change media.startPos to reflect new section nums
          globalVars.json.mediaSections[j].startPos = globalVars.json.mediaSections[j].startPos - 1;
        }
      }
    }
  } 
  activateFunctions = globalVars.activate(globalVars.json);
  reverseFunctions = globalVars.reverse(globalVars.json);
  console.log(activateFunctions)
  console.log(reverseFunctions)
  globalVars.download(globalVars.json);
  scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); 
});