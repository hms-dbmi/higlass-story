import { openFile } from './loadJSON.js';


$(document).ready(function (){ 
  $("#inputJSON").click(function(){
    $("#jsonModal").modal();
  });
  document.getElementById('submitJSON').addEventListener('click', openFile, false);
})



