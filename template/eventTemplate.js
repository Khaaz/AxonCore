'use strict';

import Event from './../../../EaseCore/Event';

class GuildCreate extends Event {

    constructor(module) {
        super(module);

        this.label = 'guildCreate';
        this.enabled = true;

        this.premium = false;
        this.beta = false;

        this.infos = {
            owners: ['KhaaZ', 'AS04'],
            category: 'info',
            description: 'ping',
            fullDesc: 'ping the bot',
            usage: ['ping'],
            example: ['ping']
        };

    }

    async handler({ guild }) { // eslint-disable-line no-unused-vars
        //
    }
}

export default GuildCreate;
