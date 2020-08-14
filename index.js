const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = ';';
const reactEmoji = '🤍';

client.on('ready', () => {
    console.log('Miracles online.');
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot)
        return;
    
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // ;carry boss, day, time, am/pm, timezone, slots
    if (command === 'carry') {

        if (args.length > 5) {

            var mess = '<@' + msg.author + '> is carrying __**' + args[0].charAt(0).toUpperCase() + args[0].slice(1) + '**__ on __**' + args[1] + ' ' + args[2] + ' ' + args[3].toUpperCase() + ' (' + args[4].toUpperCase() + ')**__'
                    + '\nThe party will be meeting at CH20 Root Abyss'
                    + '\n__**' + args[5] + '**__ slots are available in the party.'
                    + '\n**Reminder that we will be checking for contribution, please only react if you have the required amount.**'
                    + '\nReact to this message to reserve a spot.';
            var i = 0;
            var max = args[5]
            var list = new Array();
            var waitlist = 0;

            msg.channel
                .send({embed: { color: 0x000000, description: mess}})
                .then((messageReaction) => {
                    messageReaction.react(reactEmoji);
                    messageReaction.awaitReactions((args, user) => {
                        if (args._emoji.name === reactEmoji && !user.bot) {
                            if (i > max - 1 && !waitlist) {
                                mess = mess + '\n__Waitlist:__'
                                waitlist = 69;
                            } else if (i == 0)
                                mess = mess + '\n__Registered:__ '
                            if (!list.includes(user.username)) {
                                list[i] = user.username
                                console.log(user.username);
                                mess = mess + '\n' + ++i + '. <@' + user + '>'
                                messageReaction.edit({embed: {description: mess}});
                            }
                        }
                    });
                });

        }

    }

});

client.login(process.env.TOKEN);