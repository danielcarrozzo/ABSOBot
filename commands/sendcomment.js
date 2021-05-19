const dbUtilities = require("../utilities/dbUtilities");
const dsiUtilities = require("../utilities/dsiUtilities");
const { channelComments } =require("../config.json");

module.exports = {
    name: 'sendcomment',
    display: true,
    aliases: [ "sc" ],
    cooldown: 5,
    description: "Send a comment reguarding the server where you are",
    execute: async function(msg, args) {
        //take match stats
        msg.channel.send();
    }
}