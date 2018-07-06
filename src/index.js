import createHgComponent from 'higlass';

window.globalVars = {}; //global Vars: createHg, loadHg, hgv, viewConfs, typeOfChange, prevViewConf, json

globalVars.createHg = createHgComponent;

globalVars.viewConfUrls = [];

globalVars.activateFunctions = []; 

globalVars.json = {
	initialHg: "",
	fontFamily: "Helvetica Neue",
	fontColor: "black",
	fontSize: 22,
	bgColor: "white",
	sections: []
}

globalVars.allowExport = function (viewConf) {
	viewConf.exportViewUrl = "http://higlass.io" + viewConf.exportViewUrl;
	return viewConf;


}