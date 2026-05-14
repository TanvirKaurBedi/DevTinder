What is domain registrar ?
The place from where u r purchasing domain name

What is cloudfare used for ?
Cloudflare acts like:

gatekeeper
bodyguard
speed booster
DNS manager

all together.

Why Cloudflare is connected to DNS

Because Cloudflare becomes the “traffic controller” for your domain.

Instead of DNS saying:

devtinder.com → your server IP

Cloudflare DNS says:

devtinder.com → Cloudflare IP

Then Cloudflare secretly knows your real server IP.

Easy real example

Suppose:

your backend server IP = 43.205.xx.xx
domain = devtinder.app

Without Cloudflare:

Browser → directly hits 43.205.xx.xx

With Cloudflare:

Browser → Cloudflare
Cloudflare → your server

=>purchase domain name from godaddy.com
=>signup on cloudfare and add a th domain name purchased (cloudfare is for managaing DNS of ur domain name ) , now it will give u new name servers that u have to put in godaddy
=>change the name servers in godaddy and point it to cloudfare
=> wait for sometime till your nameservers are updated
=>
