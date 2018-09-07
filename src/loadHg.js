import {createHgComponent} from 'higlass'

/** {Object} HiGlass component */
export var hgv = null;

/**
 * Retrieve an initial view config and create a HiGlass component
 * loaded with that view config
 *
 * @param   {Object} viewConfigUrl - URL to retrieve desired view config
 */
export function loadHg(viewConfigUrl) {
  fetch(viewConfigUrl)
    .then(getJSON, handleErrors)
    .then(removeHTTP, handleErrors)
    .then(createHgv, handleErrors)
    .then(null, showError); // error handling
}

/**
 * Retrieve and set a new view config in the existing HiGlass component
 *
 * @param   {Object} viewConfigUrl - URL to retrieve desired view config
 */
export function loadViewConf(viewConfigUrl) {
  fetch(viewConfigUrl)
    .then(getJSON, handleErrors)
    .then(removeHTTP, handleErrors)
    .then(setViewConf, handleErrors)
    .then(null, showError);
}

/**
 * Throw error if  the fetch request or loading fails
 *
 * @param   {Object} response - error
 */
var handleErrors = function(response) {
  throw(response);
}

/**
 * Alert user if the fetch request or loading fails
 *
 * @param   {Object} response - error
 */
var showError = function(response) {
  console.log(response);
  alert('Error: There was a problem loading the HiGlass viewer.');
}

/**
 * Extract JSON body content from response
 *
 * @param   {Object} response - HTTP response from fetch request
 * @return  {Object} JSON object describing the view config
 */
var getJSON = function(response) {
  return response.json();
}

/**
 * Create a HiGlass component loaded with an initial view config
 * and use hgv to refer to it
 *
 * @param   {Object} response - JSON object describing the view config
 */
var createHgv = function(response) { 
  hgv = createHgComponent( // creates the view
    document.getElementById('hg'),
    allowExport(response),
    { bounded: true }
  );
}

/**
 * Set a new view config in the existing HiGlass component
 *
 * @param   {Object} response - JSON object describing the view config
 */
var setViewConf = function(response) {
  const p = hgv.setViewConfig(response);
  p.then(() => {
    
  });
}

/**
 * Change the exportViewUrl attribute of the view config to make it 
 * possible for the view config to be exported 
 *
 * @param   {Object} viewConf - JSON object describing the view config
 * @return  {Object} View config with "//higlass.io" prepended to exportViewUrl.
 */
var allowExport = function (viewConf) { 
  viewConf.exportViewUrl = "//higlass.io" + viewConf.exportViewUrl;
  return viewConf;
}

/**
 * Remove scheme for all URLs in view config
 *
 * @param   {Object} response - JSON object describing the view config
 * @return  {Object} View config with schemes of all URLs removed, e.g. "https://" -> "//".
 */
var removeHTTP = function(response) {
  var viewConfStr = JSON.stringify(response);
  viewConfStr = viewConfStr.replace(/(https?:|)\/\//g,'//')
  return JSON.parse(viewConfStr);
}