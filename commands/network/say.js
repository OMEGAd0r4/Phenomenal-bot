const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class sayCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'say', 
      group: 'network',
      memberName: 'say',
      description: "Announces a message in #announcements"
    });
  }

  async run (message, args)
  {
    let announcementargs = message.content.slice(prefix.length).split(/ + /); //MAIN ARGS
    let announcementmessage = announcementargs.join(" ").slice(9);

    var supportteamrole = message.guild.roles.find(`name`, ":robot: | Staff");
    if (!message.member.roles.has(supportteamrole.id)) return message.channel.send("Insufficient permission. You do not have permission to announce messages")

    var announcementmessageembed = new Discord.RichEmbed()
    .setTitle("**Phenomenal | Announcement**")
    .setColor("#FFDF00")
    .addField("**__Announcement__**", `${announcementmessage}`)
    .setTimestamp()

    message.channel.send(announcementmessageembed);
    message.channel.send("@everyone @here");
  }
}

module.exports = sayCommand;
