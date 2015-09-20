window.onload = function() {
    console.log("loaded");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action:"readPage"})
    });
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
                    console.log(resp);
                    resp = JSON.parse(resp);
                });
                $.post('http://localhost:5000/language', {'data_to_analyze': request.data}, function(resp) {
                    console.log(resp);
                    resp = JSON.parse(resp);
                });
                $.post('http://localhost:5000/political', {'data_to_analyze': request.data}, function(resp) {
                    console.log(resp);
                    resp = JSON.parse(resp);
                });
                $.post('http://localhost:5000/text_tags', {'data_to_analyze': request.data}, function(resp) {
                    console.log(resp);
                    resp = JSON.parse(resp);
                });
        }
    });
};

