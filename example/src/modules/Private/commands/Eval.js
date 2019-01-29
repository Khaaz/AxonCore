'use strict';

import { inspect } from 'util';

import { Command, Prompt } from '../../../../..';

class Eval extends Command {
    constructor(module) {
        super(module);

        this.label = 'eval';
        this.aliases = ['eval', 'e'];

        this.infos = {
            owner: ['AS04', 'Ape', 'KhaaZ'],
            name: 'eval',
            description: 'Eval js code.',
            usage: 'eval [js code]',
            examples: ['eval 1 + 1'],
        };

        this.options.argsMin = 1;
        this.options.cooldown = null;

        this.permissions.staff.needed = this.axon.staff.owners;
        this.permissions.staff.bypass = this.axon.staff.owners;
    }

    async execute({ msg, args, /* eslint-disable */guildConf/* eslint-enable */ }) {
        try {
            /* eslint-disable */
            const Util = this.Util;
            const Resolver = this.Resolver;
            const Template = this.Template
            const axon = this.axon;
            const guild = msg.channel.guild;
            const channel = msg.channel;
            /* eslint-enable */

            let evaled = await eval(args.join(' '));

            switch (typeof evaled) {
                case 'object': {
                    evaled = inspect(evaled, { depth: 0, showHidden: true });
                    break;
                }
                default: {
                    evaled = String(evaled);
                }
            }

            /** Just for security. */
            evaled = evaled.split(this.bot._token).join('Khaaz Baguette');

            const charlength = evaled.length;

            if (evaled.length === 0) {
                return;
            }

            if (evaled.length > 2000) {
                evaled = evaled.match(/[\s\S]{1,1900}[\n\r]/g) || [];
                if (evaled.length > 3) {
                    this.sendMessage(msg.channel, `Cut the response! [${evaled.length} | ${charlength}]`);
                    this.sendMessage(msg.channel, `\`\`\`js\n${evaled[0]}\`\`\``);
                    this.sendMessage(msg.channel, `\`\`\`js\n${evaled[1]}\`\`\``);
                    this.sendMessage(msg.channel, `\`\`\`js\n${evaled[2]}\`\`\``);
                    return;
                } else {
                    return evaled.forEach((message) => {
                        this.sendMessage(msg.channel, `\`\`\`js\n${message}\`\`\``);
                        return;
                    });
                }
            }
            return this.sendMessage(msg.channel, `\`\`\`js\n${evaled}\`\`\``);
        } catch (err) {
            this.Logger.debug(err.stack);
            return this.sendMessage(msg.channel, err.message ? err.message : err.name);
        }
    }
}

export default Eval;
