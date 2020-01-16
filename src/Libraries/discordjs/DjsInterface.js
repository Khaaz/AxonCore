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

class DjsInterface extends LibraryInterface {
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

export default DjsInterface;
