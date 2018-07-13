$(document).ready(function (){ 

	globalVars.selImg = function() {
		document.getElementById('img').style.visibility = 'visible';
    document.getElementById('development-demo').style.visibility = 'hidden';
    document.getElementById('vid').style.visibility = 'hidden';
    document.getElementById('urlText').removeAttribute('disabled');
    document.getElementById('urlText').value = '';
	}

	globalVars.selVid = function() {
		document.getElementById('vid').style.visibility = 'visible';
    document.getElementById('img').style.visibility = 'hidden';
    document.getElementById('development-demo').style.visibility = 'hidden';
    document.getElementById('urlText').removeAttribute('disabled');
    document.getElementById('urlText').value = 'https://www.youtube.com/embed/';
	}

	globalVars.selHg = function() {
		document.getElementById('vid').style.visibility = 'hidden';
    document.getElementById('img').style.visibility = 'hidden';
    document.getElementById('development-demo').style.visibility = 'visible';
    document.getElementById('urlText').disabled = 'disabled';
    document.getElementById('urlText').value = '';
	}

	$('#selDisplay').change(function() {
	    if (this.value === 'img') {
        globalVars.selImg();
	    }
	    else if (this.value === 'vid') {
        globalVars.selVid();
	    } else {
	    	globalVars.selHg();
	    }
	});


	$("#media").on('click', '#submitUrl', function() {
	  $( "#urlText" ).submit();
	});

	$("#media").on('submit', '#urlText', function( event ) {
		var selDisplay = document.getElementById('selDisplay').value;
		if(selDisplay==='img') {
			img.innerHTML = "<img src=\"" + urlText.value + "\">";
			globalVars.img = urlText.value;
      document.getElementById('urlText').value = "";
		} else if (selDisplay==='vid') {
			$('#vid').attr('src',urlText.value);
			globalVars.vid = urlText.value;
			document.getElementById('urlText').value = "";
		}
	});



})