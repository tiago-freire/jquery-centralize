jQuery.fn.extend({
	centralize: function() {
		var children = this;
		var totalWidth = children.parent().width();
		
		children.load(function() {
			var totalCount = children.length;
			var sumWidth = 0;
			children.each(function() {
				$(this).css('float', 'left');
				sumWidth += $(this).outerWidth();
			});

			var averageWidth = sumWidth / totalCount;

			var maxCountByLine = Math.floor(totalWidth / averageWidth);
			var count = totalCount > maxCountByLine ? maxCountByLine : totalCount;

			var margin = Math.floor((totalWidth - (count * averageWidth)) / (count + 1));

			children.css('margin-left', margin + 'px');
		}).each(function() {
			if(this.complete || ($.browser.msie && parseInt($.browser.version) == 6)) {
				$(this).trigger("load");
			}
		});
	}
});