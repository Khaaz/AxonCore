import { Listener } from 'axoncore';

class MessageCreateLog extends Listener {
    constructor(...args) {
        super(...args);

        /** Event Name (Discord name) */
        this.eventName = 'message';
        /** Event name (Function name) */
        this.label = 'messageCreateLog';

        this.enabled = true;

        this.info = {
            owners: ['KhaaZ'],
            description: 'Log Message Create events',
        };
    }

    execute(message, guildConfig) { // eslint-disable-line
        if (!message.channel.guild) {
            return Promise.resolve();
        }
        if (message.webhookID !== null) {
            return Promise.resolve();
        }
        console.log(`Msg ${message.channel.guild.id}`);
        return Promise.resolve();
    }
}

export default MessageCreateLog;
