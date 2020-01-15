import { Command, MessageCollector } from 'axoncore';

class Collect extends Command {
    constructor(module) {
        super(module);
        this.label = 'collect';
        this.infos = {
            owners: ['Null'],
            name: 'collect',
            description: 'Collect some messages and return',
            usage: 'collect',
        };
        this.options.cooldown = null;

        this._boundCollectEvent = this._onCollectEvent.bind(this);
    }

    async execute( { msg } ) {
        this._collector = new MessageCollector(this.axon);
        this._message = await this.sendMessage(msg.channel, 'Awaiting messages');
        this._aID = msg.author.id;

        this._collector.on('collect', this._boundCollectEvent);

        try {
            const msgs = await this._collector.run(msg.channel, {
                count: 10,
                ignoreBots: false,
            } );
            const finale = msgs.map(m => `ID: ${m.id} (${m.author.username}#${m.author.discriminator}) => Content: ${m.content}`); // Code block\code line mardown breaks this
            this._collector.off('collect', this._boundCollectEvent);
            return this.sendMessage(msg.channel, `\`\`\`js\n${finale.join(',\n')}\`\`\``);
        } catch (err) {
            return this.sendMessage(msg.channel, err);
        }
    }

    async _onCollectEvent(message) {
        if (this._message.content === 'Awaiting messages') {
            this._message = await this.editMessage(this._message, 'Awaiting messages. \nSay `delete [message id]` to delete a message from the collector\nSay `end` to end the collect. (Ends at 10 messages anyways)');
        }
        if (message.content.toLowerCase() === 'end' && message.author.id === this._aID) {
            this._collector.delete(message.id);
            this._collector.end();
        } else if (message.content.toLowerCase().startsWith('delete') ) {
            const strings = message.content.split(' ');
            this._collector.delete(message.id);
            try {
                const msgs = this._collector.delete(strings[1] );
                const finale = msgs.map(m => `ID: ${m.id} (${m.author.username}#${m.author.discriminator}) => Content: ${m.content}`);
                return this.sendMessage(message.channel, `\`\`\`js\n${finale.join(',\n')}\`\`\``);
            } catch (err) {
                return this.sendMessage(message.channel, `Error: \`\`\`${err.message}\`\`\``);
            }
        }
        return null;
    }
}

export default Collect;
