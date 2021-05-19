const DatabaseUtilities = require("../utilities/dbUtilities");

module.exports = {
    name: 'startweek',
    display: false,
    aliases: [ "sw" ],
    cooldown: 5,
    description: "Start a new tournament week",
    permissionRequired: 0, // 0 All, 1 Mods, 2 Admins, 3 Server Owner, 4 Bot Admin, 5 Bot Owner
    checkArgs: (args) => !args.length,
    execute: async function(msg, args) {//o run//TODO controllo admin e tutto
        await DatabaseUtilities.INSTANCE.queryRunner(`UPDATE Info SET CurrentWeek=${args[0]}`).then(async (res)=>{

        });
    }
}