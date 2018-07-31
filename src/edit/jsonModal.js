$(document).ready(function (){ 

  $("#inputJSON").click(function(){
    $("#jsonModal").modal();
  });

  $(".modal-footer").on('click', '#submitJSON', function() {
    $("#jsonText").submit();
  });

  $(".modal-body").on('submit', '#jsonText', function() {
    globalVars.json = jsonText.value;
    loadJSON();
  });

});