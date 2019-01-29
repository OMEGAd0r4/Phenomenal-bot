const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class ticketCommand extends commando.Command {
    constructor(client) 
    {
      super(client, {
        name: 'new', 
        group: 'network',
        memberName: 'new',
        description: "Creates a support ticket"
      });
    }
    async run(message, args)
    {
        let reasonargs = message.content.slice(prefix.length).split(/ + /); //MAIN ARGS
        let reason = reasonargs.join(" ").slice(4);
        if (!reason) return message.channel.send({embed: new Discord.RichEmbed()
            .setDescription(":x: **Missing args**")
            .setColor("#FF4040")
            .addField("->", ".new [subject]")});
            
        if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send("You already have a ticket open.");
        message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
            let role = message.guild.roles.find("name", "🤖|Staff");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                 SEND_MESSAGES: true,
                 READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: Your ticket has been created, ${c.name}.`);
            const embed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .addField(`Hey ${message.author.username}!, Your support ticket has been created, please explain the reason for this ticket and we will respond within 24h.`, `Thanks for your patience.`)
            .addField("**__Subject__**", reason)
            .setTimestamp();
            c.send({ embed: embed });
        }).catch(console.error);
        }
}

module.exports = ticketCommand;
