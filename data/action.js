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
	var val = txtNode.nodeValue;
	val = val.replace(/\bthe cloud\b/g, "my butt");
	val = val.replace(/\bThe cloud\b/g, "My butt");
	val = val.replace(/\bthe Cloud\b/g, "my Butt");
	val = val.replace(/\bThe Cloud\b/g, "My Butt");
	val = val.replace(/\bTHE CLOUD\b/g, "MY BUTT");
	val = val.replace(/cloud\b/g, "butt");
	val = val.replace(/Cloud\b/g, "Butt");
	val = val.replace(/CLOUD\b/g, "BUTT");
	txtNode.nodeValue = val;
}

self.port.on("c2b", function(txt) {
	walkDOM(document.body);
});
