import createHgComponent from 'higlass';

window.globalVars = {}; //global Vars: createHg, hgv, viewConfUrls, typeOfChange, prevViewConf, loadViewConf,
													// json, allowExport, addImg, addVid, addHg, addYt, loadViewConfAndZoom, reverse

globalVars.createHg = createHgComponent;

globalVars.viewConfUrls = [];

globalVars.json = {
	fontFamily: "Helvetica Neue",
	fontColor: "black",
	fontSize: 22,
	bgColor: "#f9f9f9",
  css: "",
  initialHg: "",
	textSections: [],
	mediaSections: []
}

globalVars.allowExport = function (viewConf) { 
	viewConf.exportViewUrl = "//higlass.io" + viewConf.exportViewUrl;
	return viewConf;
}

