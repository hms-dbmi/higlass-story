/**
* When user chooses to add an image, change visibility of input options to only show those inputs
*/
var selImg = function() {
  if (!$('#hg').hasClass('hidden')) {
    $('#hg').toggleClass('hidden');
  }
  document.getElementById('imgOptions').style.display = 'block';
  document.getElementById('vidOptions').style.display = 'none';
  document.getElementById('hgOptions').style.display = 'none';
  document.getElementById('ytOptions').style.display = 'none';
  document.getElementById('textOptions').style.display = 'none';
  document.getElementById('imgUrl').value = '';
  document.getElementById('imgText').value = '';
  document.getElementById('submit').style.display = 'inline-block';
  document.getElementById('cancel').style.display = 'inline-block';
  document.getElementById('img').style.display = 'none';
  document.getElementById('text').style.display = 'none';
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'none';
}

/**
* When user chooses to add a Youtube video, change visibility of input options to only show those inputs
*/
var selYt = function() {
  if (!$('#hg').hasClass('hidden')) {
    $('#hg').toggleClass('hidden');
  }
  document.getElementById('vidOptions').style.display = 'none';
  document.getElementById('hgOptions').style.display = 'none';
  document.getElementById('ytOptions').style.display = 'block';
  document.getElementById('imgOptions').style.display = 'none';
  document.getElementById('textOptions').style.display = 'none';
  document.getElementById('ytUrl').value = '';
  document.getElementById('ytText').value = '';
  document.getElementById('submit').style.display = 'inline-block';
  document.getElementById('cancel').style.display = 'inline-block';
  document.getElementById('img').style.display = 'none';
  document.getElementById('text').style.display = 'none';
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'none';
}

/**
* When user chooses to add a video, change visibility of input options to only show those inputs
*/
var selVid = function() {
  if (!$('#hg').hasClass('hidden')) {
    $('#hg').toggleClass('hidden');
  }
  document.getElementById('vidOptions').style.display = 'block';
  document.getElementById('hgOptions').style.display = 'none';
  document.getElementById('ytOptions').style.display = 'none';
  document.getElementById('imgOptions').style.display = 'none';
  document.getElementById('textOptions').style.display = 'none';
  document.getElementById('vidUrl').value = '';
  document.getElementById('vidText').value = '';
  document.getElementById('submit').style.display = 'inline-block';
  document.getElementById('cancel').style.display = 'inline-block';
  document.getElementById('img').style.display = 'none';
  document.getElementById('text').style.display = 'none';
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'none';
}

/**
* When user chooses to add a HiGlass view, change visibility of input options to only show those inputs
*/
var selHg = function() {
  if ($('#hg').hasClass('hidden')) {
    $('#hg').toggleClass('hidden');
  }
  document.getElementById('imgOptions').style.display = 'none';
  document.getElementById('hgOptions').style.display = 'block';
  document.getElementById('vidOptions').style.display = 'none';
  document.getElementById('ytOptions').style.display = 'none';
  document.getElementById('textOptions').style.display = 'none';
  document.getElementById('hgUrl').value = '';
  document.getElementById('submit').style.display = 'inline-block';
  document.getElementById('cancel').style.display = 'inline-block';
  document.getElementById('img').style.display = 'none';
  document.getElementById('text').style.display = 'none';
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'none';
}

/**
* When user chooses to add a text element, change visibility of input options to only show those inputs
*/
var selText = function() {
  if (!$('#hg').hasClass('hidden')) {
    $('#hg').toggleClass('hidden');
  }
  document.getElementById('textOptions').style.display = 'block';
  document.getElementById('hgOptions').style.display = 'none';
  document.getElementById('imgOptions').style.display = 'none';
  document.getElementById('vidOptions').style.display = 'none';
  document.getElementById('ytOptions').style.display = 'none';
  document.getElementById('sectionText').value = '';
  document.getElementById('submit').style.display = 'inline-block';
  document.getElementById('cancel').style.display = 'inline-block';
  document.getElementById('img').style.display = 'none';
  document.getElementById('text').style.display = 'none';
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'none';
}

/**
* Only display inputs needed for the type of element the user wants to add
*/
var selChoose = function() {
  if (!$('#hg').hasClass('hidden')) {
    $('#hg').toggleClass('hidden');
  }
  document.getElementById('img').style.display = 'none';
  document.getElementById('text').style.display = 'none';
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'none';
  document.getElementById('imgOptions').style.display = 'none';
  document.getElementById('hgOptions').style.display = 'none';
  document.getElementById('vidOptions').style.display = 'none';
  document.getElementById('ytOptions').style.display = 'none';
  document.getElementById('textOptions').style.display = 'none';
  document.getElementById('submit').style.display = 'none';
  document.getElementById('cancel').style.display = 'none';
}

/**
* When user selects a type of story element to add, call a function to change the visibility 
* of the inputs to only show what is needed
*/
export function changeSelDisplay() { 
  $(document).ready(function (){ 
  	$('#selDisplay').change(function() {
        document.getElementById('placeholder').style.display = 'none';
  	    if (this.value === 'img') {
          selImg();
  	    } else if (this.value === 'vid') {
          selVid();
  	    } else if (this.value === 'yt') {
          selYt();
        } else if (this.value === 'hg') {
  	    	selHg();
  	    } else if (this.value === 'text') {
  	    	selText();
        } else if (this.value === 'choose') {
          selChoose();
        } 
  	});
  })
}

