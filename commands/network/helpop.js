const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class helpopCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'helpop', 
      group: 'network',
      memberName: 'helpop',
      description: "Provides a user's request"
    });
  }

  async run(message,args)
  {
    let requestargs = message.content.slice(prefix.length).split(/ + /); //MAIN ARGS
        let requestmessage = requestargs.join(" ").slice(7);
        if (!requestmessage) return message.channel.send({embed: new Discord.RichEmbed()
          .setDescription(":x: **Missing args**")
          .setColor("#FF4040")
          .addField("->", ".helpop [request]")});

            var requestembed = new Discord.RichEmbed()
            .setTitle('**Request | Information**')
            .setColor("#FF0000")
            .addField('**Request By**', `${message.author} with the ID: ${message.author.id}`)
            .addField('**User Request**', requestmessage)
            .addField('**Request Location**', message.channel)
            .addField('**Request Time**', message.createdAt)

            let logschannel = message.guild.channels.find(`name`, "🔧✧･ﾟระบบทุกอย่าง");
            if(!logschannel) return message.channel.send("Couldn't find the logs channel");

            message.delete(3000);
            logschannel.send(requestembed);

        message.reply('Thanks for your request. We will contact you within 24h')
  }
}

module.exports = helpopCommand
