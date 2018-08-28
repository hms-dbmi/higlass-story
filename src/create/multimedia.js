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

