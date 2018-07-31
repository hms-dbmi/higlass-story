import createHgComponent from 'higlass';

window.globalVars = {}; //global Vars: createHg, hgv, viewConfUrls, typeOfChange, prevViewConf, loadViewConf,
                          // json, allowExport, addImg, addVid, addHg, addYt, loadViewConfAndZoom, reverse

globalVars.createHg = createHgComponent;

globalVars.viewConfUrls = [];

globalVars.allowExport = function (viewConf) { 
  viewConf.exportViewUrl = "http://higlass.io" + viewConf.exportViewUrl;
  return viewConf;
}