import * as hglib from 'higlass';

export var hgv = null;

export function loadHg(viewConfigUrl) {
  fetch(viewConfigUrl)
    .then(getJSON, handleErrors)
    .then(createHgv, handleErrors)
    .then(null, showError); // error handling
}

export function loadViewConf(viewConfigUrl) {
  fetch(viewConfigUrl)
    .then(getJSON, handleErrors)
    .then(setViewConf, handleErrors)
    .then(null, showError);
}

var handleErrors = function(response) {
  throw(response);
}

var showError = function(response) {
  console.log('Error: There was a problem loading the HiGlass viewer.');
  alert('Error: There was a problem loading the HiGlass viewer.');
}

// helper functions of things to do after fetching back the requested view config
var getJSON = function(response) {
  return response.json();
}

var createHgv = function(response) { 
  hgv = hglib.createHgComponent( // creates the view
    document.getElementById('hg'),
    allowExport(response),
    { bounded: true }
  );
}

function setViewConf(response) {
  const p = hgv.setViewConfig(response);
  p.then(() => {
    
  });
}

var allowExport = function (viewConf) { 
  viewConf.exportViewUrl = "//higlass.io" + viewConf.exportViewUrl;
  return viewConf;
}