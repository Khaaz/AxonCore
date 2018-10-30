'use strict';

import { Event } from '../../../../..';

class GuildDelete extends Event {
    constructor(...args) {
        super(...args);

        /** Event Name (Discord name) */
        this.eventName = 'guildDelete';
        /** Event name (Function name) */
        this.label = 'guildDelete';

        this.enabled = true;

        this.infos = {
            owners: ['KhaaZ'],
            description: 'Guild Delete event',
        };
    }

    execute(guild, guildConf) { // eslint-disable-line
        console.log(`Guild Deleted: ${guild.name} [${guild.id}]`);
        return Promise.resolve();
    }
}

export default GuildDelete;
