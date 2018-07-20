$(document).ready(function (){ 

  var selImg = function() {
    document.getElementById('development-demo').style.display = 'none';
    document.getElementById('imgOptions').style.display = 'block';
    document.getElementById('vidOptions').style.display = 'none';
    document.getElementById('textOptions').style.display = 'none';
    document.getElementById('figOptions').style.display = 'none';
    document.getElementById('imgUrl').value = '';
    document.getElementById('submit').style.display = 'block';
    document.getElementById('img').style.display = 'none';
    document.getElementById('vid').style.display = 'none';
    document.getElementById('fig').style.display = 'none';
	}

  var selVid = function() {
    document.getElementById('development-demo').style.display = 'none';
    document.getElementById('vidOptions').style.display = 'block';
    document.getElementById('imgOptions').style.display = 'none';
    document.getElementById('textOptions').style.display = 'none';
    document.getElementById('figOptions').style.display = 'none';
    document.getElementById('vidUrl').value = '';
    document.getElementById('submit').style.display = 'block';
    document.getElementById('img').style.display = 'none';
    document.getElementById('vid').style.display = 'none';
    document.getElementById('fig').style.display = 'none';
	}

  var selHg = function() {
    document.getElementById('development-demo').style.display = 'inline-block';
    document.getElementById('imgOptions').style.display = 'none';
    document.getElementById('vidOptions').style.display = 'none';
    document.getElementById('textOptions').style.display = 'none';
    document.getElementById('figOptions').style.display = 'none';
    document.getElementById('submit').style.display = 'block';
    document.getElementById('img').style.display = 'none';
    document.getElementById('vid').style.display = 'none';
    document.getElementById('fig').style.display = 'none';
	}

  var selText = function() {
    document.getElementById('development-demo').style.display = 'none';
    document.getElementById('textOptions').style.display = 'block';
    document.getElementById('imgOptions').style.display = 'none';
    document.getElementById('vidOptions').style.display = 'none';
    document.getElementById('figOptions').style.display = 'none';
    document.getElementById('sectionText').value = '';
    document.getElementById('submit').style.display = 'block';
    document.getElementById('img').style.display = 'none';
    document.getElementById('vid').style.display = 'none';
    document.getElementById('fig').style.display = 'none';
	}

  var selFig = function() {
    document.getElementById('development-demo').style.display = 'none';
    document.getElementById('textOptions').style.display = 'none';
    document.getElementById('imgOptions').style.display = 'none';
    document.getElementById('vidOptions').style.display = 'none';
    document.getElementById('figOptions').style.display = 'block';
    ////document.getElementById('figText').value = '';
    document.getElementById('figUrl').value = '';
    document.getElementById('submit').style.display = 'block';
    document.getElementById('img').style.display = 'none';
    document.getElementById('vid').style.display = 'none';
    document.getElementById('fig').style.display = 'none';
  }

  var selChoose = function() {
    document.getElementById('development-demo').style.display = 'none';
    document.getElementById('img').style.display = 'none';
    document.getElementById('vid').style.display = 'none';
    document.getElementById('fig').style.display = 'none';
    document.getElementById('imgOptions').style.display = 'none';
    document.getElementById('vidOptions').style.display = 'none';
    document.getElementById('textOptions').style.display = 'none';
    document.getElementById('figOptions').style.display = 'none';
    document.getElementById('submit').style.display = 'none';
  }

	$('#selDisplay').change(function() {
	    if (this.value === 'img') {
        selImg();
	    } else if (this.value === 'vid') {
        selVid();
	    } else if (this.value === 'hg') {
	    	selHg();
	    } else if (this.value === 'text') {
	    	selText();
	    } else if (this.value === 'fig') {
        selFig();
      } else if (this.value === 'choose') {
        selChoose();
      } 
	});

})