$(function(){


	var layer1 = $('.layer1'),
		layer2 = $('.layer2'),
		layer3 = $('.layer3');

	var slide1 = $('#slide1').offset().top,
		slide2 = $('#slide2').offset().top,
		slide3 = $('#slide3').offset().top,
		slide4 = $('#slide4').offset().top;

	var wind = $(window),
		body = $('html,body'),
		header = $('header');

	// init state


	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
			body.animate({
				scrollTop: getScrollPosition(target.offset().top)
				}, 2800, 'easeInOutExpo');
			return false;
			}
		}
	});

	wind.bind('scroll', function(e){
		var scrollTop = wind.scrollTop();
		// layer1.css('top', (0 - (scrollTop * -0.1)) + 'px');
		// layer2.css('background-position', '0px ' + (0 - (scrollTop * -0.80)) + 'px');
		layer2.css('top', (scrollTop * 0.28) + 'px');
		// layer3.css('background-position', '0px ' + (0 - (scrollTop * -0.15)) + 'px');
	})

	magnetic(true);



//  init color picker
	var colorPickers = $('.color-picker > li'),
		cart = $('.cart'),
		colorPosition = [
			-264*0,
			-264*1,
			-264*2,
			-264*3,
			-264*4,
			-264*5,
			-264*6,
			-264*7,
			-264*8,
			-264*9
		]

	colorPickers.hover(function(e){
		colorPickers.removeClass('action');
		var index = $(this).addClass('action').data('index');
		cart.css('background-position', '0px ' + colorPosition[index] + 'px');

		$('.box-cart').stop().animate({left: 30*index}, 1000);
		$('.wheel-left').stop().animate({rotate:10*index}, 1000)
		$('.wheel-right').stop().animate({rotate:10*index}, 1000)
	})


	body.bind('mousewheel', function(a, b){
		body.stop(true);
	})



//  magnetic setup
	var timer;
		window.timeoutsprite = false;

	wind.bind('scroll', setMagnetic);
	wind.resize(setMagnetic);
	
	function setMagnetic(e){
		if (window.timeoutsprite)	return;
		clearTimeout(timer);
		timer = setTimeout(magnetic, 400);
	}

	function magnetic(blockAnimate){
		window.timeoutsprite = true;
		setTimeout('window.timeoutsprite = false', 500);
		var scroll = wind.scrollTop();
		slide1dif = slide1 - scroll;
		slide2dif = slide2 - scroll;
		slide3dif = slide3 - scroll;
		slide4dif = slide4 - scroll;

		var s1 = Math.abs(getScrollPosition(slide1dif));
		var s2 = Math.abs(getScrollPosition(slide2dif));
		var s3 = Math.abs(getScrollPosition(slide3dif));
		var s4 = Math.abs(getScrollPosition(slide4dif));

		var min = Math.min(s1, s2, s3, s4);
		if (min <= 1)	return;
		if (s1 === min)	scrollTo(slide1, blockAnimate);
		else if (s2 === min)	scrollTo(slide2, blockAnimate);
		else if (s3 === min)	scrollTo(slide3, blockAnimate);
		else if (s4 === min)	scrollTo(slide4, blockAnimate);
	}

	function scrollTo(top, blockAnimate){
		console.log(top + " top " + getScrollPosition(top) )
		body.stop(true, false).animate({scrollTop: getScrollPosition(top)}, blockAnimate ? 0 : 2800, 'easeInOutExpo');
		header.stop(true, false).animate({top : getHeaderScrollPosition(getScrollPosition(top))}, blockAnimate ? 0 : 2800, 'easeInOutExpo');
	}

	function getHeaderScrollPosition(diffScroll){
		return isTop() ? 20 : (($(window).height() - 640) / 2) + 20 + (diffScroll < 0 ? diffScroll : 0);
	}

	function getScrollPosition(top){
		return isTop() ?	top : top - (($(window).height() - 640) / 2);
	}

	function isTop(){
		return $(window).height() < 640;	
	}

})