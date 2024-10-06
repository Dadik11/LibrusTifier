# LibrusTifier 🔔
<img width=225 src="https://github.com/Dadik11/LibrusTifier/blob/main/.github/logo.png"> <br />
Is the lucky number enough to make one happy?

---

## Pretty much yeah.
1. Install [node.js](https://nodejs.org/en/download)
2. Download the code or clone the repo
3. Install dependencies `npm install`
4. Edit configuration files in `config/`
4. Run with `node .` or send a test webhook `node . test`

## Funny files in the `config` directory
<details>
<summary>app.js</summary>
<br />

```json
"librus_username": "username",
"librus_password": "password",
"port": 8080
```

**librus_username**: username (or alias) to your [librus](https://portal.librus.pl/rodzina) account <br />
**librus_password**: password <br />
**port**: port of the HTTP server. 99% of the time you won't need it, set to `0` to disable it (webhooks are going to be sent regardless) <br />
</details>

<details>
<summary>webhook.js</summary>
<br />

```json
"webhook_url": "URL",
    
"num_img": "https://cdn.dadik.lol/numerki/{NUM}.png",
"max_num": 45,
"thumbnail_img": "https://cdn.dadik.lol/numerki/live_reaction.png",
"footer_img": "https://cdn.dadik.lol/numerki/librus.png",
"color": "#00F45F",

"title": "Numer to {NUM}",

"field1": "A kiedy",
"field1_t": "Dzis! ({DATE})",

"custom": "http://127.0.0.1:8081/numerek?n={NUM}"
```

This graphic depicts it beautifully ✨ <br />
<img width=400 src="https://github.com/Dadik11/LibrusTifier/blob/main/.github/real.png"> <br />
A few words of explanation: <br />
**webhook_url**: link to the [discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) <br />
**num_img**: link to the big green center image <br />
**max_num**: if the lucky number is greater than this value, {NUM} will be set to 'error' (for `num_img`) <br />
**custom**: *if you don't know what does this do, set to `""`*. otherwise - besides the discord webhook, a custom GET request will be sent to the provided address <br />
<br />
[an example of files can be found here](https://cdn.dadik.lol/numerki/)

</details>

## Something doesn't work :(
Sad :( <br />
Open a new issue 🙏 <br />
Paste in everything you can and i'll try to fix it ❤️