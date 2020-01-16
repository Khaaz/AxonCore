import LibraryInterface from '../definitions/LibraryInterface';

import * as HANDLERS from './handlers/index';

import ErisEnums from './lib/ErisEnums';

import ErisClient from './lib/ErisClient';
import ErisUser from './lib/ErisUser';
import ErisMember from './lib/ErisMember';
import ErisMessage from './lib/ErisMessage';
import ErisChannel from './lib/ErisChannel';
import ErisGuild from './lib/ErisGuild';

class ErisInterface extends LibraryInterface {
    constructor(botClient) {
        super(botClient, {
            User: ErisUser,
            Member: ErisMember,
            Message: ErisMessage,
            Channel: ErisChannel,
            Guild: ErisGuild,
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

    onMessageCreate(func) {
        this.botClient.on(this.enums.EVENTS.MESSAGE_CREATE, (msg) => {
            func(msg);
        } );
    }

    onceReady(func) {
        this.botClient.once(this.enums.EVENTS.READY, () => {
            func();
        } );
    }
}

export default ErisInterface;
