/* eslint-disable no-unused-vars */
import nodeUtil from 'util';

import {
    Command,
    CommandPermissions,
    CommandOptions,
    CommandResponse,
    AxonEnums,
    DiscordEnums,
    Collection,
    Embed,
    Prompt,
    MessageCollector,
    Queue,
    FunctionQueue,
    AutoQueue,
    AsyncQueue,
} from 'axoncore';

class Eval extends Command {
    constructor(module) {
        super(module);

        this.label = 'eval';
        this.aliases = ['eval', 'e'];

        this.info = {
            owners: [
                'AS04',
                'Ape',
                'KhaaZ',
            ],
            name: 'eval',
            description: 'Eval js code.',
            usage: 'eval [js code]',
            examples: ['eval 1 + 1'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 1,
            cooldown: null,
        } );
        
        this.permissions = new CommandPermissions(this, {
            staff: {
                needed: this.axon.staff.owners,
                bypass: this.axon.staff.owners,
            },
        } );
    }

    async execute( { msg, args, guildConfig } ) {
        const { utils } = this;
        const { template } = this;
        const { axon } = this;
        const { member } = msg;
        const { guild } = msg.channel;
        const { channel } = msg;
            

        let evaled;
        try {
            // eslint-disable-next-line no-eval
            evaled = await eval(args.join(' ') );

            if (typeof evaled === 'object') {
                evaled = nodeUtil.inspect(evaled, { depth: 0, showHidden: true } );
            } else {
                evaled = String(evaled);
            }
        } catch (err) {
            this.logger.debug(err.stack);
            return this.sendError(msg.channel, err.message ? err.message : err.name);
        }

        /** Just for security. */
        evaled = evaled.replace(this.bot.token, 'Khaaz Baguette');

        const fullLen = evaled.length;

        if (fullLen === 0) {
            return null;
        }

        if (fullLen > DiscordEnums.EMBED_LIMITS.LIMIT_CONTENT) {
            evaled = evaled.match(/[\s\S]{1,1900}[\n\r]/g) || [];
            if (evaled.length > 3) {
                this.sendMessage(msg.channel, `Cut the response! [${evaled.length} | ${fullLen}]`);
                this.sendMessage(msg.channel, `\`\`\`js\n${evaled[0]}\`\`\``);
                this.sendMessage(msg.channel, `\`\`\`js\n${evaled[1]}\`\`\``);
                this.sendMessage(msg.channel, `\`\`\`js\n${evaled[2]}\`\`\``);
                return new CommandResponse( {
                    success: true,
                } );
            }
            return evaled.forEach( (message) => {
                this.sendMessage(msg.channel, `\`\`\`js\n${message}\`\`\``);
                return new CommandResponse( {
                    success: true,
                } );
            } );
        }
        return this.sendMessage(msg.channel, `\`\`\`js\n${evaled}\`\`\``);
    }
}

export default Eval;
