$(document).ready(function (){ 

  // initialize link
	var a = document.createElement('a');
	a.id = "downloadLink";
	var container = document.getElementById('scrollingText');
	container.appendChild(a);

	var activateFunctions = [];
	var reverseFunctions = [];

  // reset input values back to default
	var selReset = function() {
    document.getElementById('imgOptions').style.display = 'none';
    document.getElementById('vidOptions').style.display = 'none';
    document.getElementById('textOptions').style.display = 'none';
    document.getElementById('figOptions').style.display = 'none';
    document.getElementById('imgUrl').value = '';
    document.getElementById('vidUrl').value = '';
    document.getElementById('figUrl').value = '';
    document.getElementById('sectionText').value = '';
    document.getElementById('submit').style.display = 'none';
    $("#selDisplay").val('choose').change();
	}

	var getNumSections = function() {
		var numSections = sections.querySelectorAll('.step').length;
		return numSections;
	}

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
	  } else if($('#selDisplay').val()==='fig') {
      $( "#figUrl" ).submit();
    } 
	  selReset();
    ////console.log(reverseFunctions) ////
    ////console.log(activateFunctions) //// 

    // var dragSection = document.querySelectorAll('#dragAndDrop section'); // drag and drop sections
    // [].forEach.call(dragSection, addDnDHandlers); 
	});

  // TEXT
	$("#scrollingText").on('submit', '#sectionText', function( event ) {
    if(getNumSections() > globalVars.json.textSections.length) { // fill empty section with content
      sections.lastElementChild.innerHTML = mmd(sectionText.value) + sections.lastElementChild.innerHTML;
    } else { // create new section of content
      activateFunctions.push( function() {});
      sections.innerHTML += "<section draggable='true' class='step'>" + mmd(sectionText.value) + "</section>"; 
    }
	  globalVars.json.textSections.push(mmd(sectionText.value));
	  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
		a.href = 'data:' + data;
		a.download = 'data.json';
		a.innerHTML = 'Download JSON';
    reverseFunctions = globalVars.reverse(globalVars.json);
    scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions
	});

  // IMAGE
	$("#scrollingText").on('submit', '#imgUrl', function( event ) {
		if($('input[id=selImgMain]').is(":checked")) {
			const imgParams = imgUrl.value;
			globalVars.addImg(imgParams);
			activateFunctions[getNumSections()] = function() {
				globalVars.addImg(imgParams);
			};
			var imgObj = {
				"activate": "img",
				"activateParams": imgParams,
				"startPos": getNumSections(),
			};
      sections.innerHTML += "<section draggable='true' class=\"step\"><img class='thumbnail' src=\"" + imgUrl.value + "\"></section>"; 
			globalVars.json.mediaSections.push(imgObj);
		} else {
			var imgHTML = "<img src=\"" + imgUrl.value + "\">";
      if(getNumSections() > globalVars.json.textSections.length) { // fill empty section with content
        sections.lastElementChild.innerHTML = imgHTML + sections.lastElementChild.innerHTML;
      } else { // create new section of content
        activateFunctions.push( function() {});
        sections.innerHTML += "<section draggable='true' class=\"step\">" + imgHTML + "</section>"; 
      }
		  globalVars.json.textSections.push(imgHTML);
		}
	  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
		a.href = 'data:' + data;
		a.download = 'data.json';
		a.innerHTML = 'Download JSON';
    reverseFunctions = globalVars.reverse(globalVars.json);
    scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions
	});

  // VIDEO
	$("#scrollingText").on('submit', '#vidUrl', function( event ) {
		if($('input[id=selVidMain]').is(":checked")) {
			const vidParams = vidUrl.value;
			globalVars.addVid(vidParams);
			activateFunctions[getNumSections()] = function() {
				globalVars.addVid(vidParams);
			};
			var vidObj = {
						"activate": "vid",
						"activateParams": vidParams,
						"startPos": getNumSections(),
			};
      sections.innerHTML += "<section draggable='true' class=\"step\"><img class='thumbnail' src='https://img.youtube.com/vi/" + vidUrl.value + "/default.jpg'></section>"; 
			globalVars.json.mediaSections.push(vidObj);
		} else {
			var vidHTML = "<iframe width='560' height='315' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen src='https://www.youtube.com/embed/" 
				+ vidUrl.value + "'></iframe>"
      if(getNumSections() > globalVars.json.textSections.length) { // fill empty section with content
        sections.lastElementChild.innerHTML = vidHTML + sections.lastElementChild.innerHTML;
      } else { // create new section of content
        activateFunctions.push( function() {});
        sections.innerHTML += "<section draggable='true' class=\"step\">" + vidHTML + "</section>"; 
      }
		  globalVars.json.textSections.push(vidHTML);
		}
	  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
		a.href = 'data:' + data;
		a.download = 'data.json';
		a.innerHTML = 'Download JSON';
    reverseFunctions = globalVars.reverse(globalVars.json);
    scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions
	});

  // FIGURE
  $("#scrollingText").on('submit', '#figUrl', function( event ) {
    const figParams = [figUrl.value, mmd(figText.value)];
    if($('input[id=selFigMain]').is(":checked")) {
      globalVars.addFig(figParams);
      activateFunctions[getNumSections()] = function() {
        globalVars.addFig(figParams);
      };
      var figObj = {
        "activate": "fig",
        "activateParams": figParams,
        "startPos": getNumSections(),
      };
      sections.innerHTML += "<section draggable='true' class=\"step\"><img class='thumbnail' src=\"" + figParams[0] + "\"></section>"; 
      globalVars.json.mediaSections.push(figObj);
    } else {
      var figHTML = "<img src=\"" + figParams[0] + "\">" + figParams[1];
      if(getNumSections() > globalVars.json.textSections.length) { // fill empty section with content
        sections.lastElementChild.innerHTML = figHTML + sections.lastElementChild.innerHTML;
      } else { // create new section of content
        activateFunctions.push( function() {});
        sections.innerHTML += "<section draggable='true' class=\"step\">" + figHTML + "</section>"; 
      }
      globalVars.json.textSections.push(figHTML);
    }
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
    a.href = 'data:' + data;
    a.download = 'data.json';
    a.innerHTML = 'Download JSON';
    reverseFunctions = globalVars.reverse(globalVars.json);
    scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions
    document.getElementById('figText').value = '';
  });


  // HIGLASS
  var getHg = function() {
    const thisViewConf = globalVars.hgv.exportAsViewConfString();
    sections.innerHTML += "<section draggable='true' class=\"step\"><img class='thumbnail' src='" + globalVars.hgv.getDataURI() +"'></section>" //// debug: currently blank image
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
        ////sections.innerHTML += "<section draggable='true' class=\"step\">" + mmd("content") +"</section>";
        globalVars.prevViewConf = thisViewConf;
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalVars.json));
        a.href = 'data:' + data;
        a.download = 'data.json';
        a.innerHTML = 'Download JSON';   
        reverseFunctions = globalVars.reverse(globalVars.json);
        scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, reverseFunctions); // enable scrolling functions   
      })
      .catch((err) => { console.error('Something did not work. Sorry', err); });
  }

	globalVars.addImg = function(url) {
    document.getElementById('fig').style.display = 'none';
		document.getElementById('img').style.display = 'block';
		document.getElementById('development-demo').style.display = 'none';
		document.getElementById('vid').style.display = 'none';
		img.innerHTML = "<img src=\"" + url + "\">";
	}

	globalVars.addVid = function(id) {
    document.getElementById('fig').style.display = 'none';
		document.getElementById('img').style.display = 'none';
		document.getElementById('development-demo').style.display = 'none';
		document.getElementById('vid').style.display = 'block';
    var url = 'https://www.youtube.com/embed/' + id;
		$('#vid').attr('src',url);
	}

  globalVars.addFig = function(arr) {
    document.getElementById('fig').style.display = 'block';
    document.getElementById('img').style.display = 'none';
    document.getElementById('development-demo').style.display = 'none';
    document.getElementById('vid').style.display = 'none';
    fig.innerHTML = "<img src=\"" + arr[0] + "\">" + arr[1];
  }

	globalVars.addHg = function() {
    document.getElementById('fig').style.display = 'none';
		document.getElementById('img').style.display = 'none';
		document.getElementById('development-demo').style.display = 'inline-block';
		document.getElementById('vid').style.display = 'none';
  }

});