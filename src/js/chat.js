$(document).ready(function() {
	var html = '<div id="chat-widget" style="display: none;"><div class="button"></div><div class="window"><ul class="list"></ul><div id="messenger-typing" class="typing">Поддержка печатает...</div><div class="tools"><textarea placeholder="Написать сообщение"></textarea><button class="btn-send"></button></div></div></div>';
	$('body').append(html);

	var $widget = $('#chat-widget');
	var $button = $widget.children('.button');
	var $window = $widget.children('.window');
	var $list = $window.children('ul');
	var $textarea = $window.children('.tools').children('textarea');
	var $send = $window.children('.tools').children('.btn-send');
	var $typing = $('#messenger-typing');

	$button.click(function() {
		$widget.toggleClass('opened');
		$textarea.trigger('input');
	});

	$textarea.attr('rows', 1);
	$textarea.on('input', function() {
		$(this).css('height', 'auto');
    	$(this).css('height', Math.min($(this)[0].scrollHeight, 68) + 'px');
	});
	$textarea.on('keydown', function(e) {
		if (e.keyCode === 13 && !e.shiftKey && !e.ctrlKey) {
			e.preventDefault();
		    $send.click();
		}
	});

	$send.click(function(e) {
		e.preventDefault();

		if ($textarea.val()) {
			var text = $textarea.val();
			var msg = document.createElement('li');
			var msg2 = document.createElement('li');
			var now = new Date();

			$(msg).addClass('msg my');
			$(msg).append('<div class="inr"><p></p></div><div class="ts"></div>');
			$(msg).find('p').html((text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2'));
			$(msg).find('.ts').text(('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2));

			$(msg2).addClass('msg support');
			$(msg2).append('<img src="assets/images/_manager.png" alt="" class="photo"><div class="inr"><p></p></div><div class="ts"></div>');
			$(msg2).find('p').html('<strong>Поддержка</strong>Здравствуйте! Мы уже решаем эту проблему.');
			$(msg2).find('.ts').text(('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2));

			$textarea.val('').css('height', 'auto');

			// FIXME DEMO
			$list.append(msg);
			$list.get(0).scrollTop = $list.get(0).scrollHeight;
			setTimeout(function() {
				$typing.stop().fadeIn(__animationSpeed);
				setTimeout(function() {
					$typing.stop().fadeOut(__animationSpeed, function() {
						$list.append(msg2);
						$list.get(0).scrollTop = $list.get(0).scrollHeight;
					});
				}, 1500);
			}, 1000);
		}
	});

	$widget.delay(1000).fadeIn(__animationSpeed);
});