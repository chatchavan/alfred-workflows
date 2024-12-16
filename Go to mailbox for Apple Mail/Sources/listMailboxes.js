ObjC.import("stdlib")

let app = Application('Mail')
app.strictPropertyScope = true;
app.strictCommandScope = true;

let cacheMinutes = $.NSProcessInfo.processInfo.environment.objectForKey("cacheMinutes").js  || 5 // environment variable set in Alfred (requires Alfred 5.5+)

let __ON_MY_MAC__ = "===RESERVED[On My Mac]===";

let selectedAction = $.NSProcessInfo.processInfo.environment.objectForKey("action").js

let alfredItems = [];

// helpers ======================

let addAlfredItem = function(mailbox, accountName, pathArray) {
	let mailboxName = mailbox.name();
	let entry = {
		"uid": (accountName + "\\" + mailboxName),
		"arg": JSON.stringify({
			"mailboxName": mailboxName,
			"accountName" : accountName, 
			"pathArray": pathArray
		}),
		"title": mailboxName,
		"subtitle": selectedAction + " " + accountName + "::" + pathArray.join("/")
	}

	alfredItems.push(entry);
}


let isAccountOld = function(mbx) {
	// In some mailboxes, mbx.properties() yileded an error "AppleEvent handler failed. (-10000)".
	return mbx.properties().hasOwnProperty("emailAddresses");
}


let isAccount = function(mbx) {
	try {
		mbx.container();
	} catch (err) {
		if (err.message == "Can't get object.") {
			return true;
		}
	}
	return false;
}



let topLevelMailboxes = function(account) {
	let mailboxes = account.mailboxes();
	let topLevel = [];
	for (mb of mailboxes) {
		let mbContainer = mb.container();
		
		if (isAccount(mbContainer)) {
			topLevel.push(mb);
		}
	}
	
	debugger;
	return topLevel;
}


let walkSubMailboxes = function(mailbox, accountName, pathArray) {

	var newPathArray = JSON.parse(JSON.stringify(pathArray));
	newPathArray.push(mailbox.name());
	
	addAlfredItem(mailbox, accountName, newPathArray);
	
	for (var j = 0; j < mailbox.mailboxes.length; j++) {
		let aSubMailbox = mailbox.mailboxes[j];
		walkSubMailboxes(aSubMailbox, accountName, newPathArray);
	}
}


// main ======================

// walk mailboxes contained by accounts
for (var i = 0; i < app.accounts.length; i++) {
	let account = app.accounts[i];
	let accountName = account.name();
	for (aMailBox of topLevelMailboxes(account)) {
		walkSubMailboxes(aMailBox, accountName, []);
	}

}

// walk mailboxes "On My Mac"
for (var i = 0; i < app.mailboxes.length; i++) {
	let mailbox = app.mailboxes[i];
	let mailboxName = mailbox.name();
	walkSubMailboxes(aMailBox, __ON_MY_MAC__, []);

}



// output ======================
JSON.stringify({
	items : alfredItems,
	cache: {seconds: cacheMinutes * 60},
})