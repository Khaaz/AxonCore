'use strict';

/**
 * Message Handler class
 * Handles message event
 *
 * @author KhaaZ
 *
 * @class MessageHandler
 */

class MessageHandler {
    constructor(axon) {
        this._axon = axon;
    }

    get axon() {
        return this._axon;
    }

    get client() {
        return this._axon.client;
    }

    /**
     * Handler when a message is created.
     * Do all test and then either:
     *   - call execDm
     *   - call execAdmin
     *   - call execCommand
     *   - return (do nothing)
     *
     * @async
     * @param {Object<Message>} msg - The message object
     * @memberof AxonClient
     */
    async _onMessageCreate(msg) {
        if (!this.client.ready) {
            return;
        }

        /** msg.author error + ignore self + ignore bots */
        if (!msg.author || msg.author.bot) {
            return;
        }

        /** ignore cached blacklisted users */
        if (this.axon.blacklistedUsers.has(msg.author.id)) {
            return;
        }

        /** execDM if not in a guild */
        if (!msg.channel.guild) {
            return this._onDM(msg);
        }

        /** ignore cached blacklisted guilds */
        if (this.axon.blacklistedGuilds.has(msg.channel.guild.id)) {
            return;
        }

        msg.command = false;

        /**
         * Get guild Conf from cache or DB
         * Raise error eventually
         */
        let guildConf;
        try {
            guildConf = await this.axon.getGuildConf(msg.channel.guild.id);
        } catch (err) {
            return this.axon.Logger.error(err, { guild: msg.channel.guild });
        }

        /** Admin override */
        if (msg.content.startsWith(this.axon.params.ownerPrefix) && this.axon.AxonUtils.isBotOwner(msg.author.id)) { // Owner override everything
            return this._onAdmin(msg, guildConf, true);
        } else if (msg.content.startsWith(this.axon.params.adminPrefix) && this.axon.AxonUtils.isBotAdmin(msg.author.id)) { // ADMIN override everything except owner
            return this._onAdmin(msg, guildConf, false);
        }

        msg.content = msg.content.replace(/<@!/g, '<@'); // formatting mention

        /** Resolve prefix and proceed to command */
        const prefix = this.axon.resolvePrefix(msg);
        if (prefix) {
            msg.prefix = prefix;

            /** Check if the user/role/channel is ignored in the guild */
            if (this.axon.AxonUtils.isIgnored(msg, guildConf)) {
                return;
            }

            const args = msg.content.substring(msg.prefix.length).split(' ');
            const label = args.shift().toLowerCase();

            /** Call Help if first arg = 'help' */
            if (label === 'help') { // send Help message
                return this.axon._execHelp(msg, args, guildConf);
            }

            /** Resolve command (and subcommand if needed) - exec command if the command was resolved */
            const command = this.axon.resolveCommand(label, args, guildConf);
            if (!command) { // command doesn't exist or not globally enabled
                return;
            }

            msg.command = command;

            return this.axon._execCommand(msg, args, command, guildConf);
        }
    }

    /**
     * Executes a command with admin overrides.
     *
     * @param {Object<Message>} msg - Message Object
     * @param {Oject} guildConf - Guild config
     * @param {Boolean} isOwner - Whether the user is bot owner
     * @memberof AxonClient
     */
    _onAdmin(msg, guildConf, isOwner) {
        msg.prefix = this.axon.params.adminPrefix;

        const args = msg.content.replace(/<@!/g, '<@').substring(msg.prefix.length).split(' ');
        const label = args.shift().toLowerCase();

        /** Call Help if first arg = 'help' */
        if (label === 'help') { // send Help message
            return this.axon._execHelp(msg, args, guildConf);
        }

        /** Resolve command (and subcommand if needed) - exec command if the command was resolved */
        const command = this.axon.resolveCommand(label, args); // doesn't pass guildConf so it doesn't check for server disabled
        if (!command) { // command doesn't exist or not globally enabled
            return;
        }
        msg.command = command;

        return this.axon._execAdminCommand(msg, args, command, guildConf, isOwner);
    }

    /**
     * Executes a command in DM, has no guildConfig.
     *
     * @param {Object<Message>} msg
     * @memberof AxonClient
     */
    _onDM(msg) {
        msg.content = msg.content.replace(/<@!/g, '<@'); // formatting mention

        /** Resolve prefix (can only be default bot prefix) */
        const prefix = this.axon.resolvePrefix(msg);
        if (prefix) {
            msg.prefix = prefix;

            const args = msg.content.substring(msg.prefix.length).split(' ');
            const label = args.shift().toLowerCase();

            /** Call Help if first arg = 'help' */
            if (label === 'help') { // send Help message
                return this.axon._execHelp(msg, args);
            }

            /** Resolve command (and subcommand if needed) - exec command if the command was resolved */
            const command = this.axon.resolveCommand(label, args);
            if (!command) { // command doesn't exist or not globally enabled
                return;
            }
            msg.command = command;

            return this.axon._execCommand(msg, args, command, null);
        }
    }
}

export default MessageHandler;
