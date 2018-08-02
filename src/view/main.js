// initialize first view
if (window.location.pathname.split("/").pop()==='create.html') {
  globalVars.loadHg('http://higlass.io/api/v1/viewconfs/?d=WV2nvPIJScK1zpZGf5lO6A');
} else if (window.location.pathname.split("/").pop()==='view.html') {
  globalVars.loadHg(globalVars.details.initialHg);
}

globalVars.loadJSON(globalVars.details);
