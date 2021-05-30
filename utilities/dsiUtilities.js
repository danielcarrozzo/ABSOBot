const { channelsLobbies, rolesLobbies } = require("../config.json");

class DiscordInterfaceUtilities {
    static _instance;

    client;

    //dsi_utilities(){}

    static get INSTANCE() {
        if (!DiscordInterfaceUtilities._instance) {
            DiscordInterfaceUtilities._instance = new DiscordInterfaceUtilities();
        }
        return DiscordInterfaceUtilities._instance;
    }

    setClient = client => this.client = client;

    getUser = async discordUserId => await this.client.users.fetch(discordUserId);// msg.guild.members.

    getRole = async (guild, discordRoleId) => await guild.roles.fetch(discordRoleId);// msg.guild.members, msg.guild.roles.cache.find(r => r.id === lobbyData.alpha);

    getMember = async (guild, discordUserId) => await guild.members.fetch(discordUserId);

    getChannel = async (discordChannelId) => await this.client.channels.fetch(discordChannelId);

    getGuild = async discordServerId => await this.client.guilds.fetch(discordServerId);

    deleteMessage =
        (msg) => {
            msg.delete().catch(error => {// Only log the error if it is not an Unknown Message error
                if (error.code !== 10008/*Discord.Constants.APIErrors.UNKNOWN_MESSAGE */) {
                    console.error('Failed to delete the msg: ', error);
                }
            });
        }


    getLobbyData = lobby => {
            return {channel: channelsLobbies[lobby-1], alpha: rolesLobbies[lobby-1].alpha, beta:rolesLobbies[lobby-1].beta};
        }

    getLobbyId = channelId => channelsLobbies.findIndex(c => c===channelId)+1;

}


module.exports=DiscordInterfaceUtilities;