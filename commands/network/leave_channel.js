const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class leaveCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'leave', 
      group: 'network',
      memberName: 'leave',
      description: "leaves the voice channel"
    });
  }

  async run(message, args)
  {
    if (message.guild.voiceConnection)
    {
        message.guild.voiceConnection.disconnect();
    }
    else
    {
        message.channel.send("I am not in a voice channel to leave!")
    }
  }
}

module.exports = leaveCommand;
