import { Listener } from 'axoncore';

class MessageCreateMod extends Listener {
    constructor(...args) {
        super(...args);

        /** Event Name (Discord name) */
        this.eventName = 'messageCreate';
        /** Event name (Function name) */
        this.label = 'messageCreateMod';

        this.enabled = true;

        this.infos = {
            owners: ['KhaaZ'],
            description: 'Log Message Create events',
        };
    }

    execute(message, guildConfig) { // eslint-disable-line
        if (!message.channel.guild) {
            return Promise.resolve();
        }
        if (message.webhookID !== undefined) {
            return Promise.resolve();
        }
        console.log(`Prefix: ${guildConfig.prefixes}`);
        return Promise.resolve();
    }
}

export default MessageCreateMod;
