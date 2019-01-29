const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class banCommand extends commando.Command {
    constructor(client) 
    {
      super(client, {
        name: 'ban', 
        group: 'network',
        memberName: 'ban',
        description: "bans a person from the network"
      });
    }

    async run(message, args)
    {
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("You do not have the permission to kick people");
    if(bUser.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "🔧✧･ﾟระบบทุกอย่าง");
    if(!incidentchannel) return message.channel.send("Can't find logs channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
    }
}


module.exports = banCommand;
