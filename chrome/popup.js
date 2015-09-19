window.onload = function() {
    console.log("loaded");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action:"readPage"})
    });
    chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
            if(request.action == 'read') {
                console.log('here');
                var socket = io.connect('http://127.0.0.1:5000');
                socket.on('connect', function(response) {
                socket.emit('event', {data: request.data});
             }); 
         }          
    });
};

