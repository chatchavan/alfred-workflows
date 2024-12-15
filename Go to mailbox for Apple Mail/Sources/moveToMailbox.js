let app = Application('Mail')
app.strictPropertyScope = true;
app.strictCommandScope = true;

let __ON_MY_MAC__ = "===RESERVED[On My Mac]===";

function run(argv) {
	let query = argv[0];

	let info = JSON.parse(query);

	let mailbox
	if (info.accountName == __ON_MY_MAC__) {
		mailbox = app.mailboxes.byName(info.pathArray.join("/"));
	} else {
		mailbox = app.accounts.byName(info.accountName).mailboxes.byName(info.pathArray.join("/"));
	}
	

	let messages = app.messageViewers[0].selectedMessages();
	for (var m of messages) {
		m.mailbox = mailbox
	}

	return query;
}