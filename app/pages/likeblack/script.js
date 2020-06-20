$(document).ready(function() {
	$('.items a').fancybox({
		'padding'		: 0,
        'transitionIn'  : 'elastic',
        'transitionOut' : 'none',
        'overlayColor'  : '#000',
        'centerOnScroll': true
	});

	var $bigImg = $('.hero img');
	$('.thumbnails').on('click','.thumbnails a',function() {
		if( !($bigImg.attr('src') == $(this).attr('href')) ) {
			$bigImg.hide();
			$bigImg.attr('src',$(this).attr('href'));
			$bigImg.load(function() { 
				$bigImg.fadeIn(600);
			})
		}	
		return false;
	});

	$('#slides').slides({
		preload: true,
		preloadImage: 'images/loading.gif',
		play: 4000,
		pause: 2500,
		effect: 'fade',
		fadeSpeed: 800,
		crossfade: true
	});
});
