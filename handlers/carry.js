const Discord = require('discord.js');

const reactEmoji = '🤍';

var users = new Array();
var max;
var send;

module.exports = {
    name: 'carry',
    description: 'set up a carry post',
    users: users,
    max: max,
    send: send,
    updateList: updateList,
    execute(msg, args) {

        msg.delete();

        if (args.length > 5) {

            var boss = args[0].charAt(0).toUpperCase() + args[0].slice(1);
            var date = args[1];
            var time = args[2];
            var ampm = args[3].toUpperCase();
            var tz = args[4].toUpperCase();
            max = args[5];

            send = '<@' + msg.author + '> is carrying __**' + boss + '**__ on __**' + date + ' ' + time + ' ' + ampm + ' (' + tz + ')**__'
                + '\nThe party will be meeting at CH20 Root Abyss'
                + '\n__**' + max + '**__ slots are available in the party.'
                + '\n**Reminder that we will be checking for contribution, please only react if you have the required amount.**'
                + '\nReact to this message to reserve a spot.';

            msg.channel
                .send({ embed: { color: 0x81D8D0, description: send } })
                .then((sentMessage) => {
                    sentMessage.react(reactEmoji);
                    sentMessage.awaitReactions((reaction, user) => {
                        if (reaction._emoji.name === reactEmoji && !user.bot) {
                            users.push(user);
                            updateList(users, sentMessage);
                        }
                    });
                });

        } else {

            msg.author.send({
                embed: {
                    color: 0x81D8D0, description: "Invalid arguments."
                        + "\nCorrect usage: ;carry [boss] [mm/dd] [xx:xx] [am/pm] [timezone] [slots]"
                }
            });

        }
    }
}

function updateList(users, sentMessage) {

    let newMessage = send;

    if (users.length <= max)
        newMessage += "\nRegistered (" + users.length + "/" + max + "):";
    else
        newMessage += "\nRegistered (" + max + "/" + max + "):";

    for (let i = 1; i <= users.length; i++) {

        if (i - 1 == max)
            newMessage += "\nWaitlist: ";

        newMessage += '\n' + i + ". <@" + users[i - 1] + ">";

    }

    sentMessage.edit({ embed: { color: 0x81D8D0, description: newMessage } });

}