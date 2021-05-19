const DiscordInterfaceUtlities = require("../utilities/dsiUtilities");
const ExternalUtilities = require("../utilities/externalUtilities");

module.exports = {
  name: 'ping',
  display: true,
  aliases: [ "pong", "latency", "uptime" ],
  cooldown: 5,
  description: "Get the latency of the bot.",
  permissionRequired: 0, // 0 All, 1 Mods, 2 Admins, 3 Server Owner, 4 Bot Admin, 5 Bot Owner
  checkArgs: (args) => !args.length,
  execute: async function(msg) {//o run
    //Source: https://github.com/promise/countr/blob/master/commands/ping.js#L11-L42
    let botMsg = await msg.channel.send("〽️ Pinging");
    botMsg.edit({ embed: {
    title: "📶 Ping",
    description: [
      "**Server** (**from KraY's G14**): `" + (botMsg.createdAt - msg.createdAt) + "ms`",
      "**API**: `" + Math.round(DiscordInterfaceUtlities.INSTANCE.client.ws.ping) + "ms`",
      "**Uptime**: `" + ExternalUtilities.msToTime(DiscordInterfaceUtlities.INSTANCE.client.uptime) + "`",
    ].join("\n"),
    color: /*config.color*/"#771177",
    footer: { text: "Requested by " + msg.author.tag, icon_url: msg.author.displayAvatarURL },
    timestamp: new Date()
    }}).catch(() => botMsg.edit("🆘 An unknown error occurred. Do I have permission? (Embed Links)"));
  }
}