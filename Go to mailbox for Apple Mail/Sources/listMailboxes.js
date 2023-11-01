let app = Application('Mail')
app.strictPropertyScope = true;
app.strictCommandScope = true;

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
		"subtitle": accountName + "::" + pathArray.join("/")
	}

	alfredItems.push(entry);
}


let isAccount = function(mbx) {
	return mbx.properties().hasOwnProperty("emailAddresses");
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

for (var i = 0; i < app.accounts.length; i++) {
	let account = app.accounts[i];
	let accountName = account.name();
	for (aMailBox of topLevelMailboxes(account)) {
		walkSubMailboxes(aMailBox, accountName, []);
	}

}


// output ======================
JSON.stringify({items : alfredItems})