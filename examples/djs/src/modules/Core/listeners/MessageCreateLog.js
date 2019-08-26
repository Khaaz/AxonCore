import { Listener } from '../../../../../..';

class MessageCreateLog extends Listener {
    constructor(...args) {
        super(...args);

        /** Event Name (Discord name) */
        this.eventName = 'message';
        /** Event name (Function name) */
        this.label = 'messageCreateLog';

        this.enabled = true;

        this.infos = {
            owners: ['KhaaZ'],
            description: 'Log Message Create events',
        };
    }

    execute(message, guildConfig) { // eslint-disable-line
        console.log(`Msg ${message.channel.guild.id}`);
        return Promise.resolve();
    }
}

export default MessageCreateLog;
