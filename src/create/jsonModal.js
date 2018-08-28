import { download } from './editHTML.js'
import { cssEngine } from './editCSS.js'
import { activate } from '../scrollDown.js'
import { reverse } from '../scrollUp.js'
import { scrollerDisplay } from '../../third_party/scrollerDisplay.js'

export var json = {
  fontFamily: "Helvetica Neue",
  fontColor: "black",
  fontSize: 22,
  bgColor: "#f9f9f9",
  css: "",
  initialHg: "",
  textSections: [],
  mediaSections: []
}

export function openJSONModal() {
  $("#inputJSON").click(function(){
    $("#jsonModal").modal();
  });
}

export function openFile (event) {
  var input = document.getElementById("userFile");

  var reader = new FileReader();
  reader.onload = function(){
    var text = reader.result;
    loadJSON(text);
  };
  reader.readAsText(input.files[0]);
};

var loadJSON = function(obj) { 
  sections.innerHTML = "";
  document.getElementById('placeholder').style.display = 'none';
  obj = JSON.parse(obj);
  json = obj;
  var activateFunctions = activate(json);
  var reverseFunctions = reverse(json);

  for (var i=0; i<json.textSections.length; i++) { 
    var str = "<li><section class=\"step\"><i class='fa fa-times fa-clickable' aria-hidden='true'></i><div id='editableSection'><div class='inlineText sectionContent'><h4>Section Content: </h4>" + 
      json.textSections[i] + "</div>";
    for (var j=0; j<json.mediaSections.length; j++) {
      if(json.mediaSections[j].startPos === i) {
        str += "<div class='sectionThumbnail'><h4>Main Content: <i class='fa fa-arrow-right' aria-hidden='true'></i></h4>";
        switch(json.mediaSections[j].activate) {
          case "text":
            str += "<img class='thumbnail' src=\"" + "https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Fast_text.png/330px-Fast_text.png" + "\">"; 
            break;
          case "vid":
            str += "<img class='thumbnail' src=\"" + "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Video_-_The_Noun_Project.svg/512px-Video_-_The_Noun_Project.svg.png" + "\">";
            break;
          case "yt":
            str += "<img class='thumbnail' src='https://img.youtube.com/vi/" + json.mediaSections[j].activateParams[0] + "/default.jpg'>"; 
            break;
          case "img":
            str += "<img class='thumbnail' src=\"" + json.mediaSections[j].activateParams[0] + "\">"
            break;
          default: // hg
            str += "<img class='thumbnail' src=\"" + "https://preview.ibb.co/cm8PLe/Full_Genome1_Mb.jpg" + "\">"; 
            break;
        }
        str += "</div></div>"
        break;
      }
    }
    str += "</section></li>"; 
    sections.innerHTML += str;
  }
  setCSS(json);
  scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions);
  download(json);
}

var setCSS = function(json) {
  document.getElementById('scrollingText').style.fontFamily = json.fontFamily;
  document.getElementById('scrollingText').style.color = json.fontColor;
  document.getElementById('scrollingText').style.fontSize = json.fontSize/16 + "rem";
  document.body.style.background = json.bgColor;
  cssEngine(json.css);
}