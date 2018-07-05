window.onload = function here() {

  globalVars.loadHg = function(viewConfigUrl) {

      $('#development-demo').empty();
      fetch(viewConfigUrl)
        .then(getJSON, handleErrors)
        .then(createHgv, handleErrors)
        .then(null, showError); // error handling
  }

  const baseApiUrl = 'http://higlass.io/api/v1/viewconfs/?d=';
  const regExBaseHgUrl = /http:\/\/higlass.io\/app\/\?config=/;

  function convertApiUrl(input) { // convert user's view config link to an API endpoint
    if(typeof input === 'string') {
      return input.replace(regExBaseHgUrl, baseApiUrl); 
    }
    return ''
  }

  viewConfigUrl = convertApiUrl('http://higlass.io/app/?config=WV2nvPIJScK1zpZGf5lO6A') // ask for view config URL

  function handleErrors(response) {
    throw(response);
  }

  function showError(response) {
    console.log('Error: Invalid view config ID given.')
    alert('Error: Invalid view config ID given. Please reload and enter a valid view config ID.')
  }

  // helper functions of things to do after fetching back the requested view config
  function getJSON(response) {
    return response.json()
  }

  function createHgv(response) { 
    globalVars.hgv = globalVars.createHg( // creates the view
      document.getElementById('development-demo'),
      response,
      { bounded: true }
    );
  }

  globalVars.loadHg(viewConfigUrl) // initialize first view

}