import { openFile, openModal } from './loadJSON.js';

$(document).ready(function (){ 
  openModal();
  document.getElementById('submitJSON').addEventListener('click', openFile, false);
})



