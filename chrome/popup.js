/* global chrome */
/* global $ */
window.onload = function() {
    console.log("loaded");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	console.log(tabs);
    	if (tabs[0].url.indexOf("edit") != -1)
    	{
    		console.log("edit");
    		chrome.tabs.sendMessage(tabs[0].id, {action:"writePage"});	
    		console.log("after edit");
    	}
    	else
    	{
        	chrome.tabs.sendMessage(tabs[0].id, {action:"readPage"});	
    	}
    });
	var ctx = document.getElementById("chart-area").getContext("2d");
				window.myPie = new Chart(ctx).Pie(pieData);
    chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
            if(request.action == 'read') {
                console.log('here');
                $.post('http://localhost:5000/keywords', {'data_to_analyze': request.data}, function(resp) {
		          console.log(resp);
                    resp = JSON.parse(resp);
                    //populate popup
		    //send to contentjs
		    chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {action: "readKeywords", keywords: resp.keywords});
		    });
                });

                $.post('http://localhost:5000/sentiment', {'data_to_analyze': request.data}, function(resp) {
                    resp = JSON.parse(resp);
                    console.log(resp.sentiment);
                    img_src = "Img/emojis/" + resp.sentiment + ".png"
                    $('#sentiment').prepend('<img src = ' + img_src +' width="60" height="60">');
                });
                $.post('http://localhost:5000/language', {'data_to_analyze': request.data}, function(resp) {
                    resp = JSON.parse(resp);
                    $('#language').text(resp.language[0]);
                });
                $.post('http://localhost:5000/political', {'data_to_analyze': request.data}, function(resp) {
                    console.log(resp);
                    resp = JSON.parse(resp);
                });
                $.post('http://localhost:5000/text_tags', {'data_to_analyze': request.data}, function(resp) {
                    resp = JSON.parse(resp);
                    $('#text_tag1').text(resp.text_tags[0][0]);
                    $('#text_tag2').text(resp.text_tags[1][0]);
                    $('#text_tag3').text(resp.text_tags[2][0]);
                });
	        }

	        if(request.action == 'write') {
                console.log('there');
                $.post('http://localhost:5000/keywords', {'data_to_analyze': request.data}, function(resp) {
		          console.log(resp);
                    resp = JSON.parse(resp);
                    //populate popup
		    //send to contentjs
		    chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {action: "writeKeywords", keywords: resp.keywords});
		    });
                });

                $.post('http://localhost:5000/sentiment', {'data_to_analyze': request.data}, function(resp) {
                    resp = JSON.parse(resp);
                    console.log(resp.sentiment);
                    img_src = "Img/emojis/" + resp.sentiment + ".png"
                    $('#sentiment').prepend('<img src = ' + img_src +' width="60" height="60">');
                });
                $.post('http://localhost:5000/language', {'data_to_analyze': request.data}, function(resp) {
                    resp = JSON.parse(resp);
                    $('#language').text(resp.language[0]);
                });
                $.post('http://localhost:5000/political', {'data_to_analyze': request.data}, function(resp) {
                    console.log(resp);
                    resp = JSON.parse(resp);
                });
                $.post('http://localhost:5000/text_tags', {'data_to_analyze': request.data}, function(resp) {
                    resp = JSON.parse(resp);
                    $('#text_tag1').text(resp.text_tags[0][0]);
                    $('#text_tag2').text(resp.text_tags[1][0]);
                    $('#text_tag3').text(resp.text_tags[2][0]);
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
