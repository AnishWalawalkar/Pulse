
$(document).ready(function() {
    var text = $(".postArticle p").text();
    chrome.runtime.sendMessage({data: text});
});


