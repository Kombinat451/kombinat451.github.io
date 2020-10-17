---
title: Signal without a smartphone
description: How to use Signal-Desktop on a Debian based Linux distribution without having a smartphone. This tutorial requires some knowledge about Linux.
date: 2020-10-08
---

## Overview

At the moment you can not use Signal officially without a smartphone. The reason
is that you need either the Android or iPhone app to register a Signal account.
With some inofficial workarounds or hacks there exist some ways to circument
this. But either way you still always need a phone number. In the following an
overview is given:

<dl>
  <dt>Official way</dt>
  <dd>

  Create the account by using the official smartphone apps (Android or iPhone)

  </dd>

  <dt>Signal-cli</dt>
  <dd>

  Use the commandline interface for libsignal-service-java for registering,
  contact list and group management. [ctrl.alt.coop](https://ctrl.alt.coop/)
  wrote a nice tutorial which can be found
  [here](https://ctrl.alt.coop/en/post/signal-without-a-smartphone/).

  </dd>

  <dt>Standalone-Hack for Signal-Desktop<dt>
  <dd>

  In development mode Signal-Desktop offers a standalone mode for registering a
  Signal account with their staging servers. This functionality is deactivated
  in the official desktop clients, but can be reactivated through a hack. This
  approach may be a bit easier to follow than the *signal-cli* way.
  Unfortunately Signal-Desktop does not support proper contact list or group
  management.

  </dd>
</dl>


## Installation

In the following we give small overview how to alter Signal-Desktop for Debian
based Linux destributions, so you're able to use it as a standalone application
to register your account. You won't have all the features the smartphone app
offers like UI support for altering your contact list or groups.

First we follow the [official way](https://signal.org/en/download) to actually
download and install Signal-Desktop:

```
$ curl -s https://updates.signal.org/desktop/apt/keys.asc | sudo apt-key add -
$ echo "deb [arch=amd64] https://updates.signal.org/desktop/apt xenial main" | sudo tee -a /etc/apt/sources.list.d/signal-xenial.list
$ sudo apt update && sudo apt install signal-desktop
```


## Patching

Signal-Desktop is mainly written in Javascript. Hence, you can alter the source
code of the application live. This means you can patch Signal-Desktop how you
like. The following work was done with
[v1.36.3](https://updates.signal.org/desktop/apt/pool/main/s/signal-desktop/signal-desktop_1.36.3_amd64.deb).
In case it does not work for more recent versions you can find an [archived
v1.36.3](https://web.archive.org/web/20201005144916/https://updates.signal.org/desktop/apt/pool/main/s/signal-desktop/signal-desktop_1.36.3_amd64.deb)
through the wayback machine of the internet archive.

<tabs>
<tab label="Monkeypatching">

First you need to have access to the Javascript console. For that open Developer Tools (Click in topbar *View > Toggle Developer Tools*) and then type in the following (without the '>'):

```
> window.getEnvironment = function() { return 'development' }
> window.owsDesktopApp.openStandalone()
```

After entering the last line, the standalone account creation view should
appear. Verify your number by entering it in the *Phone Number* form and then
click on *Send SMS*. With some delay you should receive a SMS with the
verification code. Type this code into the second form and create your account
by clicking on *Register*.  Only click once on each button. There is no
immediate visual feedback as the work is done in the background.

<asset-image alt="Standalone Registration View" src="signal-standalone.png"></asset-image>

When you finished succesfuly registering a Signal account, restart Signal to get rid of your code changes.

</tab>

<tab label="Permant patch">

An alternative to monkeypatching is to actually permanently get rid of the
development checks in the source itself.  With this you can later on
theoretically as well provide a new Signal-Desktop package.  Signal-Desktop
itself is an electron based web application. To enable standalone support again
in Signal-Desktop, we need to alter the source itself. Most of it is packed as
an asar archive: /opt/Signal/resources/app.asar. Thus firs we need to unpack
this:


```sh
$ sudo apt install npm
$ npm install asar
$ node_modules/.bin/asar extract /opt/Signal/resources/app.asar app
```

You can now browse through the application source in the app directory. Enabling
standalone support is fairly easy as you only need to deactivate some checks in
which the app verifies it is not in production mode used. For that the following
patch can be used:

```diff
$ cat << EOF > signal-desktop_standalone.patch
--- app/app/menu.js	2020-10-04 09:32:07.766306369 +0000
+++ app/app/menu.js	2020-10-04 09:30:46.838306979 +0000
@@ -190,7 +190,7 @@
     const fileMenu = template[0];
 
     // These are in reverse order, since we're prepending them one at a time
-    if (options.development) {
+    if (true || options.development) {
       fileMenu.submenu.unshift({
         label: messages.menuSetupAsStandalone.message,
         click: setupAsStandalone,
--- app/js/views/app_view.js	2020-10-04 09:32:50.914306044 +0000
+++ app/js/views/app_view.js	2020-10-04 09:30:46.822306979 +0000
@@ -80,7 +80,7 @@
       }
     },
     openStandalone() {
-      if (window.getEnvironment() !== 'production') {
+      if (true || window.getEnvironment() !== 'production') {
         window.addSetupMenuItems();
         this.resetViews();
         this.standaloneView = new Whisper.StandaloneRegistrationView();
EOF
```

To apply this patch and repack the application, you do the following:

```bash
$ patch -dapp -p1 < signal-desktop_standalone.patch
$ node_modules/.bin/asar pack app app.asar
$ sudo cp app.asar /opt/Signal/resources/app.asar
```

On first startup (before linking a device) you should now be able to set up
this device as standalone. For that click in the topbar on *File>Set Up as
Standalone Device*.

<asset-image alt="Standalone Registration View" src="signal-standalone.png"></asset-image>

First verify and then register your number. Only click once on each button. The
work is done in the background. After a succesfull registration you can safely
replace the app itself with the official versions as standalone support is not
needed anymore. This means in case of available updates you can safely install
them through `apt update`.

</tab>
</tabs>


## Maintenance

As we don't have a smartphone to alter contact lists or for group management,
we need to do this by hand. Unfortunately sometimes this means we have to do
this programmatically through the developer console:

#### Add a contact
1. Enter the number in the search bar (including country prefix like +1 or +49)
2. Click on "Start new conversation" below the search bar
3. Contact will appear in your contact after the first message is sent

#### (Re-)name a contact
1. Open Developer Tools (Click in topbar View > Toggle Developer Tools)
2. Click on Console and enter the following (replace <NUMBER> and <NAME> with
   the actual number of the contact you want to (re-) name and its new name:
   `ConversationController.get('<NUMBER>').set({'name':'<NAME>'});`

#### (Un)Block a contact
Open Developer Tools (Click in topbar View > Toggle Developer Tools) and enter the following (replace <NUMBER with the actual number of the contact):

```
> ConversationController.get('<NUMBER>').block();`
> ConversationController.get('<NUMBER>').unblock();`
```

#### Group management
Unfortunately there is no way to do so at the moment (see [Signal-Desktop/issues/1655](https://github.com/signalapp/Signal-Desktop/issues/1655)). You have to use the smartphone or signal-cli approach instead.
