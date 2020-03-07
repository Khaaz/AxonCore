import LibraryInterface from '../definitions/LibraryInterface';

import * as HANDLERS from './handlers/index';

import DjsEnums from './lib/DjsEnums';

import DjsClient from './lib/DjsClient';
import DjsUser from './lib/DjsUser';
import DjsMember from './lib/DjsMember';
import DjsMessage from './lib/DjsMessage';
import DjsChannel from './lib/DjsChannel';
import DjsGuild from './lib/DjsGuild';
import DjsResolver from './lib/DjsResolver';

/**
 * @typedef {import('discord.js').Client} Client
 * @typedef {import('discord.js').Message} Message
 */

class DjsInterface extends LibraryInterface {
    /**
     * @param {Client} botClient
     * @param {String} token
     * @memberof DjsInterface
     */
    constructor(botClient, token) {
        super(botClient, {
            User: DjsUser,
            Member: DjsMember,
            Message: DjsMessage,
            Channel: DjsChannel,
            Guild: DjsGuild,
            Resolver: DjsResolver,
        } );

        this.client = new DjsClient(this, token);
        this.type = 1;
    }

    get enums() {
        return DjsEnums;
    }

    get HANDLERS() {
        return HANDLERS;
    }

    /**
     * @param {(msg: Message) => void} func
     * @returns {void}
     * @memberof DjsInterface
     */
    onMessageCreate(func) {
        this.botClient.on(this.enums.EVENTS.MESSAGE_CREATE, (msg) => {
            func(msg);
        } );
    }

    /**
     * @param {() => void} func
     * @returns {void}
     * @memberof DjsInterface
     */
    onceReady(func) {
        this.botClient.once('ready', () => {
            func();
        } );
    }

    getMessageCreate(func) {
        return (msg) => func(msg);
    }

    getMessageUpdate(func) {
        return (oldMsg, msg) => func(oldMsg, msg);
    }

    getMessageDelete(func) {
        return (msg) => func(msg);
    }
}

export default DjsInterface;
