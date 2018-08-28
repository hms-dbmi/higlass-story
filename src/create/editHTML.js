import { typeOfChange } from './compareViewConfs.js';
import { hgv, loadHg, loadViewConf } from '../loadHg.js';
import { addText, addImg, addYt, addVid, addHg } from '../shiftFocus.js';
import { reverse } from '../scrollUp.js';
import { json } from './jsonModal.js';
import { mmd } from '../../third_party/mmd.min.js';
import { scrollerDisplay } from '../../third_party/scrollerDisplay.js'

var prevViewConf = null;
var viewConfUrls = [];
var activateFunctions = [];
var reverseFunctions = [];

// drag and drop initializer
export function swap() {
  var startDrag = 0;
  var endDrag = 0;
  $("#sections").sortable({
    onDrop: function  ($item, container, _super) {
      $item.removeClass(container.group.options.draggedClass).removeAttr("style");
      $("body").removeClass(container.group.options.bodyClass);
      endDrag = $item.index();
      sort(startDrag, endDrag);
    },
    onDragStart: function ($item, container, _super, event) {
      $item.css({
        height: $item.outerHeight(),
        width: $item.outerWidth()
      })
      $item.addClass(container.group.options.draggedClass);
      $("body").addClass(container.group.options.bodyClass);
      startDrag = $item.index();
    },
  });
}

// sort text sections after drag and drop
var sort = function(startDrag, endDrag) { 
  if(startDrag !== endDrag) {
    var tempSections = [];
    for(var i=0; i<json.textSections.length; i++) {
      if(i === endDrag) {
        if(i < startDrag) {
          tempSections.push(json.textSections[startDrag]);
          tempSections.push(json.textSections[i]);
        } else {
          tempSections.push(json.textSections[i]);
          tempSections.push(json.textSections[startDrag]);
        }
      } else {
        if(i !== startDrag) {
          tempSections.push(json.textSections[i]);
        }
      }
    }
    json.textSections = tempSections;
    download(json);
  }
}

export function createDownload() {
  // DOWNLOAD: initialize link
  var a = document.createElement('a');
  a.className = "btn btn-info";
  a.id = "downloadLink";
  var container = document.getElementById('downloadDiv');
  container.appendChild(a);
}

export function download(json) {
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
  downloadLink.href = 'data:' + data;
  downloadLink.download = 'data.json';
  downloadLink.innerHTML = '<i class="fas fa-download"></i>&nbsp; Download JSON';
  downloadDiv.style.display = 'block';
}

// reset input values back to default
export function selReset(){
  document.getElementById('imgOptions').style.display = 'none';
  document.getElementById('hgOptions').style.display = 'none';
  document.getElementById('vidOptions').style.display = 'none';
  document.getElementById('ytOptions').style.display = 'none';
  document.getElementById('textOptions').style.display = 'none';
  document.getElementById('imgUrl').value = '';
  document.getElementById('hgUrl').value = '';
  document.getElementById('ytUrl').value = '';
  document.getElementById('vidUrl').value = '';
  document.getElementById('sectionText').value = '';
  document.getElementById('vidText').value = '';
  document.getElementById('imgText').value = '';
  document.getElementById('ytText').value = '';
  document.getElementById('submit').style.display = 'none';
  document.getElementById('cancel').style.display = 'none';
  $("#selDisplay").val('choose').change();
}

var getNumSections = function() {
  var numSections = sections.querySelectorAll('.step').length;
  return numSections;
}

// HIGLASS
var getHg = function() {
  if(getNumSections() > json.textSections.length) {
    json.textSections.push("");
    sections.lastElementChild.lastElementChild.lastElementChild.innerHTML = "<div class='inlineText sectionContent'><h4>Section Content: </h4></div>" 
        + sections.lastElementChild.lastElementChild.lastElementChild.innerHTML;
  }
  const thisViewConf = hgv.exportAsViewConfString();
  sections.innerHTML += "<li><section class=\"step\"><i class='fa fa-times fa-clickable' aria-hidden='true'></i><div id='editableSection'><div class='sectionThumbnail'><h4>Main Content: <i class='fa fa-arrow-right' aria-hidden='true'></i></h4><img class='thumbnail' src='" 
   + "https://preview.ibb.co/cm8PLe/Full_Genome1_Mb.jpg" +"'></div></div></section></li>" //// generic replacement for broken image
  // sections.innerHTML += "<li><section class=\"step\"><i class='fa fa-times fa-clickable' aria-hidden='true'></i><div id='editableSection'><div class='sectionThumbnail'><h4>Media Content <i class='fa fa-arrow-right' aria-hidden='true'></i></h4><img class='thumbnail' src='" 
  //  + hgv.getDataURI() + "'></div></div></section></li>" //// debug: currently blank image
  hgv.shareViewConfigAsLink("https://higlass.io/api/v1/viewconfs")
    .then((sharedViewConfig) => {
      viewConfUrls.push("https://higlass.io/api/v1/viewconfs/?d=" + sharedViewConfig.id);
      if(typeof prevViewConf !== 'undefined') {
        const trans = typeOfChange(prevViewConf, thisViewConf, viewConfUrls.slice(-1)[0]);
        var hgObj = {
          "activate": trans[0],
          "activateParams": trans[1],
          "startPos": getNumSections()-1,
        };
        json.mediaSections.push(hgObj);
        switch(trans[0]) {
          case "reload":
            const loadParams = trans[1].url;
            activateFunctions[getNumSections()-1] = function() {
              addHg();
              loadViewConf(loadParams);
            };
            break;
          case "zoom":
            const zoomParams = trans[1].zoom;
            activateFunctions[getNumSections()-1] = function() {
              addHg();
              for(var i=0; i<Object.keys(zoomParams).length; i++) {
                hgv.zoomTo(zoomParams[i][0], zoomParams[i][1], zoomParams[i][2], zoomParams[i][3], zoomParams[i][4], 0); //// 0
              }
            };
            break;
          default:
            activateFunctions[getNumSections()-1] = function() {
              addHg();
            };
        }
      } else {
        const url = viewConfUrls[0];
        json.initialHg = url;
        var initialViewConf = JSON.parse(thisViewConf);
        activateFunctions[getNumSections()-1] = function() {
          addHg();
          loadViewConf(url);
        };
        var hgObj = {
          "activate": "reload",
          "activateParams": {},
          "startPos": getNumSections()-1,
        };
        hgObj.activateParams.url = url;
        hgObj.activateParams.zoom = {};
        for(var i=0; i<initialViewConf.views.length; i++) {
          hgObj.activateParams.zoom[i] = [initialViewConf.views[i].uid, initialViewConf.views[i].initialXDomain[0], initialViewConf.views[i].initialXDomain[1], 
          initialViewConf.views[i].initialYDomain[0], initialViewConf.views[i].initialYDomain[1]];
        }
        json.mediaSections.push(hgObj);
      }
      prevViewConf = thisViewConf;
      download(json);
      reverseFunctions = reverse(json);
      scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions   
    })
    .catch((err) => { console.error('Something did not work. Sorry', err); });
}

// Add to report
export function addMedia() {
  if($('#selDisplay').val()==='text') {
    $( "#sectionText" ).submit();  
  } else if($('#selDisplay').val()==='hg') {
    addHg();
    getHg();
  } else if($('#selDisplay').val()==='img') {
    $( "#imgUrl" ).submit();
  } else if($('#selDisplay').val()==='vid') {
    $( "#vidUrl" ).submit();
  } else if($('#selDisplay').val()==='yt') {
    $( "#ytUrl" ).submit();
  } 
  selReset();
}

export function submitHgUrl(event) {
  const baseApiUrl = 'https://higlass.io/api/v1/viewconfs/?d=';
  const regExBaseHgUrl = /http:\/\/higlass.io\/app\/\?config=/;
  var url = hgUrl.value.replace(regExBaseHgUrl, baseApiUrl);
  loadViewConf(url);
  event.preventDefault();
}

// TEXT
export function createText(event) {
  const textParams = mmd(sectionText.value);
  if($('input[id=selTextMain]').is(":checked")) {
    if(getNumSections() > json.textSections.length) {
      json.textSections.push("");
    }
    addText(textParams);
    activateFunctions[getNumSections()] = function() {
      addText(textParams);
    };
    var textObj = {
      "activate": "text",
      "activateParams": textParams,
      "startPos": getNumSections(),
    } 
    sections.innerHTML += "<li><section class=\"step\"><i class='fa fa-times fa-clickable' aria-hidden='true'></i><div id='editableSection'><div class='sectionThumbnail'><h4>Main Content: <i class='fa fa-arrow-right' aria-hidden='true'></i></h4><img class='thumbnail' src='https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Fast_text.png/330px-Fast_text.png'></div></div></section></li>"; 
    json.mediaSections.push(textObj);
  } else {
    if(getNumSections() > json.textSections.length) { // fill empty section with content
      sections.lastElementChild.lastElementChild.lastElementChild.innerHTML = "<div class='inlineText sectionContent'><h4>Section Content: </h4>" + textParams 
        + "</div>" + sections.lastElementChild.lastElementChild.lastElementChild.innerHTML;
    } else { // create new section of content
      activateFunctions.push( function() {});
      sections.innerHTML += "<li><section class='step'><i class='fa fa-times fa-clickable' aria-hidden='true'></i><div class='inlineText sectionContent'><h4>Section Content: </h4>" + textParams + "</div></section></li>"; 
    }
    json.textSections.push(textParams);
  }
  download(json);
  reverseFunctions = reverse(json);
  scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions
}

// IMAGE
export function createImg(event) {
  const imgParams = [imgUrl.value, mmd(imgText.value)];
  if($('input[id=selImgMain]').is(":checked")) {
    if(getNumSections() > json.textSections.length) {
      json.textSections.push("");
      sections.lastElementChild.lastElementChild.lastElementChild.innerHTML = "<div class='inlineText sectionContent'><h4>Section Content: </h4></div>" 
        + sections.lastElementChild.lastElementChild.innerHTML;

    }
    addImg(imgParams);
    activateFunctions[getNumSections()] = function() {                                                                                                                                                                                                                                                                                                                                                                                                                 
      addImg(imgParams);
    };
    var imgObj = {
      "activate": "img",
      "activateParams": imgParams,
      "startPos": getNumSections(),
    };
    sections.innerHTML += "<li><section class=\"step\"><i class='fa fa-times fa-clickable' aria-hidden='true'></i><div id='editableSection'><div class='sectionThumbnail'><h4>Main Content: <i class='fa fa-arrow-right' aria-hidden='true'></i></h4><img class='thumbnail' src=\"" + imgUrl.value + "\"></div></div></section></li>"; 
    json.mediaSections.push(imgObj);
  } else {
    var imgHTML = "<div class='inlineText sectionContent'><h4>Section Content: </h4><img class='inlineImg' src=\"" + imgUrl.value + "\">" + "<div class='caption'>" + imgParams[1] + "</div></div>";
    if(getNumSections() > json.textSections.length) { // fill empty section with content
      sections.lastElementChild.lastElementChild.lastElementChild.innerHTML = imgHTML + sections.lastElementChild.lastElementChild.lastElementChild.innerHTML;
    } else { // create new section of content
      activateFunctions.push( function() {});
      sections.innerHTML += "<li><section class=\"step\"><i class='fa fa-times fa-clickable' aria-hidden='true'></i><div id='editableSection'>" + imgHTML + "</div></section></li>"; 
    }
    json.textSections.push(imgHTML);
  }
  download(json);
  reverseFunctions = reverse(json);
  scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions
  document.getElementById('imgText').value = '';
}

// YOUTUBE VIDEO
export function createYt(event) {
  const ytParams = [ytUrl.value, mmd(ytText.value)];
  if($('input[id=selYtMain]').is(":checked")) {
    if(getNumSections() > json.textSections.length) {
      json.textSections.push("");
      sections.lastElementChild.lastElementChild.lastElementChild.innerHTML = "<div class='inlineText sectionContent'><h4>Section Content: </h4></div>" 
        + sections.lastElementChild.lastElementChild.lastElementChild.innerHTML;
    }
    addYt(ytParams);
    activateFunctions[getNumSections()] = function() {
      addYt(ytParams);
    };
    var ytObj = {
          "activate": "yt",
          "activateParams": ytParams,
          "startPos": getNumSections(),
    };
    sections.innerHTML += "<li><section class=\"step\"><i class='fa fa-times fa-clickable' aria-hidden='true'></i><div id='editableSection'><div class='sectionThumbnail'><h4>Main Content: <i class='fa fa-arrow-right' aria-hidden='true'></i></h4><img class='thumbnail' src='https://img.youtube.com/vi/" + ytUrl.value + "/default.jpg'></div></div></section></li>"; 
    json.mediaSections.push(ytObj);
  } else {
    var ytHTML = "<div class='inlineText sectionContent'><h4>Section Content: </h4><iframe class='inlineYt' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen src='https://www.youtube.com/embed/" 
      + ytUrl.value + "'></iframe>" + "<div class='caption'>" + ytParams[1] + "</div></div>";
    if(getNumSections() > json.textSections.length) { // fill empty section with content
      sections.lastElementChild.lastElementChild.lastElementChild.innerHTML = ytHTML + sections.lastElementChild.lastElementChild.lastElementChild.innerHTML;
    } else { // create new section of content
      activateFunctions.push( function() {});
      sections.innerHTML += "<li><section class=\"step\"><i class='fa fa-times fa-clickable' aria-hidden='true'></i><div id='editableSection'>" + ytHTML + "</div></section></li>"; 
    }
    json.textSections.push(ytHTML);
  }
  download(json);
  reverseFunctions = reverse(json);
  scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions
  document.getElementById('ytText').value = '';
}

// VIDEO
export function createVid(event) {
  const vidParams = [vidUrl.value, mmd(vidText.value)];
  if($('input[id=selVidMain]').is(":checked")) {
    if(getNumSections() > json.textSections.length) {
      json.textSections.push("");
      sections.lastElementChild.lastElementChild.lastElementChild.innerHTML = "<div class='inlineText sectionContent'><h4>Section Content: </h4></div>" 
        + sections.lastElementChild.lastElementChild.lastElementChild.innerHTML;
    }
    addVid(vidParams);
    activateFunctions[getNumSections()] = function() {
      addVid(vidParams);
    };
    var vidObj = {
          "activate": "vid",
          "activateParams": vidParams,
          "startPos": getNumSections(),
    };
    sections.innerHTML += "<li><section class=\"step\"><i class='fa fa-times fa-clickable' aria-hidden='true'></i><div id='editableSection'><div class='sectionThumbnail'><h4>Main Content: <i class='fa fa-arrow-right' aria-hidden='true'></i></h4><img class='thumbnail' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Video_-_The_Noun_Project.svg/512px-Video_-_The_Noun_Project.svg.png'></div></div></section></li>"; 
    json.mediaSections.push(vidObj);
  } else {
    var vidHTML = "<div class='inlineText sectionContent'><h4>Section Content: </h4><video class='inlineVid' width='560' height='315' autoplay src='" + vidUrl.value + "' type='video/mp4'></video>" + "<div class='caption'>" + vidParams[1] + "</div></div>";
    if(getNumSections() > json.textSections.length) { // fill empty section with content
      sections.lastElementChild.lastElementChild.lastElementChild.innerHTML = vidHTML + sections.lastElementChild.lastElementChild.lastElementChild.innerHTML;
    } else { // create new section of content
      activateFunctions.push( function() {});
      sections.innerHTML += "<li><section class=\"step\"><i class='fa fa-times fa-clickable' aria-hidden='true'></i><div id='editableSection'>" + vidHTML + "</div></section></li>"; 
    }
    json.textSections.push(vidHTML);
  }
  download(json);
  reverseFunctions = reverse(json);
  scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions
  document.getElementById('vidText').value = '';
}