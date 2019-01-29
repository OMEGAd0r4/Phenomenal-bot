const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class kickCommand extends commando.Command {
    constructor(client) 
    {
      super(client, {
        name: 'kick', 
        group: 'network',
        memberName: 'kick',
        description: "Kicks a person from the network"
      });
    }

    async run(message, args)
    {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("You do not have the permission to kick people");
    if(kUser.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "logs");
    if(!kickChannel) return message.channel.send("Can't find logs channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
    }
}


module.exports = kickCommand;
