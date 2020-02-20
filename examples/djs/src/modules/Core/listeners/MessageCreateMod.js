import { Listener } from 'axoncore';

class MessageCreateMod extends Listener {
    constructor(...args) {
        super(...args);

        /** Event Name (Discord name) */
        this.eventName = 'message';
        /** Event name (Function name) */
        this.label = 'messageCreateMod';

        this.enabled = true;

        this.info = {
            owners: ['KhaaZ'],
            description: 'Log Message Create events',
        };
    }

    execute(message, guildConfig) { // eslint-disable-line
        if (guildConfig) {
            console.log(`Prefix: ${guildConfig.prefixes}`);
        }
        if (message.webhookID !== null) {
            return Promise.resolve();
        }
        return Promise.resolve();
    }
}

export default MessageCreateMod;
