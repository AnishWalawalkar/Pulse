function highlight(container, set, spanClass) {
    var content = container.innerText;
    content = content.split(/[ ,.'’]+/);
    for (i = 0; i < content.length; i++) {
	var lowerCaseWord = content[i].toLowerCase();
	if (set.has(lowerCaseWord)) {
	    content[i] = "<span class='" + spanClass + "' style='font-weight:bold'>" + content[i] + "</span>";
	}
    }
    container.innerHTML = content.join(" ");
}


console.log("TEST RUN");
	(function() {
			setTimeout(function() {

				chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
					if (request.action == "readPage") {
						console.log("readPage");
						var text = $(".postArticle p").text();
						chrome.runtime.sendMessage({
							data: text,
							action: "read"
						});
						console.log("ready");
					}
					if (request.action == "readKeywords") {
						console.log("readKeywords");
						var keywordSet = new Set(request.keywords);
						var paragraphs = $(".postArticle-content p");
						for (j = 0; j < paragraphs.length; j++) {
							highlight(paragraphs[j], keywordSet, "highlight");
						}
					}
					if (request.action == "writePage") {
						console.log("writePage");
						var text = $(".section--body p").text();
						console.log(text);
						chrome.runtime.sendMessage({
							data: text,
							action: "write"
						});
						console.log("ready");
					}
					if (request.action == "writeKeywords") {
						console.log("writeKeywords");
						var keywordSet = new Set(request.keywords);
						var paragraphs = $(".section-inner p");
						for (j = 0; j < paragraphs.length; j++) {
							highlight(paragraphs[j], keywordSet, "highlight");
						}
					}
				});

			}, 1000);

	})();

