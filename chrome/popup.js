window.onload = function () {
var socket = io.connect('http://localhost:5000');
socket.on('connect', function() {
    console.log('here')
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
                console.log('here2')
        socket.emit('event', {data: 'I\'m connected!'});
        });
    }); 
};

 /*var socket = io.connect('http://localhost:5000');
        socket.on('connect', function() {
            socket.emit('event', {data: 'I\'m connected!'});
        });*/   
           
