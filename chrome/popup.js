chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	$(document).body.innerHTML="text";
    });
