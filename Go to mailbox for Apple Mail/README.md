Keyboard-only navigation to a folder in Apple Mail app
====
Author: Chat Wacharamanotham (chat.wacharamanotham@gmail.com)


Installation
---
* Requires [Alfred 5](https://alfred.app)
* Download the `.alfredworkflow` file. Double click it to install in Alfred App. 
* Specify the shortcut key in the first element of the workflow.


Usage
---

Change the current mailbox:
1. With the Apple Mail app in focus, press a shortcut key to show Alfred with a special search field
2. Type parts of the name of the folder to jump to and press enter
3. The frontmost window of the Mail app will show that folder.

Move the selected message to a mailbox:
1. Select message(s) in Apple Mail
2. Press a shortcut key to show Alfred with a special search field
3. Type parts of the name of the folder to jump to and press enter
4. The message will be moved to that mailboxes


Notes
---

Based on my knowledge of the Mail app scripting library, Apple Script doesn't have access to identify the current mailbox that is shown (or selected). 
This understanding is supported by [a note on a Shortcut](https://routinehub.co/shortcut/9086/).

