jQuery(window).load(function () {
	
	var template = function(index, source){
		return '<div class="elem item'+index+'" style="background: url(' 
				+ source + ') no-repeat  center;background-size: contain;"></div>';
	}

	jQuery('.flex__item').each(function(i, item){
		item.innerHTML = template(i, item.childNodes[0].src);
	})

	jQuery('.flexslider').flexslider({
		slideshowSpeed: 5000,
		animation: 'fade',
		initDelay: 6000,
		easing: "linear",
	});
});