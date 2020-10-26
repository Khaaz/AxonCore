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
    ReactionCollector,
    NextMessage,
    NextReaction,
    SortedList,
    Stack,
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

    async execute(env) {
        const { msg, args, guildConfig } = env;
        let evalString;
        try {
            // eslint-disable-next-line no-eval
            evalString = await eval(args.join(' ') );

            if (typeof evalString === 'object') {
                evalString = nodeUtil.inspect(evalString, { depth: 0, showHidden: true } );
            } else {
                evalString = String(evalString);
            }
        } catch (err) {
            this.logger.debug(err ? err.stack : err);
            return this.sendError(msg.channel, err.message ? err.message : err);
        }

        evalString = this.cleanUpToken(evalString);

        if (evalString.length === 0) {
            return this.sendError(msg.channel, 'Nothing to evaluate.');
        }

        const splitEvaled = evalString.match(/[\s\S]{1,1900}[\n\r]/g) || [evalString];
        
        if (splitEvaled.length > 3) {
            this.sendMessage(msg.channel, `Cut the response! [3/${splitEvaled.length} | ${evalString.length} chars]`);
        }
        
        for (let i = 0; i < 3; i++) {
            if (!splitEvaled[i] ) {
                break;
            }
            this.sendCode(msg.channel, splitEvaled[i] );
        }
        return new CommandResponse( {
            success: true,
        } );
    }

    cleanUpToken(evalString) {
        return evalString
            .split(this.bot._token ? this.bot._token : this.bot.token)
            .join('Khaaz Baguette');
    }

    sendCode(channel, content, lang = 'js') {
        return this.sendMessage(channel, `\`\`\`${lang}\n${content}\`\`\``);
    }
}

export default Eval;
