$(document).ready(function() {
	var $window = $(window),
		windowHeight = $window.height(),
		$header = $('header'),
		$home = $('#home'),
		$starTop = $('#home .wrapper'),
		$homeh1 = $('#home h1'),
		$ufo = $('#ufo'),
		$about = $('#about'),
		$cloudTop = $('#cloudTop'),
		$human = $('#human'),
		$balloon = $('#human .wrapper'),
		$contact = $('#contact');
		
	$header.css({top:'-100px'});
	$homeh1.css({top:'200px'});
	$("body").queryLoader2({
    	barHeight: 2,
    	percentage: true,
    	onComplete: function() {
			$header.animate({top:'0'});
			$homeh1.animate({top:'0'});
   		}
    });
	
	$('nav').onePageNav();
	
	$('#altitude').show();
	
	$('#home, #about, #human').bind('inview', function (event, visible) {
		if (visible == true) {
			$(this).addClass("inview");
		} else {
			$(this).removeClass("inview");
		}
	});
	
	function newPos(x, windowHeight, pos, adjuster, inertia){
		return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
	}
	
	function Move() {
		var pos = $window.scrollTop();
		if($home.hasClass('inview')) {
			$starTop.css({backgroundPosition: newPos(50, 600, pos, 650, 0.15)});
			$homeh1.css({backgroundPosition: newPos(50, 600, pos, 1150, 0.7)});
			$ufo.css({backgroundPosition: (100 - (pos*0.04)) + "% " + (((windowHeight + pos) + 850) * 0.52)  + "px"});
		}
		if($about.hasClass('inview')) {
			$cloudTop.css({backgroundPosition: newPos(50, windowHeight, pos, 4200, 1)});
			
		}
		if($human.hasClass('inview')) {
			$balloon.css({backgroundPosition: newPos(100, windowHeight, pos, 5300, 0.7)});
		}
	
		$('#altitude span').html(59172-pos*9);
	}
	Move();
	$window.bind('resize scroll', function() {
		Move();
	});

	$('.fancybox img').after(function() {
		return '<div class="black" style="width: ' + $(this).width()+'px; height: ' + $(this).height() + 'px;"></div><div class="zoom" style="width: ' + $(this).width()+'px; height: ' + $(this).height() + 'px;"></div>'
	})
	$('.fancybox').fancybox();
	
});