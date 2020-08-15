const Discord = require('discord.js');
const carry = require('./handlers/carry.js');
const client = new Discord.Client();

const prefix = ';';

const fs = require('fs');
const { users } = require('./handlers/carry');
client.handlers = new Discord.Collection();

const handlerFiles = fs.readdirSync('./handlers/').filter(file => file.endsWith('.js'));
for (const file of handlerFiles) {
    const command = require(`./handlers/${file}`);
    client.handlers.set(command.name, command);
}

client.on('ready', () => {
    console.log('Test bot online.');
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (user.bot) return;
    if (reaction.message.author.bot && reaction.emoji.name === '🤍') {
        for (let i = 0; i < users.length; i++)
            if (users[i] == user) {
                users.splice(i, 1);
            }
        carry.updateList(users, reaction.message);
    }
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot)
        return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // ;carry boss, day, time, am/pm, timezone, slots
    if (command === 'carry') {
        client.handlers.get('carry').execute(msg, args);
    }

});

client.login(process.env.TOKEN);