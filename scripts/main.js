$(function(){


	var layer1 = $('.layer1');
	var layer2 = $('.layer2');
	var layer3 = $('.layer3');

	var slide1 = $('#slide1').offset().top;
	var slide2 = $('#slide2').offset().top;
	var slide3 = $('#slide3').offset().top;
	var slide4 = $('#slide4').offset().top;


	magnetic(true);

	$(window).bind('scroll', function(e){
		var scrollTop = $(window).scrollTop();
		layer1.css('top', (0 - (scrollTop * -0.1)) + 'px');
		layer2.css('background-position', '0px ' + (0 - (scrollTop * -0.35)) + 'px');
		layer3.css('background-position', '0px ' + (0 - (scrollTop * -0.15)) + 'px');
	})


	var colorPickers = $('.color-picker > li');
	var cart = $('.cart');
	colorPickers.hover(function(e){
		colorPickers.removeClass('action');
		$(this).addClass('action');
		var index = $(this).data('index');
		var position = 0;
		if (index == 1)	position = -264*0;
		else if(index == 2) position = -264*1;
		else if(index == 3) position = -264*2;
		else if(index == 4) position = -264*3;
		else if(index == 5) position = -264*4;
		else if(index == 6) position = -264*5;
		else if(index == 7) position = -264*6;
		else if(index == 8) position = -264*7;
		else if(index == 9) position = -264*8;
		else if(index == 10) position = -264*9;

		cart.css('background-position', '0px ' + position + 'px');



		$('.box-cart').stop().animate({left: 30*index}, 1000);
		$('.wheel-left').stop().animate({rotate:10*index}, 1000)
		$('.wheel-right').stop().animate({rotate:10*index}, 1000)
	})


	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
			$('html,body').animate({
				scrollTop: getScrollPosition(target.offset().top)
				}, 3000, 'easeInOutQuint');
			return false;
			}
		}
	});

	$('body').bind('mousewheel', function(a, b){
		$('html,body').stop(true);
	})



	var timer;
	var blockHandler = false;
	$(window).bind('scroll', setMagnetic);
	$(window).resize(setMagnetic);
	
	function setMagnetic(e){
		// if (blockHandler)	return;
		clearTimeout(timer);
		timer = setTimeout(magnetic, 2000);
	}

	function magnetic(blockAnimate){
		// blockHandler = true;
		// console.log(blockHandler + " blockHandler")
		var scroll = $(window).scrollTop();
		slide1dif = slide1 - scroll;
		slide2dif = slide2 - scroll;
		slide3dif = slide3 - scroll;
		slide4dif = slide4 - scroll;

		var s1 = Math.abs(getScrollPosition(slide1dif));
		var s2 = Math.abs(getScrollPosition(slide2dif));
		var s3 = Math.abs(getScrollPosition(slide3dif));
		var s4 = Math.abs(getScrollPosition(slide4dif));

		var min = Math.min(s1, s2, s3, s4);
		console.log(min + ' qqqqqqqqqqqqqqqqq')
		if (min <= 1)	return;
		if (s1 === min)	scrollTo(slide1, blockAnimate);
		else if (s2 === min)	scrollTo(slide2, blockAnimate);
		else if (s3 === min)	scrollTo(slide3, blockAnimate);
		else if (s4 === min)	scrollTo(slide4, blockAnimate);
	}

	function scrollTo(top, blockAnimate){
		console.log(top + " top " + getScrollPosition(top) )
		$('html,body').stop(true, false).animate({scrollTop: getScrollPosition(top)}, blockAnimate ? 0 : 1000, 'easeInOutQuint', function(e){
			// blockHandler = false;
			// console.log(blockAnimate + " blockAnimate")
		});
		$('header').stop(true, false).animate({top : getHeaderScrollPosition(getScrollPosition(top))}, blockAnimate ? 0 : 1000, 'easeInOutQuint');
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