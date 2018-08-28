import { json } from './jsonModal.js';
import { download } from './editHTML.js';
import { mmd } from '../../third_party/mmd.min.js';

export function editContent() {

  $("#editContent").click(function(){
    $("#textModal").modal();
  });

  $(".modal-footer").on('click', '#submitEdit', function() {
    $("#newText").submit();
  });

  $(".modal-body").on('submit', '#newText', function() {
    if(selSection.value <= json.textSections.length) {
      json.textSections[selSection.value-1] = mmd(newText.value);
      sections.children[selSection.value-1].children[0].children[0].innerHTML = "<div class='inlineText sectionContent'><h4>Section Content: </h4>" + 
        mmd(newText.value) + "</div>"; 
      download(json);
    }
    selSection.value = "";
    newText.value = "";
  });

}