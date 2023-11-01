let app = Application('Mail')
app.strictPropertyScope = true;
app.strictCommandScope = true;

function run(argv) {
	let query = argv[0];

	let info = JSON.parse(query);
	let mailbox = app.accounts.byName(info.accountName).mailboxes.byName(info.pathArray.join("/"));
	app.messageViewers[0].selectedMailboxes = mailbox;

	return query;
}