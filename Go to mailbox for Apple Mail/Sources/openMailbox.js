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
	
	app.messageViewers[0].selectedMailboxes = mailbox;

	return query;
}