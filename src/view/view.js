import { openFile, openModal } from './loadJSON.js';
import { skipTo } from '../sectionTitles.js';

$(document).ready(function (){ 
  openModal();
  document.getElementById('submitJSON').addEventListener('click', openFile, false);
  skipTo();
})



