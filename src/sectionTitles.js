import { json } from './create/jsonModal.js';
import { download } from './create/editHTML.js';

/**
* When "Set Titles" button is clicked, open corresponding modal
*/
export function openTitlesModal() {
  $("#inputTitles").click(function(){
    $("#titlesModal").modal();
  });
}

export function addTitleRow() {
  $("#addTitleRow").click(function() {
    titlesForm.innerHTML += ` 
     <div class='row'>
      <div class='col-sm-9'>
        <input type='text' class='form-control titleRow' placeholder='Enter title here'>
      </div>

      <div class='col-sm-3'>
        <input type='number' class='form-control titleRow' placeholder='#'>
      </div>
    </div>
    `
  })
}

/**
* When "Submit" button is clicked in titles modal, add titles to json and populate selSection dropdown options
*/
export function submitTitles() {
  $("#submitTitles").click(function() {
    var frag = document.createDocumentFragment();
    frag.appendChild(new Option('Jump to...','choose'));
    for(var i=1; i<titlesForm.children.length; i++) { // adjusted for first row being labels
      var titleText = titlesForm.children[i].children[0].children[0].value;
      var titleNum = titlesForm.children[i].children[1].children[0].value - 1;
      json.titles.push([titleText, titleNum]);
      frag.appendChild(new Option(titleText, titleNum));
      titlesForm.children[i].children[0].children[0].value = '';
      titlesForm.children[i].children[1].children[0].value = '';
    }
    var select = document.getElementById("selSection");
    $('#selSection').empty();
    select.appendChild(frag);
    download(json);
  })
}

/**
* When user changes value of selSection dropdown, scroll to corresponding section
*/
export function skipTo() {
  $("#selSection").change(function() {
    if(selSection.value !== 'choose' && selSection.value < sections.children.length && selSection.value >= 0) {
      var ind = parseInt(selSection.value);
      if(ind==0) {
        window.scrollTo(0,offset(document.getElementById('scrollingText')));
      } else {
        var prevTop = offset(sections.children[ind-1].children[0]);
        window.scrollTo(0,prevTop);
    }
      }
  })
  $("#selSection").val('choose').change();
}

/**
* When user loads in report, populate selSection dropdown 
*
* @param Object obj - JSON file with metadata of report
*/
export function loadTitles(obj) {
  var frag = document.createDocumentFragment();
    frag.appendChild(new Option('Jump to...','choose'));
    for(var i=1; i<obj.titles.length; i++) { // adjusted for first row being labels
      var titleText = obj.titles[i][0];
      var titleNum = obj.titles[i][1];
      frag.appendChild(new Option(titleText, titleNum));
    }
    var select = document.getElementById("selSection");
    $('#selSection').empty();
    select.appendChild(frag);
}

/**
* Calculate the y-position of an element relative to the DOM to use in skipping to a section
*
* @param Object el - element of interest (used in skipTo() as the previous section of section
* to be skipped to in order to ensure animation triggers)
* @return int - y-position of given element relative to DOM
*/
var offset = function(el) {
  var rect = el.getBoundingClientRect();
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop
}
