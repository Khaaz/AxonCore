import { Command, MessageCollector } from '../../../../..';

class Collect extends Command {
    constructor(module) {
        super(module);
        this.label = 'collect';
        this.infos = {
            owner: 'Null',
            name: 'collect',
            description: 'Collect some messages and return',
        };
        this.options.cooldown = null;
    }
    async execute({ msg }) {
        this._collector = new MessageCollector(this.axon);
        this._message = await this.sendMessage(msg.channel, 'Awaiting messages');
        this._aID = msg.author.id;
        this.boundCollectEvent = this._onCollectEvent.bind(this);
        this._collector.on('collect', this.boundCollectEvent);

        try {
            const msgs = await this._collector.run(msg.channel, {
                count: 10,
                caseInsensitive: true,
            });
            const finale = msgs.map(m => `ID: ${m.id} (${m.author.username}#${m.author.discriminator}) => Content: ${m.content}`);
            this._collector.off('collect', this.boundCollectEvent);
            return this.sendMessage(msg.channel, `\`\`\`js\n${finale.join(',\n')}\`\`\``);
        } catch (err) {
            return this.sendMessage(msg.channel, err);
        }
    }

    async _onCollectEvent(message) {
        if (this._message.content === 'Awaiting messages') {
            this.editMessage(this._message, 'Awaiting messages. \nSay `delete [message id]` to delete a message from the collector\nSay `end` to end the collect. (Ends at 10 messages anyways)');
        }
        if (message.content.toLowerCase() === 'end' && message.author.id === this._aID) {
            this._collector.delete(message.id);
            this._collector.end();
        } else if (message.content.toLowerCase().startsWith('delete')) {
            const strings = message.content.split(' ');
            this._collector.delete(message.id);
            try {
                const msgs = await this._collector.delete(strings[1]);
                const finale = msgs.map(m => `ID: ${m.id} (${m.author.username}#${m.author.discriminator}) => Content: ${m.content}`);
                return this.sendMessage(message.channel, `\`\`\`js\n${finale.join(',\n')}\`\`\``);
            } catch (err) {
                return this.sendMessage(message.channel, `Error: \`\`\`${err}\`\`\``);
            }
        }
    }
}

export default Collect;
