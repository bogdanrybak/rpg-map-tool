(function ($) {
	$.fn.rpgMapTool = function() {
		var container = this;

		container.prepend('<button class="rpg-add-marker">New player</button>');

		container.append('<img src="images/map.jpg">');
		
		var sprite = container.find('img');
		sprite.css({
			'position': 'absolute',
			'left': 0,
			'top': 0
		});

		var draggingMap = false;
		//mouse coordinates
		var mY, mX;

		sprite.mousedown(function(e) {
			e.preventDefault();
			draggingMap = true;

			mY = e.pageY;
			mX = e.pageX;
			console.log('container-click');
		});

		sprite.mouseup(function() {
			draggingMap = false;
		});

		container.mousemove(function(e) {
			if (draggingMap) {

				var newPositionY = sprite.position().top + e.pageY - mY;
				var newPositionX = sprite.position().left + e.pageX - mX;

				sprite.css({
					'top': newPositionY,
					'left': newPositionX
				});
			}

			container.find('.player-marker').each(function(){
				var element = $(this);
				if (element.data('dragging') == true) {
					element.css({
						'top': element.position().top + e.pageY - mY,
						'left': element.position().left + e.pageX - mX
					});
				}
			});

			mY = e.pageY;
			mX = e.pageX;
		});

		container.mousewheel(function(event, delta, deltaX, deltaY) {
    	var zoomIncrement = 200;
    	var zoomValue = (sprite.width() + zoomIncrement * delta) ;

    	sprite.width(zoomValue);

    	//center zoom action
    	sprite.css({
				'top': sprite.position().top - (zoomIncrement / 2) * delta,
				'left': sprite.position().left - (zoomIncrement / 2) * delta
			});
		});

		var markerButton =  container.find('.rpg-add-marker');

		//setup new marker
		markerButton.click(function() {
			addMarker();
		});

		function addMarker() {
			container.append('<div class="player-marker"></div>');

			container.find('.player-marker').last()
				.mousedown(function(e) {
					e.preventDefault();
					$(this).data('dragging', true);
				})
				.mouseup(function() {
					$(this).data('dragging', false);
				});
		}

		return this;
	};

}(jQuery));