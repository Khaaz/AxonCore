import nodeUtil from 'util';

import {
    // eslint-disable-next-line no-unused-vars
    Command, CommandPermissions, CommandOptions, CommandResponse, AxonEnums, DiscordEnums, Collection, Resolver, Embed, Prompt, MessageCollector,
} from '../../../../..';

class Eval extends Command {
    constructor(module) {
        super(module);

        this.label = 'eval';
        this.aliases = ['eval', 'e'];

        this.infos = {
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

    async execute( { msg, args, /* eslint-disable */guildConfig/* eslint-enable */ } ) {
        /* eslint-disable */
            const Util = this.Util;
            const template = this.template
            const axon = this.axon;
            const member = msg.member;
            const guild = msg.channel.guild;
            const channel = msg.channel;
            /* eslint-enable */

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
        evaled = evaled.replace(this.bot._token, 'Khaaz Baguette');

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
