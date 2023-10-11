const express = require('express');
const librus = require('librus-api');
const fs = require('fs');

const wh = require('./webhook.js');
const lang = require('./lang/lang.js');
lang.init();

if(process.argv[2] === 'test') {
  lang.info('webhook_test_send');
  wh.send(Math.floor(Math.random() * 50));
  return;
}

const config = JSON.parse(fs.readFileSync('config/app.json', 'utf-8'));

let client = new librus();
client.authorize(config['librus_username'], config['librus_password']).then(function () {
  client.info.getLuckyNumber().then(data => {
    LUCKY_NUMBER = data;
    lang.okay('number_info', data.toString());
  });
});

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/main.html');
});

app.get('/iframe', (req, res) => {
  res.sendFile(__dirname + '/public/iframe.html');
});

var LUCKY_NUMBER = '0';

app.get('/getnumber', (req, res) => {
  res.status(200).send(LUCKY_NUMBER.toString());
});


setInterval(function() {
  var date = new Date();
  if(date.getHours() == 18 && date.getMinutes() == 0 && date.getSeconds() == 25 && date.getDay() != 6 && date.getDay() != 5) {
    updatenum();
  }
}, 999);

function log(num) {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  var today = `[${day}/${month}/${year}]`;

  console.log(today + ' ' + num.toString());
  fs.appendFile('log.txt', today + " " + num.toString() + '\n', (err) => {
    if(err) throw err;
  });
}

function updatenum() {
  lang.info('number_refresh');

  let client = new librus();
  client.authorize(config['librus_username'], config['librus_password']).then(function () {
    client.info.getLuckyNumber().then(data => {
      lang.okay('number_info', data);
      log(data);
      wh.send(data);
      LUCKY_NUMBER = data;
    });
  })
}

if(config['port'] == 0) return;
app.listen(config['port'], () => {
  lang.okay('server_ok', config['port']);
});
