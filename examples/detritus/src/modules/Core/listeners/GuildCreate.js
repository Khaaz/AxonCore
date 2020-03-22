import { Listener } from 'axoncore';

class GuildCreate extends Listener {
    constructor(...args) {
        super(...args);

        /** Event Name (Discord name) */
        this.eventName = 'guildCreate';
        /** Event name (Function name) */
        this.label = 'guildCreate';

        this.enabled = true;

        this.info = {
            owners: ['KhaaZ'],
            description: 'Guild Create event',
        };
    }

    execute( { guild }, guildConfig) { // eslint-disable-line no-unused-vars
        console.log(`Guild Created: ${guild.name} [${guild.id}]`);
        return Promise.resolve();
    }
}

export default GuildCreate;
