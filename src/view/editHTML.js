var activateFunctions = globalVars.activate(globalVars.details);
var reverseFunctions = globalVars.reverse(globalVars.details);

for (var tNum in globalVars.details.textSections) { 
  sections.innerHTML += "<section class='step'>" + globalVars.details.textSections[tNum] + "</section>"; 
}

scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions)

globalVars.addText = function(md) {
  document.getElementById('text').style.display = 'block';
  document.getElementById('img').style.display = 'none';
  document.getElementById('hg').style.display = 'none';
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'none';
  text.innerHTML = "<div class='mainText'>" + md + "</div>";
}

globalVars.addImg = function(arr) {
  document.getElementById('text').style.display = 'none';
  document.getElementById('img').style.display = 'block';
  document.getElementById('hg').style.display = 'none';
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'none';
  img.innerHTML = "<img class='mainImg' src=\"" + arr[0] + "\">" + "<div class='caption'>" + arr[1] + "</div>";
}

globalVars.addYt = function(arr) {
  document.getElementById('text').style.display = 'none';
  document.getElementById('img').style.display = 'none';
  document.getElementById('hg').style.display = 'none';
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'block';
  var url = 'https://www.youtube.com/embed/' + arr[0];
  $('#yt').attr('src',url);
  ytCaption.innerHTML = arr[1];
}

globalVars.addVid = function(arr) {
  document.getElementById('text').style.display = 'none';
  document.getElementById('img').style.display = 'none';
  document.getElementById('hg').style.display = 'none';
  document.getElementById('vidMedia').style.display = 'block';
  document.getElementById('ytMedia').style.display = 'none';
  $('#vid').attr('src',arr[0]);
  vidCaption.innerHTML = arr[1];
}

globalVars.addHg = function() {
  document.getElementById('text').style.display = 'none';
  document.getElementById('img').style.display = 'none';
  document.getElementById('hg').style.display = 'inline-block';
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'none';
}