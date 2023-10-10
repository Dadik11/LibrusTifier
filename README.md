# LibrusTifier 🔔
##### English version of this README is avaliable [here](README_en.md) <br />
<img width=225 src="https://cdn.dadik.lol/librustifier/logo.png"> <br />
Czy szczęśliwy numerek wystarczy, aby uczynić człowieka szczęśliwym?

---

## Tak.
1. Zainstaluj [node.js](https://nodejs.org/en/download)
2. Pobierz kod lub sklonuj repo
3. Zainstaluj zależności `npm install`
4. Skonfiguruj pliki w folderze `config/`
4. Włącz program `node .` lub wyślij testowego webhooka `node . test`

## Śmieszne pliki w folderze config
<details>
<summary>app.js</summary>
<br />

```json
"librus_username": "username",
"librus_password": "password",
"port": 8080
```

**librus_username**: nazwa użytkownika (lub alias) konta na [librusie](https://portal.librus.pl/rodzina) <br />
**librus_password**: haslo <br />
**port**: port na którym będzie działać serwer. Raczej nie będziesz go potrzebował, więc ustaw wartość na `0` aby go całkowicie wyłączyć (webhook nadal będzie wysyłany) <br />
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

Przedstawia to pięknie ta grafika ✨ <br />
<img width=400 src="https://cdn.dadik.lol/librustifier/epic_explanation.png"> <br />
Kilka słów wyjaśnienia: <br />
**webhook_url**: link do [webhooka discord](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) <br />
**num_img**: link do dużych zielonych zdjęć <br />
**max_num**: jeśli numerek będzie większy od tej wartości, {NUM} będzię równy 'error' (tylko dla `num_img`) <br />
**custom**: jeśli nie będzie to ustawione na `""`, to customowe zapytanie GET zostanie wysłane dodatkowo na ten adres, *jeśli nie wiesz o co chodzi, ustaw na `""`* <br />
<br />
[przykład plików znajdziesz tutaj](https://cdn.dadik.lol/numerki/)

</details>

## Coś nie działa :(
Szkoda :( <br />
Otwórz nowy problem na github 🙏 <br />
Wklej wszystko co możesz a postaram się naprawić ❤️