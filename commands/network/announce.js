const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class announceCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'announce', 
      group: 'network',
      memberName: 'announce',
      description: "Announces a message"
    });
  }

  async run (message, args)
  {
    let announcementargs = message.content.slice(prefix.length).split(/ + /); //MAIN ARGS
    let announcementmessage = announcementargs.join(" ").slice(9);

    var supportteamrole = message.guild.roles.find(`name`, ":robot: | Staff");
    if(!message.member.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send("You do not have the permission announce messages");

    var announcementmessageembed = new Discord.RichEmbed()
    .setTitle("**Phenomenal | Announcement**")
    .setColor("#FFDF00")
    .addField("**__Message__**", `${announcementmessage}`)
    .setTimestamp()

    message.channel.send(announcementmessageembed);
  }
}

module.exports = sayCommand;
