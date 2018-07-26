// from Jim Vallandingham's scrollytelling with D3 code, with minor tweaks
// https://github.com/vlandham/scroll_demo/blob/gh-pages/js/sections.js
// (in particular, see lines 765-793)


function scrollerDisplay(container, stepClass, activateFunctions, reverseFunctions) {
  var lastIndex = -1
  var activeIndex = 0

  var scroll = scroller()
    .container(container)

  scroll(d3.selectAll('.' + stepClass))

  scroll.on('active', function(index) {

    activeIndex = index
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign)
    scrolledSections.forEach(function(i) {
      if(isScrollUp === false) {
        activateFunctions[i]() // doesn't matter if number of functions exceeds sections
      } else {
        reverseFunctions[i]()
      }
    })
    lastIndex = activeIndex

    d3.selectAll('.' + stepClass)
      .attr('class', function(d,i) {
          return (i == index) ? stepClass + ' highlighted-step' : stepClass
        })

  })

}
  
// detect whether user is scrolling up or scrolling down
var lastScrollTop = 0;
var isScrollUp = false;
$(window).scroll(function(event){
   var scrollTop = $(this).scrollTop();
   if (scrollTop > lastScrollTop){
       isScrollUp = false;
   }
   else if(scrollTop == lastScrollTop)
   {
     //do nothing 
     //In IE this is an important condition because there seems to be some instances where the last scrollTop is equal to the new one
   }
   else {
      isScrollUp = true;
   }
   lastScrollTop = scrollTop;
});