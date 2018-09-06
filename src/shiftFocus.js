/**
* When user inputs a text element to add to the main view, display the main view's text
* element, change its contents to the user-inputted text, and hide other elements
* @param {String} md - HTML of user-inputted text
*/
export function addText(md) {
  document.getElementById('text').style.display = 'block';
  document.getElementById('img').style.display = 'none';
  if (!$('#hg').hasClass('hidden')) {
    $('#hg').toggleClass('hidden');
  }
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'none';
  text.innerHTML = "<div class='mainText'>" + md + "</div>";
}

/**
* When user inputs an image element to add to the main view, display the main view's image
* element, change its contents to the user-inputted image, and hide other elements
* @param {String} arr - array containing the image URL and a caption
* If user does not enter a caption, caption will default to a blank string
*/
export function addImg(arr) {
  document.getElementById('text').style.display = 'none';
  if (!($('#hg').hasClass('hidden'))) {
    $('#hg').toggleClass('hidden');
  }
  document.getElementById('img').style.display = 'block';
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'none';
  img.innerHTML = "<img class='mainImg' src=\"" + arr[0] + "\">" + "<div class='caption'>" + arr[1] + "</div>";
}

/**
* When user inputs a Youtube video to add to the main view, display the main view's Youtube video
* element, change its contents to the user-inputted Youtube video, and hide other elements
* @param {String} arr - array containing the Youtube video URL and a caption
* If user does not enter a caption, caption will default to a blank string
*/
export function addYt(arr) {
  document.getElementById('text').style.display = 'none';
  document.getElementById('img').style.display = 'none';
  if (!$('#hg').hasClass('hidden')) {
    $('#hg').toggleClass('hidden');
  }
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'block';
  var url = 'https://www.youtube.com/embed/' + arr[0];
  $('#yt').attr('src',url);
  ytCaption.innerHTML = arr[1];
}

/**
* When user inputs a video element to add to the main view, display the main view's video
* element, change its contents to the user-inputted video, and hide other elements
* @param {String} arr - array containing the video URL and a caption
* If user does not enter a caption, caption will default to a blank string
*/
export function addVid(arr) {
  document.getElementById('text').style.display = 'none';
  document.getElementById('img').style.display = 'none';
  if (!$('#hg').hasClass('hidden')) {
    $('#hg').toggleClass('hidden');
  }
  document.getElementById('vidMedia').style.display = 'block';
  document.getElementById('ytMedia').style.display = 'none';
  $('#vid').attr('src',arr[0]);
  vidCaption.innerHTML = arr[1];
}

/**
* When user chooses to add a HiGlass view, display HiGlass and hide other elements
*/
export function addHg() {
  document.getElementById('text').style.display = 'none';
  document.getElementById('img').style.display = 'none';
  if ($('#hg').hasClass('hidden')) {
    $('#hg').toggleClass('hidden');
  }
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'none';
}