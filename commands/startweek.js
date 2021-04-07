module.exports = {
    name: 'startweek',
    aliases: [ "sw" ],
    cooldown: 5,
    description: "Start a new tournament week",
    permissionRequired: 0, // 0 All, 1 Mods, 2 Admins, 3 Server Owner, 4 Bot Admin, 5 Bot Owner
    checkArgs: (args) => !args.length,
    execute: async function(client, msg, args, utilities, postgreSQLClient) {//o run//TODO contorllo admin e tutto
        await utilities.query_runner(postgress, 'UPDATE Info SET CurrentWeek='+args[0]).then(async (res)=>{

        });
    }
}