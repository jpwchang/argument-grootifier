var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var enabled = true;

tabs.on("ready", cloudtobutt);

function cloudtobutt(tab) {
	if (enabled == true) {
		worker = tabs.activeTab.attach({
			contentScriptFile: self.data.url("action.js")
		});
		worker.port.emit("c2b", "");
	}
}

var widget = widgets.Widget({
	id: "c2b-main-button",
	label: "Cloud-to-Butt",
	contentURL: self.data.url("enabled.png"),
	onClick: function() {
		if (enabled == true) {
			enabled = false;
			this.contentURL = self.data.url("disabled.png");
			tabs.activeTab.reload();
		}
		else {
			enabled = true;
			this.contentURL = self.data.url("enabled.png");
			tabs.activeTab.reload()
		}
	}
});
