const Librus = require('librus-api');
const fs = require('fs');
require('dotenv').config();

const wh = require('./webhook.js');

var LUCKY_NUMBER = '0';

function log(num) {
    let date = new Date().toLocaleDateString(process.env.locale);
    console.log(`[${date}] ${num}\n`);
    fs.appendFileSync('log.txt', `[${date}] ${num}`);
}

let client = new Librus();
client.authorize(process.env.librus_username, process.env.librus_password).then(async () => {
    let num = await client.info.getLuckyNumber();
    LUCKY_NUMBER = num;

    console.log('[*] lucky number:', num);
}).catch(() => {
    console.log('[!] failed to login into librus! check the credentials');
});

const sleep = ms => new Promise(r => setTimeout(r, ms));

let lastUpdate = 0;

async function update() {
    if(new Date().getTime() - lastUpdate < 1000*60*60) {
        return;
    }
    lastUpdate = new Date().getTime();
    
    try {
        await client.authorize(process.env.librus_username, process.env.librus_password);
        for(let i = 0; i < 40; i++) {
            let num = await client.info.getLuckyNumber();

            if(num == LUCKY_NUMBER) {
                process.stdout.write('.');
                await sleep(2000);
            } else {
                console.log('');
                log(num);
                wh.send(num);
                LUCKY_NUMBER = num;
                return;
            }
        }

        console.log('\n[!] the lucky number did not change');
    } catch(e) {
        console.error(e);
        console.log('\n[!!!] encountered an issue while updating the number - better luck next time!');
    } finally {
        updating = false;
    }
}

// sunday-thursday at approximately 18:00:00
setInterval(() => {
    let date = new Date();
    
    if(date.getMinutes() == 2 && date.getHours() == 18 && date.getDay() !== 5 && date.getDay() !== 6) {
        update();
    }
});