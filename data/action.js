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
		"pain in the ass", "faggot", "STFU", "shut the fuck up", "fuck you", "fuck[a-z]*", "whore", "you're a moron",
		"suck dick", "dick[a-z]*", "suck cock", "cock", "retarded", "you're fat", "bastard", "moronic",
		"QQ more", "jerk", "your mom", "yo mom", "yo mama", "your mama", "Hitler", "You're a Nazi", "moron",
		"Nazi", "left-wing", "right-wing", "twits", "twit", "shit eater", "eat shit", "shit[a-z]*", "bitchy",
		"ass", "asshole", "[0-9]+ year old", "the gays", "you're gay", "shut up", "pissy", "bitch please",
		"alcoholic", "analphabet", "anarchist", "ass[a-z]*", "backwoodsman", "balls", "slimy bastard", "bastard",
		"son of a bitch", "bitch", "brainless", "brainy", "bum-fucker", "butt[a-z]", "cheater", "[a-z] fucker", "clit",
		"cock master", "cock up", "cockboy", "cockfucker", "cock", "country bumpkin", "creep", "cretin",
		"[a-z] sucker", "cunt", "egoist", "fake", "fanny", "freak", "hippie", "homo", "idiot", "ignoramus",
		"jack-ass", "lard face", "motherfucker", "oil dick", "pervert", "pig", "pirate", "pornofreak", "prick",
		"prolet", "queer", "querulant", "retard", "riff-raff", "sadist", "saprophyt", "satan", "shithead",
		"sleeze", "sleeze bag", "slimer", "beavis", "snob", "snot", "swindler", "swine", "thief", "varmit", "wanker",
		"weeze bag", "whore", "weirdo", "wino", "witch", "womanizer", "woody allen", "xxx watcher"
	];
	var groot = [
		"I AM GROOT", "I Am Groot", "I Am Groot!", "I AM GROOT!", "I Am Groot?"
	];
	var val = txtNode.nodeValue;

	// Things in capslock are probably rage as well.
	var caps = val.match(/[A-Z][A-Z]+/g);
	var count = caps? caps.length : 0;
	for (var j = 0; j < count; ++j)
	{
		var randIndex = Math.floor(Math.random() * groot.length);
		val = val.replace(/\b(?!AM|GROOT)[A-Z][A-Z]+\b/, groot[randIndex]);
	}

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
