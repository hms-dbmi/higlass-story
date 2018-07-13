import createHgComponent from 'higlass';

window.globalVars = {}; //global Vars: createHg, hgv, viewConfUrls, typeOfChange, prevViewConf, loadViewConf
													// json, allowExport, img

globalVars.createHg = createHgComponent;

globalVars.viewConfUrls = [];

globalVars.json = {
	fontFamily: "Helvetica Neue",
	fontColor: "black",
	fontSize: 22,
	bgColor: "white",
	textSections: [],
	mediaSections: []
}

globalVars.allowExport = function (viewConf) { 
	viewConf.exportViewUrl = "http://higlass.io" + viewConf.exportViewUrl;
	return viewConf;
}