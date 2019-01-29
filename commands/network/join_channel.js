const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});
const YTDL = require('ytdl-core');

function Play(connection, message)
{
    var server = servers[message.guild.id];
    server.dipatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.push(args);
    server.queue.shift();
    server.dipatcher.on("end", function(){
        if(server.queue[0])
        {
            Play(connection, message);
        }
        else
        {
            connection.disconnect();
        }
    })
}

class joinCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'join', 
      group: 'network',
      memberName: 'join',
      description: "play a music"
    });
  }

  async run(message, args)
  {
      if (message.guild.voiceConnection)
      {
          if (!message.guild.voiceConnection)
          {
              if (!servers[message.guild.id])
              {
                  servers[message.guild.id] = {queue: []}
              }
              var server = servers[message.guild.id]
              message.member.voiceChannel.join()
              .then(connection => {
                  message.channel.send("Successfully joined the voice channel!");
                  Play(connection, message);
              })
          }
      }
  }
}

module.exports = joinCommand;
