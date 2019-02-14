'use strict';

import { inspect } from 'util';

/* eslint-disable */
import { Command, Enums, Collection, Resolver, Embed, Prompt , MessageCollector } from '../../../../..'; /* eslint-enable */

class Eval extends Command {
    constructor(module) {
        super(module);

        this.label = 'eval';
        this.aliases = ['eval', 'e'];

        this.infos = {
            owners: ['AS04', 'Ape', 'KhaaZ'],
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
            evaled = await eval(args.join(' '));

            if (typeof evaled === 'object') {
                evaled = inspect(evaled, { depth: 0, showHidden: true });
            } else {
                evaled = String(evaled);
            }
        } catch (err) {
            this.Logger.debug(err.stack);
            return this.sendMessage(msg.channel, err.message ? err.message : err.name);
        }

        /** Just for security. */
        evaled = evaled.replace(this.bot._token, 'Khaaz Baguette');

        const fullLen = evaled.length;

        if (fullLen === 0) {
            return;
        }

        if (fullLen > 2000) {
            evaled = evaled.match(/[\s\S]{1,1900}[\n\r]/g) || [];
            if (evaled.length > 3) {
                this.sendMessage(msg.channel, `Cut the response! [${evaled.length} | ${fullLen}]`);
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
    }
}

export default Eval;
