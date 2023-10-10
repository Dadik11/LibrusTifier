const fs = require('fs');
const prompt = require('prompt-sync')();
const { exit } = require('process');

const languages = {'en': {}, 'pl': {}};
var selected = 'en';

function init() {
    Object.keys(languages).forEach((lang) => {
        var filename = `lang/${lang}.json`;
        var data = fs.readFileSync(filename, 'utf-8');

        languages[lang] = JSON.parse(data);
    });

    const langSettings = JSON.parse(fs.readFileSync('lang/lang.json', 'utf-8'));
    if(langSettings['selected']) {
        selected = langSettings['selected'];
        return;
    }

    console.log('Choose language / Wybierz język');
    console.log('1. English (en)');
    console.log('2. Polski (pl)');
    const ans = prompt('[pl/en] > ').toLowerCase();
    switch(ans) {
        case '1':
            selected = 'en';
        case 'en':
            selected = 'en';
            break;
        case '2':
            selected = 'pl';
        case 'pl':
            selected = 'pl';
            break;
        default:
            console.log('What? Type 1/2 or pl/en\nCo? Wpisz 1/2 lub pl/en');
            exit(-1);
    }
    langSettings['selected'] = selected;
    fs.writeFileSync('lang/lang.json', JSON.stringify(langSettings));
    okay('lang_saved');
}

function error(text) {
    console.log('[-]', get(text, arguments));
}
function info(text) {
    console.log('[*]', get(text, arguments));
}
function okay(text) {
    console.log('[+]', get(text, arguments));
}

function get(text, args) {
    var t = languages[selected][text];
    for(let i = 1; i < args.length; i++) {
        t = t.replace('{}', args[i]);
    }
    return t;
}

module.exports = { init, error, info, okay };