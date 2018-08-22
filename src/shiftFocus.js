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

export function addHg() {
  document.getElementById('text').style.display = 'none';
  document.getElementById('img').style.display = 'none';
  if ($('#hg').hasClass('hidden')) {
    $('#hg').toggleClass('hidden');
  }
  document.getElementById('vidMedia').style.display = 'none';
  document.getElementById('ytMedia').style.display = 'none';
}