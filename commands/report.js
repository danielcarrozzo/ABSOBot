const Discord = require("discord.js");
const DiscordInterfaceUtilities = require("../utilities/dsiUtilities");
const { creator, defaultColor, channelComments, channelsLobbies } = require("../config.json");


report = async (msg, args, option) => {
    if(option===0){
        option = `wanted to tell admins`;
    }else if(option >= 1 && option <= channelsLobbies.length){
        option = ` commented from a lobby ${option}`;
    }
    let embed = new Discord.MessageEmbed()
        .setColor(defaultColor)
        .setDescription(args.join(" "))
        .setAuthor(`${msg.author.username} ${option}`, msg.author.avatarURL(), `https://discord.com/channels/@me/${msg.author}`)
        .setTimestamp(Date.now());
    await (await DiscordInterfaceUtilities.INSTANCE.getChannel(channelComments)).send(embed);
}

module.exports = {
    name: 'report',
    display: true,
    aliases: ["re"],
    cooldown: 5,
    description: "Report something to the admins",
    usage: ` <@${creator}> we love you`,
    warning: "All data are saved: time, sender, content,...",
    execute: async (msg, args) => report(msg, args, 0),
    report
}