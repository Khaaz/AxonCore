import { Listener } from 'axoncore';

class GuildDelete extends Listener {
    constructor(...args) {
        super(...args);

        /** Event Name (Discord name) */
        this.eventName = 'guildDelete';
        /** Event name (Function name) */
        this.label = 'guildDelete';

        this.enabled = true;

        this.info = {
            owners: ['KhaaZ'],
            description: 'Guild Delete event',
        };
    }

    execute(guild, guildConfig) { // eslint-disable-line no-unused-vars
        console.log(`Guild Deleted: ${guild.name} [${guild.id}]`);
        return Promise.resolve();
    }
}

export default GuildDelete;
