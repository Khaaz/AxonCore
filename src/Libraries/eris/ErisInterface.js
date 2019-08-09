import LibraryInterface from '../LibraryInterface';

import * as HANDLERS from './handlers/index';

import ErisEnums from './lib/ErisEnums';

import ErisClient from './lib/ErisClient';
import ErisUser from './lib/ErisUser';
import ErisMember from './lib/ErisMember';
import ErisMessage from './lib/ErisMessage';
import ErisChannel from './lib/ErisChannel';
import ErisGuild from './lib/ErisGuild';

class ErisInterface extends LibraryInterface {
    constructor(axonClient) {
        super(axonClient);

        this.client = new ErisClient(this);
        this.user = new ErisUser(this);
        this.member = new ErisMember(this);
        this.message = new ErisMessage(this);
        this.channel = new ErisChannel(this);
        this.guild = new ErisGuild(this);
    }

    get enums() {
        return ErisEnums;
    }

    get HANDLERS() {
        return HANDLERS;
    }
}

export default ErisInterface;
