const { WebhookClient, EmbedBuilder } = require('discord.js'); 
const fs = require('fs');
require('dotenv').config();

let names = fs.readFileSync('names.txt', 'utf-8').split('\n').map(line => line.trim()).filter(line => line.length > 3);
let namesMap = {};

names.forEach(line => {
    let [key, val] = line.split(':').map(i => i.trim());
    namesMap[key] = val;
});

try {
    var client = new WebhookClient({ 'url': process.env.discord_webhook_url });
} catch(e) {
    console.log('[!!!] invalid webhook url');
}


exports.send = (number) => {
    let date = new Date(new Date().getTime() + 1000*60*60*24); // number is valid 1 day after generation

    let style = Object.keys(process.env).filter(key => key.startsWith('wh_')).reduce((obj, key) => ({...obj, [key]: process.env[key]}), {});

    Object.keys(style).forEach(key => {
        style[key] = style[key]
            .replaceAll('{number}', number)
            .replaceAll('{valid}', date.toLocaleDateString(process.env.locale))
            .replaceAll('{generated}', new Date().toLocaleDateString(process.env.locale))
            .replaceAll('{name}', namesMap[number] ?? namesMap.unknown);
    });

    let embed = new EmbedBuilder()
        .setTitle(style.wh_title)
        .setImage(style.wh_image)
        .setColor(style.wh_color)
        .setFooter({'text': style.wh_footer})
        .setTimestamp()
    
    Object.keys(style).filter(key => key.startsWith('wh_field_')).forEach(field => {
        let idx = field.replace('wh_field_', '');
        let value = style['wh_value_' + idx] ?? ' ';

        embed.addFields([{'name': style[field], 'value': value !== '' ? value : ' ', 'inline': style['wh_fields_inline'] == 'true'}]);
    });

    client.send({embeds: [embed]}).then(() => {
        console.log('[+] webhook sent successfully');
    }).catch(e => {
        console.error(e);
        console.log('[!!!] encountered an issue while sending the webhook - double check the webhook styling in .env');
    });
}

if(require.main === module) {
    exports.send(String(Math.ceil(Math.random() * (names.length-1))));
}
