'use strict';

import { Event } from '../../../../..';

class GuildCreate extends Event {
    constructor(...args) {
        super(...args);

        /** Event Name (Discord name) */
        this.eventName = 'guildCreate';
        /** Event name (Function name) */
        this.label = 'guildCreate';

        this.enabled = true;

        this.infos = {
            owners: ['KhaaZ'],
            description: 'Guild Create event',
        };
    }

    execute(guild, guildConf) { // eslint-disable-line 
        console.log(`Guild Created: ${guild.name} [${guild.id}]`);
        return Promise.resolve();
    }
}

export default GuildCreate;
