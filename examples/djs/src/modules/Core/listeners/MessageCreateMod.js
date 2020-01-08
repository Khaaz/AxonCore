import { Listener } from '../../../../../..';

class MessageCreateMod extends Listener {
    constructor(...args) {
        super(...args);

        /** Event Name (Discord name) */
        this.eventName = 'message';
        /** Event name (Function name) */
        this.label = 'messageCreateMod';

        this.enabled = true;

        this.infos = {
            owners: ['KhaaZ'],
            description: 'Log Message Create events',
        };
    }

    execute(message, guildConfig) { // eslint-disable-line
        if (guildConfig) {
            console.log(`Prefix: ${guildConfig.prefixes}`);
        }
        return Promise.resolve();
    }
}

export default MessageCreateMod;
