//PLUGINS
const commando = require('discord.js-commando')
const Discord = require('discord.js');
const prefix = ".";
const bot = new commando.Client({
    commandPrefix: prefix
});
//PLUGINS

//BOT TOKEN
bot.login(process.env.token); 
//BOT TOKEN

//GETS THE BOT ONLINE
bot.on('ready',function(){
    console.log(`Bot is now online!, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity(`.help`, { type: 'WATCHING' });
});
//GETS THE BOT ONLINE

//WELCOME/LEAVE MESSAGE
bot.on('guildMemberAdd', (member) => {
    const welcomechannel = member.guild.channels.find('name', `:clap:✧･ﾟรายชื่อคนเข้าออก`);
    welcomechannel.send({embed: new Discord.RichEmbed()
        .setColor("#FF0000")
        .setTitle("**New Member**")
        .setDescription(`:warning:||**Welcome** ${member} to the **Phenomenal Network**.`)
        .setImage("https://cdn.discordapp.com/attachments/518367175174782983/539750406218055681/Phenomenal.jpg")
        .setTimestamp()});
})

//WELCOME/lEAVE MESSAGE

//REGISTRIES
bot.registry.registerGroup('network', 'Network');
bot.registry.registerCommandsIn(__dirname + "/commands");
bot.registry.registerDefaults();
//REGISTIES

global.servers = {};