function walkDOM(node) {
	// Thanks to T.J. Crowder for this function.  http://stackoverflow.com/questions/5904914/javascript-regex-to-replace-text-not-in-html-attributes/5904945#5904945
	var child, next;
	switch (node.nodeType) {
		case 1:
		case 9:
		case 11:
			child = node.firstChild;
			while (child) {
				next = child.nextSibling;
				walkDOM(child);
				child = next;
			}
			break;
		case 3:
			process(node);
			break;
	}
}

function process(txtNode) {
	var wordsToReplace = [
		"faggot", "STFU", "fuck you", "fuck", "whore", "moron", "you're a moron",
		"dick", "cock", "retarded", "you're fat", "bastard", "moronic", "QQ more",
		"jerk", "your mom", "yo mom", "yo mama", "your mama", "Hitler", "You're a Nazi",
		"Nazi", "fucking", "left-wing", "right-wing", "twits", "twit"
	];
	var groot = [
		"I AM GROOT", "I Am Groot", "I Am Groot!", "I AM GROOT!", "I Am Groot?"
	];
	var val = txtNode.nodeValue;
	for (var i = 0; i < wordsToReplace.length; ++i)
	{
		var regex = new RegExp('\\b' + wordsToReplace[i] + '\\b', 'gi');
		val = val.replace(regex, groot[i % groot.length]);
		
	}
	txtNode.nodeValue = val;
}

self.port.on("c2b", function(txt) {
	walkDOM(document.body);
});
