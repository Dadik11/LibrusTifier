const fs = require('fs');
const request = require('request');
const lang = require('./lang/lang.js');

const config = JSON.parse(fs.readFileSync('config/webhook.json', 'utf-8'));

const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(config['webhook_url']);

function date() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function send(data) {
    /* discord */
    const embed = new MessageBuilder()
    .setAuthor(config['title'].replaceAll('{NUM}', data.toString()))
    .setColor(config['color'])
    .setThumbnail(config['thumbnail_img'])
    .setImage(config['num_img'].replaceAll('{NUM}', (data <= config['max_num'] ? data.toString() : 'error')))
    .setFooter('NumerTifier', config['footer_img'])
    .setTimestamp();

    if(config['field1']) {
        embed.addField(config['field1'], config['field1_t'].replaceAll('{DATE}', date()));
    }

    hook.send(embed);
    lang.okay('dc_webhook_sent');

    /* custom */
    if(config['custom']) {
        request.get(config['custom'].replaceAll('{NUM}', data.toString()).replaceAll('localhost', '127.0.0.1'), {timeout: 3000}, (err, res, body) => {
            if (err) {
                lang.error('custom_webhook_error', config['custom'].replaceAll('{NUM}'));
                return;
            }
            lang.okay('custom_webhook_sent');
        });
    }
}

module.exports = { send };