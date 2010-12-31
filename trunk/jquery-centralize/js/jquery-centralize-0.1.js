jQuery.fn.extend({
	centralize: function() {
		var children = $(this).children();
		var totalWidth = $(this).width();
		console.log('totalWidth = ' + totalWidth);
		var images = $(this).children('img');
		var countImagesLoaded = 0;
		var calculateMarginLeft = function(totalWidth, count, averageWidth) {
			return Math.floor((totalWidth - (count * averageWidth)) / (count + 1));
		}

		images.each(function() {
			jQuery(this).load(function() { countImagesLoaded++; });

			if(this.complete || (jQuery.browser.msie && parseInt(jQuery.browser.version) == 6)) {
				jQuery(this).trigger("load");
			}
		});

		if(countImagesLoaded == images.length) {
			var totalCount = 0;
			var sumWidth = 0;
			
			children.each(function() {
				var eachWidth = jQuery(this).outerWidth();
				console.log('jQuery(this).outerWidth() = ' + jQuery(this).outerWidth());
				if(eachWidth > 0) {
					jQuery(this).css('float', 'left');
					sumWidth += eachWidth;
					totalCount++;
				}
			});

			var averageWidth = sumWidth / totalCount;
			console.log('averageWidth = ' + averageWidth);

			var maxCountByLine = Math.floor(totalWidth / averageWidth);
			var count = maxCountByLine < totalCount ? maxCountByLine : totalCount;
			console.log('maxCountByLine = ' + maxCountByLine);
			console.log('totalCount = ' + totalCount);
			console.log('count = ' + count);

			var marginLeft = calculateMarginLeft(totalWidth, count, averageWidth);
			console.log('marginLeft = ' + marginLeft);
			var ratio = (totalWidth - (count * (marginLeft + averageWidth) + marginLeft)) / count;
			console.log('ratio = ' + ratio);
			if(ratio > 0 && ratio < 1) {
				marginLeft = calculateMarginLeft(totalWidth, --count, averageWidth);
				console.log('NEW marginLeft = ' + marginLeft);
			}
			
			var newProperties = {};
			newProperties['margin-left'] = marginLeft;
			if(maxCountByLine < totalCount) {
				newProperties['margin-top'] = marginLeft;
			} else {
				newProperties['margin-top'] = Math.floor(marginLeft / 5);
			}

			children.css(newProperties);
		}
	}
});