import { createHgComponent } from 'higlass';
import details from '../../data.json';

window.globalVars = {}; // global Vars: createHg, details, hgv, loadHg, loadViewConf, 
                        // loadViewConfAndZoom, reverse, activate

globalVars.createHg = createHgComponent;

globalVars.details = details;

globalVars.allowExport = function (viewConf) { 
  viewConf.exportViewUrl = "http://higlass.io" + viewConf.exportViewUrl;
  return viewConf;
}