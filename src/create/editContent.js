import { json } from './jsonModal.js';
import { download } from './editHTML.js';
import { mmd } from '../../third_party/mmd.min.js';

/**
Enables user to edit the text content of an existing section
*/
export function editContent() {

  /** {int} The index of the section to be edited by the user */
  var num;
  
  /**
  * When the pencil icon in a section is clicked, open a modal for
  * the user to edit the content of that section
  */
  $(document).on("click", ".fa-pencil-alt", function() { 
    $("#textModal").modal();
    num = $(this).parent().parent().index();
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
    if(num < json.textSections.length) {
      if($('#selEdit').val()==='text') {
        json.textSections[num] = mmd(newText.value);
        sections.children[0].children[num].children[2].children[0].innerHTML = "<h4>Section Content: </h4>" + 
          mmd(newText.value);
        newText.value = "";
      } else if($('#selEdit').val()==='img') {
        var imgHTML = "<h4>Section Content: </h4><img class='inlineImg' src=\"" + newImgUrl.value + "\">" + "<div class='caption'>" + newImgText.value + "</div>";
        json.textSections[num] = imgHTML;
        sections.children[0].children[num].children[2].children[0].innerHTML = imgHTML;
        newImgUrl.value = "";
        newImgText.value = "";
      } else if($('#selEdit').val()==='vid') {
        var vidHTML = "<h4>Section Content: </h4><video class='inlineVid' width='560' height='315' autoplay src='" + newVidUrl.value + "' type='video/mp4'></video>" 
          + "<div class='caption'>" + newVidText.value + "</div>";
        sections.children[0].children[num].children[2].children[0].innerHTML = vidHTML;
        json.textSections[num] = vidHTML;
        newVidUrl.value = "";
        newVidText.value = "";
      } else if($('#selEdit').val()==='yt') {
        var ytHTML = "<h4>Section Content: </h4><iframe class='inlineYt' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen src='https://www.youtube.com/embed/" 
          + newYtUrl.value + "'></iframe>" + "<div class='caption'>" + newYtText.value + "</div>";
        json.textSections[num] = ytHTML;
        sections.children[0].children[num].children[2].children[0].innerHTML = ytHTML;
        newYtUrl.value = "";
        newYtText.value = "";
      } 
      selChoose();
      $("#selEdit").val('choose').change();
      download(json);
    }
  });

}

/**
* When user selects a type of story element to add, call a function to change the visibility 
* of the inputs to only show what is needed
*/
export function changeSelEdit() { 
  $(document).ready(function (){ 
    $('#selEdit').change(function() {
        document.getElementById('placeholder').style.display = 'none';
        if (this.value === 'img') {
          selImg();
        } else if (this.value === 'vid') {
          selVid();
        } else if (this.value === 'yt') {
          selYt();
        } else if (this.value === 'text') {
          selText();
        } else if (this.value === 'choose') {
          selChoose();
        } 
    });
  })
}


/**
* When user chooses to add an image, change visibility of input options to only show those inputs
*/
var selImg = function() {
  document.getElementById('imgEdit').style.display = 'block';
  document.getElementById('vidEdit').style.display = 'none';
  document.getElementById('ytEdit').style.display = 'none';
  document.getElementById('textEdit').style.display = 'none';
  document.getElementById('newImgUrl').value = '';
  document.getElementById('newImgText').value = '';
}

/**
* When user chooses to add a Youtube video, change visibility of input options to only show those inputs
*/
var selYt = function() {
  document.getElementById('imgEdit').style.display = 'none';
  document.getElementById('vidEdit').style.display = 'none';
  document.getElementById('ytEdit').style.display = 'block';
  document.getElementById('textEdit').style.display = 'none';
  document.getElementById('newYtUrl').value = '';
  document.getElementById('newYtText').value = '';
}

/**
* When user chooses to add a video, change visibility of input options to only show those inputs
*/
var selVid = function() {
  document.getElementById('imgEdit').style.display = 'none';
  document.getElementById('vidEdit').style.display = 'block';
  document.getElementById('ytEdit').style.display = 'none';
  document.getElementById('textEdit').style.display = 'none';
  document.getElementById('newVidUrl').value = '';
  document.getElementById('newVidText').value = '';
}

/**
* When user chooses to add a text element, change visibility of input options to only show those inputs
*/
var selText = function() {
  document.getElementById('imgEdit').style.display = 'none';
  document.getElementById('vidEdit').style.display = 'none';
  document.getElementById('ytEdit').style.display = 'none';
  document.getElementById('textEdit').style.display = 'block';
  document.getElementById('newText').value = '';
}

/**
* Only display inputs needed for the type of element the user wants to add
*/
var selChoose = function() {
  document.getElementById('imgEdit').style.display = 'none';
  document.getElementById('vidEdit').style.display = 'none';
  document.getElementById('ytEdit').style.display = 'none';
  document.getElementById('textEdit').style.display = 'none';
}