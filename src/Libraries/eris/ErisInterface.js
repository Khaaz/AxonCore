import LibraryInterface from '../definitions/LibraryInterface';

import * as HANDLERS from './handlers/index';

import ErisEnums from './lib/ErisEnums';

import ErisClient from './lib/ErisClient';
import ErisUser from './lib/ErisUser';
import ErisMember from './lib/ErisMember';
import ErisMessage from './lib/ErisMessage';
import ErisChannel from './lib/ErisChannel';
import ErisGuild from './lib/ErisGuild';
import ErisResolver from './lib/ErisResolver';

/**
 * @typedef {import('eris').Client} Client
 * @typedef {import('eris').Message} Message
 */

class ErisInterface extends LibraryInterface {
    /**
     * @param {Client} botClient
     */
    constructor(botClient) {
        super(botClient, {
            User: ErisUser,
            Member: ErisMember,
            Message: ErisMessage,
            Channel: ErisChannel,
            Guild: ErisGuild,
            Resolver: ErisResolver,
        } );

        this.client = new ErisClient(this);
        this.type = 0;
    }

    get enums() {
        return ErisEnums;
    }

    get HANDLERS() {
        return HANDLERS;
    }

    /**
     * @param {(msg: Message) => void} func
     * @returns {void}
     * @memberof ErisInterface
     */
    onMessageCreate(func) {
        this.botClient.on(this.enums.EVENTS.MESSAGE_CREATE, (msg) => {
            func(msg);
        } );
    }

    /**
     * @param {() => void} func
     * @returns {void}
     * @memberof ErisInterface
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
        return (msg, oldMsg) => func(oldMsg, msg);
    }

    getMessageDelete(func) {
        return (msg) => func(msg);
    }
}

export default ErisInterface;
