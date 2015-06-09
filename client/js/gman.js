var gmanController = function (socket) {
	this.$init.apply(this, arguments);
};

gmanController.prototype = {
	$init: function (socket) {
		this.socket = socket;
		this.ePressUpKey();
		this.ePressDownKey();
	},
	ePressUpKey: function () {
		$('#prev').on('click', function () {
			this.socket.emit('pushPrev', {key: 'prev'});
		}.bind(this));
	},
	ePressDownKey: function () {
		$('#next').on('click', function () {
			this.socket.emit('pushNext', {key: 'next'});
		}.bind(this));
	},
	sendMessage: function (key) {
		$.ajax({type: 'post', url: key});
	}
};

$(document).ready(function () {
	new gmanController(io());
	$('script').remove();
});