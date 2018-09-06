import { json } from './jsonModal.js';
import { download } from './editHTML.js';
import { mmd } from '../../third_party/mmd.min.js';

export function editContent() {

  /**
   * When "Edit Content" button is clicked, open 
   * corresponding modal 
   */
  $("#editContent").click(function(){
    $("#textModal").modal();
  });

  /**
   * When "Submit" button is clicked, 
   * submit text box input to call function to
   * change contents of section
   */
  $(".modal-footer").on('click', '#submitEdit', function() {
    $("#newText").submit();
  });

  /**
   * Change contents of section in the page and the JSON object
   */
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