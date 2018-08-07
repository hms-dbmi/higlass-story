 $(document).ready(function (){ 

  $("#editContent").click(function(){
    $("#textModal").modal();
  });

  $(".modal-footer").on('click', '#submitEdit', function() {
    $("#newText").submit();
  });

  $(".modal-body").on('submit', '#newText', function() {
    if(selSection.value <= globalVars.json.textSections.length) {
      globalVars.json.textSections[selSection.value-1] = mmd(newText.value);
      sections.children[selSection.value-1].children[0].children[0].innerHTML = "<div class='inlineText sectionContent'><h4>Section Content: </h4>" + 
        mmd(newText.value) + "</div>"; 
      globalVars.download(globalVars.json);
    }
    selSection.value = "";
    newText.value = "";
  });

  

});