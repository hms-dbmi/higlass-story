$(document).ready(function (){ 

	$("#editCSS").click(function(){
        $("#cssModal").modal();
    });

	$(".modal-footer").on('click', '#submitCSS', function() {
	  $( "#selFont" ).submit();
	  $( "#selFontColor" ).submit();
	  $( "#selFontSize" ).submit();
	  $( "#selBgColor" ).submit();
	  var a = document.getElementById("downloadLink");
		var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
		a.href = 'data:' + data;
		a.download = 'data.json';
		a.innerHTML = 'Download JSON';
	});

	$(".modal-body").on('submit', '#selFont', function( event ) {
		document.getElementById('scrollingText').style.fontFamily = selFont.value;
		globalVars.json.fontFamily = selFont.value;
		event.preventDefault();
	});

	$(".modal-body").on('submit', '#selFontColor', function( event ) {
		document.getElementById('scrollingText').style.color = selFontColor.value;
		globalVars.json.fontColor = selFontColor.value;
		event.preventDefault();
	});

	$(".modal-body").on('submit', '#selFontSize', function( event ) {
		document.getElementById('scrollingText').style.fontSize = selFontSize.value/16 + "rem";
		globalVars.json.fontSize = selFontSize.value;
		event.preventDefault();
	});

	$(".modal-body").on('submit', '#selBgColor', function( event ) {
		document.body.style.backgroundColor = selBgColor.value;
		globalVars.json.bgColor = selBgColor.value;
		event.preventDefault();
	});

});