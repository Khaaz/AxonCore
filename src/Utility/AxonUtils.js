'use strict';

import AxonError from '../Errors/AxonError';

/**
 * Utility Class for AxonCore
 * 
 * AxonClient Specific methods
 * Internal uses + external
 * All methods useful for internal uses or AxonClient specific
 *
 * @author KhaaZ
 * S
 * @class AxonUtils
 */
class AxonUtils {
    constructor() {
    }

    hasBotPerms(bot, channel) {

    }

    hasUserPerm(member) {
        
    }
    
    sendMessage(channel, content) {
        let botUser;
        if (channel.guild) {
            botUser = channel.guild.members.get(this.bot.user.id);
            if (!botUser.permission.has('sendMessages') ) { // check if bot has sendMessage perm in the channel.
                return Promise.resolve();
            }
        }
        if (content instanceof Object) {

            if (channel.guild && !botUser.permission.has('embedLinks') ) { // check if bot has embedPermission perm in the channel.
                return Promise.resolve();
            }

            if (content.embed.length > 6000) {
                throw new AxonError('[EMBED]: embed > 6000', this.module.label, this.label);
            }
            if (content.embed.description && content.embed.description.length > 2048) {
                throw new AxonError('[EMBED]: description > 2048', this.module.label, this.label);
            }
            if (content.embed.title && content.embed.title.length > 256) {
                throw new AxonError('[EMBED]: title > 256', this.module.label, this.label);
            }
            if (content.embed.author && content.embed.author.name && content.embed.author.name.length > 256) {
                throw new AxonError('[EMBED]: author > 256', this.module.label, this.label);
            }
            if (content.embed.footer && content.embed.footer.text && content.embed.footer.text.length > 2048) {
                throw new AxonError('[EMBED]: footer > 2048', this.module.label, this.label);
            }
            if (content.embed.fields) {
                if (content.embed.fields.length > 25) {
                    throw new AxonError('[EMBED]: fields > 25', this.module.label, this.label);
                }
                for (const field in content.embed.fields) {
                    if (field.name > 256 || field.value > 1024) {
                        throw new AxonError('[EMBED]: field: name > 256 ; value > 1024', this.module.label, this.label);
                    }
                }
            }
        } else {
            if (content.length > 2000) {
                throw new AxonError('[EMBED]: content > 2000', this.module.label, this.label);
            }
        }

        return channel.createMessage(content);
    }

    sendDM(channel) {

    }

    sendSuccess(channel) {

    }

    sendError(channel) {

    }

    error() {

    }
    
    isBotStaff() {

    }

    isServerAdmin() {

    }

    isServerMod() {

    }
}


export default new AxonUtils();
