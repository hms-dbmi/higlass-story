$(document).ready(function (){ 

  ////
  $(function () {
    var startPos = 0;
    var endPos = 0;
    $("#sections").sortable({
      onDrop: function  ($item, container, _super) {
        $item.removeClass(container.group.options.draggedClass).removeAttr("style");
        $("body").removeClass(container.group.options.bodyClass);
        endDrag = $item.index();
        sort(startDrag, endDrag);
      },
      onDragStart: function ($item, container, _super, event) {
        $item.css({
          height: $item.outerHeight(),
          width: $item.outerWidth()
        })
        $item.addClass(container.group.options.draggedClass);
        $("body").addClass(container.group.options.bodyClass);
        startDrag = $item.index();
      },
    });
  });

  var sort = function(startDrag, endDrag) { ////
    if(startDrag !== endDrag) {
      tempSections = [];
      for(var i=0; i<globalVars.json.textSections.length; i++) {
        if(i === endDrag) {
          if(i < startDrag) {
            tempSections.push(globalVars.json.textSections[startDrag]);
            tempSections.push(globalVars.json.textSections[i]);
          } else {
            tempSections.push(globalVars.json.textSections[i]);
            tempSections.push(globalVars.json.textSections[startDrag]);
          }
        } else {
          if(i !== startDrag) {
            tempSections.push(globalVars.json.textSections[i]);
          }
        }
      }
      globalVars.json.textSections = tempSections;

      var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
      a.href = 'data:' + data;
      a.download = 'data.json';
      a.innerHTML = '<i class="fas fa-download"></i>Download JSON';
      download.style.display = 'block';
    }
  }

  // initialize link
	var a = document.createElement('a');
  a.className = "btn btn-info";
	a.id = "downloadLink";
	var container = document.getElementById('download');
	container.appendChild(a);

	var activateFunctions = [];
	var reverseFunctions = [];

  // reset input values back to default
	var selReset = function() {
    document.getElementById('imgOptions').style.display = 'none';
    document.getElementById('vidOptions').style.display = 'none';
    document.getElementById('ytOptions').style.display = 'none';
    document.getElementById('textOptions').style.display = 'none';
    document.getElementById('imgUrl').value = '';
    document.getElementById('ytUrl').value = '';
    document.getElementById('vidUrl').value = '';
    document.getElementById('sectionText').value = '';
    document.getElementById('vidText').value = '';
    document.getElementById('imgText').value = '';
    document.getElementById('ytText').value = '';
    document.getElementById('submit').style.display = 'none';
    document.getElementById('cancel').style.display = 'none';
    $("#selDisplay").val('choose').change();
	}

	var getNumSections = function() {
		var numSections = sections.querySelectorAll('.step').length;
		return numSections;
	}

  $("#scrollingText").on('click', '#cancel', function() {
    selReset();
  });

  // Add to report
	$("#scrollingText").on('click', '#submit', function() {
		if($('#selDisplay').val()==='text') {
	  	$( "#sectionText" ).submit();  
	  } else if($('#selDisplay').val()==='hg') {
	  	globalVars.addHg();
      getHg();
	  } else if($('#selDisplay').val()==='img') {
	  	$( "#imgUrl" ).submit();
	  } else if($('#selDisplay').val()==='vid') {
	  	$( "#vidUrl" ).submit();
	  } else if($('#selDisplay').val()==='yt') {
      $( "#ytUrl" ).submit();
    } 
	  selReset();
	});

  // TEXT
	$("#scrollingText").on('submit', '#sectionText', function( event ) {
    const textParams = mmd(sectionText.value);
    if($('input[id=selTextMain]').is(":checked")) {
      globalVars.addText(textParams);
      activateFunctions[getNumSections()] = function() {
        globalVars.addText(textParams);
      };
      var textObj = {
        "activate": "text",
        "activateParams": textParams,
        "startPos": getNumSections(),
      }
      sections.innerHTML += "<li><section class=\"step\"><img class='thumbnail' src='https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Fast_text.png/330px-Fast_text.png'></section></li>"; 
      globalVars.json.mediaSections.push(textObj);
    } else {
      if(getNumSections() > globalVars.json.textSections.length) { // fill empty section with content
        sections.lastElementChild.lastElementChild.innerHTML = "<div class='inlineText'>" + textParams + "</div>" + sections.lastElementChild.lastElementChild.innerHTML;
      } else { // create new section of content
        activateFunctions.push( function() {});
        sections.innerHTML += "<li><section class='step'><div class='inlineText'>" + textParams + "</div></section></li>"; 
      }
      globalVars.json.textSections.push(textParams);
    }

	  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
		a.href = 'data:' + data;
		a.download = 'data.json';
		a.innerHTML = '<i class="fas fa-download"></i>Download JSON';
    download.style.display = 'block';
    reverseFunctions = globalVars.reverse(globalVars.json);
    scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions
	});

  // IMAGE
	$("#scrollingText").on('submit', '#imgUrl', function( event ) {
    const imgParams = [imgUrl.value, mmd(imgText.value)];
		if($('input[id=selImgMain]').is(":checked")) {
			globalVars.addImg(imgParams);
			activateFunctions[getNumSections()] = function() {
				globalVars.addImg(imgParams);
			};
			var imgObj = {
				"activate": "img",
				"activateParams": imgParams,
				"startPos": getNumSections(),
			};
      sections.innerHTML += "<li><section class=\"step\"><img class='thumbnail' src=\"" + imgUrl.value + "\"></section></li>"; 
			globalVars.json.mediaSections.push(imgObj);
		} else {
			var imgHTML = "<img class='inlineImg' src=\"" + imgUrl.value + "\">" + "<div class='caption'>" + imgParams[1] + "</div>";
      if(getNumSections() > globalVars.json.textSections.length) { // fill empty section with content
        sections.lastElementChild.lastElementChild.innerHTML = imgHTML + sections.lastElementChild.lastElementChild.innerHTML;
      } else { // create new section of content
        activateFunctions.push( function() {});
        sections.innerHTML += "<li><section class=\"step\">" + imgHTML + "</section></li>"; 
      }
		  globalVars.json.textSections.push(imgHTML);
		}
	  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
		a.href = 'data:' + data;
		a.download = 'data.json';
		a.innerHTML = '<i class="fas fa-download"></i>Download JSON';
    download.style.display = 'block';
    reverseFunctions = globalVars.reverse(globalVars.json);
    scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions
    document.getElementById('imgText').value = '';
	});

  // YOUTUBE VIDEO
	$("#scrollingText").on('submit', '#ytUrl', function( event ) {
    const ytParams = [ytUrl.value, mmd(ytText.value)];
		if($('input[id=selYtMain]').is(":checked")) {
			globalVars.addYt(ytParams);
			activateFunctions[getNumSections()] = function() {
				globalVars.addYt(ytParams);
			};
			var ytObj = {
						"activate": "yt",
						"activateParams": ytParams,
						"startPos": getNumSections(),
			};
      sections.innerHTML += "<li><section class=\"step\"><img class='thumbnail' src='https://img.youtube.com/vi/" + ytUrl.value + "/default.jpg'></section></li>"; 
			globalVars.json.mediaSections.push(ytObj);
		} else {
			var ytHTML = "<iframe class='inlineYt' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen src='https://www.youtube.com/embed/" 
				+ ytUrl.value + "'></iframe>" + "<div class='caption'>" + ytParams[1] + "</div>";
      if(getNumSections() > globalVars.json.textSections.length) { // fill empty section with content
        sections.lastElementChild.lastElementChild.innerHTML = ytHTML + sections.lastElementChild.lastElementChild.innerHTML;
      } else { // create new section of content
        activateFunctions.push( function() {});
        sections.innerHTML += "<li><section class=\"step\">" + ytHTML + "</section></li>"; 
      }
		  globalVars.json.textSections.push(ytHTML);
		}
	  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
		a.href = 'data:' + data;
		a.download = 'data.json';
		a.innerHTML = '<i class="fas fa-download"></i>Download JSON';
    download.style.display = 'block';
    reverseFunctions = globalVars.reverse(globalVars.json);
    scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions
    document.getElementById('ytText').value = '';
	});

  // VIDEO
  $("#scrollingText").on('submit', '#vidUrl', function( event ) {
    const vidParams = [vidUrl.value, mmd(vidText.value)];
    if($('input[id=selVidMain]').is(":checked")) {
      globalVars.addVid(vidParams);
      activateFunctions[getNumSections()] = function() {
        globalVars.addVid(vidParams);
      };
      var vidObj = {
            "activate": "vid",
            "activateParams": vidParams,
            "startPos": getNumSections(),
      };
      sections.innerHTML += "<li><section class=\"step\"><img class='thumbnail' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Video_-_The_Noun_Project.svg/512px-Video_-_The_Noun_Project.svg.png'></section></li>"; 
      globalVars.json.mediaSections.push(vidObj);
    } else {
      var vidHTML = "<video class='inlineVid' width='560' height='315' autoplay src='" + vidUrl.value + "' type='video/mp4'></video>" + "<div class='caption'>" + vidParams[1] + "</div>";
      if(getNumSections() > globalVars.json.textSections.length) { // fill empty section with content
        sections.lastElementChild.lastElementChild.innerHTML = vidHTML + sections.lastElementChild.lastElementChild.innerHTML;
      } else { // create new section of content
        activateFunctions.push( function() {});
        sections.innerHTML += "<li><section class=\"step\">" + vidHTML + "</section></li>"; 
      }
      globalVars.json.textSections.push(vidHTML);
    }
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
    a.href = 'data:' + data;
    a.download = 'data.json';
    a.innerHTML = '<i class="fas fa-download"></i>Download JSON';
    download.style.display = 'block';
    reverseFunctions = globalVars.reverse(globalVars.json);
    scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions
    document.getElementById('vidText').value = '';
  });

  // HIGLASS
  var getHg = function() {
    const thisViewConf = globalVars.hgv.exportAsViewConfString();
    sections.innerHTML += "<li><section class=\"step\"><img class='thumbnail' src='" + globalVars.hgv.getDataURI() +"'></section></li>" //// debug: currently blank image
    globalVars.hgv.shareViewConfigAsLink("http://higlass.io/api/v1/viewconfs")
      .then((sharedViewConfig) => {
        globalVars.viewConfUrls.push("http://higlass.io/api/v1/viewconfs/?d=" + sharedViewConfig.id);
        if(typeof globalVars.prevViewConf !== 'undefined') {
          const trans = globalVars.typeOfChange(globalVars.prevViewConf, thisViewConf, globalVars.viewConfUrls.slice(-1)[0]);
          var hgObj = {
            "activate": trans[0],
            "activateParams": trans[1],
            "startPos": getNumSections()-1,
          };
          globalVars.json.mediaSections.push(hgObj);
          switch(trans[0]) {
            case "reload":
              const loadParams = trans[1].url;
              activateFunctions[getNumSections()-1] = function() {
                globalVars.addHg();
                globalVars.loadViewConf(loadParams);
              };
              break;
            case "zoom":
              const zoomParams = trans[1];
              activateFunctions[getNumSections()-1] = function() {
                globalVars.addHg();
                for(var i=0; i<Object.keys(zoomParams).length; i++) {
                  globalVars.hgv.zoomTo(zoomParams[i][0], zoomParams[i][1], zoomParams[i][2], zoomParams[i][3], zoomParams[i][4], 0);
                }
              };
              break;
            default:
              activateFunctions[getNumSections()-1] = function() {
                globalVars.addHg();
              };
          }
        } else {
          const url = globalVars.viewConfUrls[0];
          globalVars.json.initialHg = url;
          var initialViewConf = JSON.parse(thisViewConf);
          activateFunctions[getNumSections()-1] = function() {
            globalVars.addHg();
            globalVars.loadViewConf(url);
          };
          var hgObj = {
            "activate": "reload",
            "activateParams": {},
            "startPos": getNumSections()-1,
          };
          hgObj.activateParams.url = url;
          for(var i=0; i<initialViewConf.views.length; i++) {
            hgObj.activateParams[i] = [initialViewConf.views[i].uid, initialViewConf.views[i].initialXDomain[0], initialViewConf.views[i].initialXDomain[1], 
            initialViewConf.views[i].initialYDomain[0], initialViewConf.views[i].initialYDomain[1]];
          }
          globalVars.json.mediaSections.push(hgObj);
        }
        globalVars.prevViewConf = thisViewConf;
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
        a.href = 'data:' + data;
        a.download = 'data.json';
        a.innerHTML = '<i class="fas fa-download"></i>Download JSON';  
        download.style.display = 'block';
        reverseFunctions = globalVars.reverse(globalVars.json);
        scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions   
      })
      .catch((err) => { console.error('Something did not work. Sorry', err); });
  }

  globalVars.addText = function(md) {
    document.getElementById('text').style.display = 'block';
    document.getElementById('img').style.display = 'none';
    document.getElementById('hg').style.display = 'none';
    document.getElementById('vidMedia').style.display = 'none';
    document.getElementById('ytMedia').style.display = 'none';
    text.innerHTML = "<div class='mainText'>" + md + "</div>";
  }

  globalVars.addImg = function(arr) {
    document.getElementById('text').style.display = 'none';
    document.getElementById('img').style.display = 'block';
    document.getElementById('hg').style.display = 'none';
    document.getElementById('vidMedia').style.display = 'none';
    document.getElementById('ytMedia').style.display = 'none';
    img.innerHTML = "<img class='mainImg' src=\"" + arr[0] + "\">" + "<div class='caption'>" + arr[1] + "</div>";
  }

  globalVars.addYt = function(arr) {
    document.getElementById('text').style.display = 'none';
    document.getElementById('img').style.display = 'none';
    document.getElementById('hg').style.display = 'none';
    document.getElementById('vidMedia').style.display = 'none';
    document.getElementById('ytMedia').style.display = 'block';
    var url = 'https://www.youtube.com/embed/' + arr[0];
    $('#yt').attr('src',url);
    ytCaption.innerHTML = arr[1];
  }

  globalVars.addVid = function(arr) {
    document.getElementById('text').style.display = 'none';
    document.getElementById('img').style.display = 'none';
    document.getElementById('hg').style.display = 'none';
    document.getElementById('vidMedia').style.display = 'block';
    document.getElementById('ytMedia').style.display = 'none';
    $('#vid').attr('src',arr[0]);
    vidCaption.innerHTML = arr[1];
  }

  globalVars.addHg = function() {
    document.getElementById('text').style.display = 'none';
    document.getElementById('img').style.display = 'none';
    document.getElementById('hg').style.display = 'inline-block';
    document.getElementById('vidMedia').style.display = 'none';
    document.getElementById('ytMedia').style.display = 'none';
  }

});