import { createHgComponent } from 'higlass';

window.globalVars = {}; // global Vars: createHg, details, hgv, loadHg, loadViewConf, 
                        // loadViewConfAndZoom, reverse, activate

globalVars.createHg = createHgComponent;

globalVars.allowExport = function (viewConf) { 
  viewConf.exportViewUrl = "http://higlass.io" + viewConf.exportViewUrl;
  return viewConf;
}
