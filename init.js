const prompt = require('prompt-sync')();
const Librus = require('librus-api');
const fs = require('fs');

async function test(user, pass) {
    let c = new Librus();
    await c.authorize(user, pass);
    try {
        await c.info.getLuckyNumber();
        return true;
    } catch(e) {
        return false;
    }
}


async function main() {
    console.log('-=- LibrusTifier -=-\n');

    if(fs.existsSync('.env')) {
        console.log('[!] do you want to erase your old configuration?');
        let res = prompt('(Y/n) ');
        if(res.toLowerCase().startsWith('n')) {
            return;
        }
        fs.unlinkSync('.env');
    }

    console.log('Enter Librus Synergia ™ login');
    let username = prompt('> ');
    if(!username) return;
    console.log('Enter password');
    let password = prompt('> ');
    if(!password) return;

    console.log('Please wait...');
    let valid = await test(username, password);

    if(!valid) {
        console.log('[!] invalid credentials, do you wish to continue?');
        let res = prompt('(Y/n) ');
        if(res.toLowerCase().startsWith('n')) {
            return;
        }
    }

    console.log('Enter discord webhook URL');
    let url = prompt('> ');

    if(!url) return;

    let example = fs.readFileSync('.env.example', 'utf-8');
    example = example.replace('{username}', username).replace('{password}', password).replace('{url}', url);

    fs.writeFileSync('.env', example);

    console.log('\n[+] done! to start librustifier, run "npm run"');
}

main();
