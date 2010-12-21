jQuery.fn.extend({
	centralize: function() {
		var children = this;
		var totalWidth = children.parent().width();
		
		children.parent().find('img').load(function() {
			var totalCount = children.length;
			var sumWidth = 0;
			children.each(function() {
				$(this).css('float', 'left');
				if($(this).outerWidth() > 0) {
					sumWidth += $(this).outerWidth();
				}
				console.log('outerWidth = ' + $(this).outerWidth());
			});

			var averageWidth = sumWidth / totalCount;

			var maxCountByLine = Math.floor(totalWidth / averageWidth);
			console.log('maxCountByLine = ' + maxCountByLine);
			var count = maxCountByLine < totalCount ? maxCountByLine : totalCount;
			console.log('count = ' + count);

			var marginLeft = Math.floor((totalWidth - (count * averageWidth)) / (count + 1));

			children.css('margin-left', marginLeft + 'px');
		}).each(function() {
			if(this.complete || ($.browser.msie && parseInt($.browser.version) == 6)) {
				$(this).trigger("load");
			}
		});
	}
});