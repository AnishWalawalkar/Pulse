/* global chrome */
/* global $ */
window.onload = function() {
    console.log("loaded");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action:"readPage"})
    });
	var ctx = document.getElementById("chart-area").getContext("2d");
				window.myPie = new Chart(ctx).Pie(pieData);
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

var pieData = [
				{
					value: 300,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Red"
				},
				{
					value: 50,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Green"
				},
				{
					value: 100,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Yellow"
				},
				{
					value: 40,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "Grey"
				},
				{
					value: 120,
					color: "#4D5360",
					highlight: "#616774",
					label: "Dark Grey"
				}
			];
