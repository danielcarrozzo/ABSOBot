module.exports = {
  name: 'ping',
  aliases: [ "pong", "latency", "uptime" ],
  cooldown: 5,
  description: "Get the latency of the bot.",
  permissionRequired: 0, // 0 All, 1 Mods, 2 Admins, 3 Server Owner, 4 Bot Admin, 5 Bot Owner
  checkArgs: (args) => !args.length,
  execute: async function(msg, client) {//o run
    //Source: https://github.com/promise/countr/blob/master/commands/ping.js#L11-L42
    let botMsg = await msg.channel.send("〽️ Pinging");
    botMsg.edit({ embed: {
    title: "📶 Ping",
    description: [
      "**Server** (**from KraY's G14**): `" + (botMsg.createdAt - msg.createdAt) + "ms`",
      "**API**: `" + Math.round(client.ws.ping) + "ms`",
      "**Uptime**: `" + msToTime(client.uptime) + "`",
    ].join("\n"),
    color: /*config.color*/"#771177",
    footer: { text: "Requested by " + msg.author.tag, icon_url: msg.author.displayAvatarURL },
    timestamp: new Date()
    }}).catch(() => botMsg.edit("🆘 An unknown error occurred. Do I have permission? (Embed Links)"));
  }
}

function msToTime(ms){
  days = Math.floor(ms / 86400000); // 24*60*60*1000
  daysms = ms % 86400000; // 24*60*60*1000
  hours = Math.floor(daysms / 3600000); // 60*60*1000
  hoursms = ms % 3600000; // 60*60*1000
  minutes = Math.floor(hoursms / 60000); // 60*1000
  minutesms = ms % 60000; // 60*1000
  sec = Math.floor(minutesms / 1000);

  let str = "";
  if (days) str = str + days + "d";
  if (hours) str = str + hours + "h";
  if (minutes) str = str + minutes + "m";
  if (sec) str = str + sec + "s";

  return str;
}