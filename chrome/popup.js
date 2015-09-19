var socket = io.connect('http://localhost:5000');
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	socket.emit('event', {data: request.data};
    });
