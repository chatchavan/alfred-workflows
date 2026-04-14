ObjC.import("stdlib")
let app = Application.currentApplication();
app.includeStandardAdditions = true;


// process path
var myPath = $.getenv("cacheFilePath")
let absPath = ObjC.unwrap($(myPath).stringByExpandingTildeInPath)

 // load file
var thePath = Path(absPath.toString());
var contentText = app.read(thePath);
var content = JSON.parse(contentText);

// add the action into the subtitle
let __ON_MY_MAC__ = "===RESERVED[On My Mac]===";
let selectedAction = $.NSProcessInfo.processInfo.environment.objectForKey("action").js

for (var i = 0; i < content.items.length; i++) {
	let arg = JSON.parse(content.items[i].arg);
	let accountName = arg.accountName;
	let pathArray = arg.pathArray;
	content.items[i].subtitle = 
		selectedAction + " " + 
		(accountName == __ON_MY_MAC__ ? "On My Mac" : accountName ) +
		"::" + 
		pathArray.join("/")
}


// output for Alfred filter as JSON string
JSON.stringify(content)