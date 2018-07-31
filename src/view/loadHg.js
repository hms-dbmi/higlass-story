var loadHg = function(viewConfigUrl) {
  fetch(viewConfigUrl)
    .then(getJSON, handleErrors)
    .then(createHgv, handleErrors)
    .then(null, showError); // error handling
}

globalVars.loadViewConf = function(viewConfigUrl) {
  let vc = JSON.parse(globalVars.hgv.exportAsViewConfString());
  for(var i=0; i<vc.views.length; i++) {
    globalVars.hgv.zoomToDataExtent(vc.views[i].uid);
  }
  fetch(viewConfigUrl)
    .then(getJSON, handleErrors)
    .then(setViewConf, handleErrors)
    .then(null, showError);
}

globalVars.loadViewConfAndZoom = function(viewConfigUrl, loadZoomParams) {
  fetch(viewConfigUrl)
    .then(getJSON, handleErrors)
    .then(function(response) { return setViewConfAndZoom(response, loadZoomParams) }, handleErrors)
    .then(null, showError);
}

function handleErrors(response) {
  throw(response);
}

function showError(response) {
  console.log('Error: There was a problem loading the HiGlass viewer.');
  alert('Error: There was a problem loading the HiGlass viewer.');
}

// helper functions of things to do after fetching back the requested view config
function getJSON(response) {
  return response.json();
}

function createHgv(response) { 
  globalVars.hgv = globalVars.createHg( // creates the view
    document.getElementById('hg'),
    globalVars.allowExport(response),
    { bounded: true }
  );
}

function setViewConf(response) {
  const p = globalVars.hgv.setViewConfig(response);
  p.then(() => {
  });
}

function setViewConfAndZoom(response, loadZoomParams) {
  const p = globalVars.hgv.setViewConfig(response);
   p.then(() => { 
    for(var k=0; k<Object.keys(loadZoomParams).length; k++) {
      globalVars.hgv.zoomTo(loadZoomParams[k][0], loadZoomParams[k][1], loadZoomParams[k][2], loadZoomParams[k][3], loadZoomParams[k][4], 0);
    }
  });
}

loadHg(globalVars.details.initialHg);
