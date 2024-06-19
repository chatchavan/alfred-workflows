let app = Application('Mail')
app.strictPropertyScope = true;
app.strictCommandScope = true;

function run(argv) {
	let query = argv[0];

	let info = JSON.parse(query);
	let mailbox = app.accounts.byName(info.accountName).mailboxes.byName(info.pathArray.join("/"));
	

	let messages = app.messageViewers[0].selectedMessages();
	for (var m of messages) {
		m.mailbox = mailbox
	}

	return query;
}