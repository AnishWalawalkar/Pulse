(function() { setTimeout(function() {
    
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
        if(request.action == "readPage"){

        var text = $(".postArticle p").text();
        chrome.runtime.sendMessage({data: text, action:"read"});
        console.log("ready");
        }
	if (request.action == "readAPI") {
	    console.log("api");
	}
    });
    
   }, 1000);

}());

