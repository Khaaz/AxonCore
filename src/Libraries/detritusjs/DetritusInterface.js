import LibraryInterface from '../definitions/LibraryInterface';

import * as HANDLERS from './handlers/index';

import DetritusEnums from './lib/DetritusEnums';

import DetritusClient from './lib/DetritusClient';
import DetritusUser from './lib/DetritusUser';
import DetritusMember from './lib/DetritusMember';
import DetritusMessage from './lib/DetritusMessage';
import DetritusChannel from './lib/DetritusChannel';
import DetritusGuild from './lib/DetritusGuild';
import DetritusResolver from './lib/DetritusResolver';

class DetritusInterface extends LibraryInterface {
    /**
     * @param {Client} botClient
     */
    constructor(botClient) {
        super(botClient, {
            User: DetritusUser,
            Member: DetritusMember,
            Message: DetritusMessage,
            Channel: DetritusChannel,
            Guild: DetritusGuild,
            Resolver: DetritusResolver,
        } );

        this.client = new DetritusClient(this);
        this.type = 0;
    }

    get enums() {
        return DetritusEnums;
    }

    get HANDLERS() {
        return HANDLERS;
    }

    onMessageCreate(func) {
        this.botClient.on(this.enums.EVENTS.MESSAGE_CREATE, ( { message } ) => {
            func(message);
        } );
    }

    onceReady(func) {
        this.botClient.once('gatewayReady', () => {
            func();
        } );
    }

    /**
     * @param {(msg: Message) => void}
     * @returns {({ message: Message }) => void}
     * @memberof DetritusInterface
     */
    getMessageCreate(func) {
        return ( { message } ) => func(message);
    }

    /**
     * @param {(msg: Message) => void}
     * @returns {({ differences, message: Message) => void}
     * @memberof DetritusInterface
     */
    getMessageUpdate(func) {
        return ( { differences, message } ) => func(differences, message);
    }

    /**
     * @param {(msg: Message) => void}
     * @returns {({ message: Message}) => void}
     * @memberof DetritusInterface
     */
    getMessageDelete(func) {
        return ( { message } ) => func(message);
    }
}

export default DetritusInterface;
