// Simple jQuery fix for glitchy, seizure-like behavior of IE/Edge when scrolling pages with parallax images
// Currently supports IE 11 and Edge

$(document).ready(function(){
	// Check for IE/Edge
	if(window.navigator.userAgent.indexOf('Trident') != -1 || window.navigator.userAgent.indexOf('Edge') != -1){

		var $html	= $('document, html, body'),
			$window = $(window),
			html	= document.querySelector('document, html, body');

		// Scroll handler
		var scroll_handle = function(e){
			// Stop mouswheel from scrolling
			e.preventDefault();

			// Capture current scrollTop()
			var $current_scroll_top = $window.scrollTop(),
				// Gets scroll direction, -120 for down, 120 for up
				delta 				= e.wheelDelta;

			// Hard coding this value seems to fix issue with trackpad scrolling
			delta > 0 ? delta = 120 : delta = -120;

			// Stop any running animations on element, and animate by negative delta
			// Setting $.stop(jumpToEnd=true) here seems to help if user scrolls very fast
			$html.stop(false, true).animate({
				scrollTop: $current_scroll_top + (-delta)
			}, 75);
		}

		// Not using $.on() for this. Will want to add support for IE 8-10
		// Could maybe use $.on() with older version of jQuery that supports IE8
		html.addEventListener('mousewheel', scroll_handle, false);
	}
});