import LibraryInterface from '../LibraryInterface';

import * as HANDLERS from './handlers/index';

import DjsEnums from './lib/DjsEnums';

import DjsClient from './lib/DjsClient';
import DjsUser from './lib/DjsUser';
import DjsMember from './lib/DjsMember';
import DjsMessage from './lib/DjsMessage';
import DjsChannel from './lib/DjsChannel';
import DjsGuild from './lib/DjsGuild';

class DjsInterface extends LibraryInterface {
    constructor(axonClient, token) {
        super(axonClient);

        this.client = new DjsClient(this, token);
        this.user = new DjsUser(this);
        this.member = new DjsMember(this);
        this.message = new DjsMessage(this);
        this.channel = new DjsChannel(this);
        this.guild = new DjsGuild(this);
    }

    get enums() {
        return DjsEnums;
    }

    get HANDLERS() {
        return HANDLERS;
    }
}

export default DjsInterface;
