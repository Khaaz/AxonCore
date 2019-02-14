'use strict';

import { Command } from '../../../../..';

import Pong from './Ping_Pong';

class Ping extends Command {
    constructor(module) {
        super(module);

        this.label = 'ping';
        this.aliases = ['ping', 'pang', 'pung'];

        this.hasSubcmd = true;
        this.subcmds = [Pong];

        this.infos = {
            owners: ['KhaaZ'],
            name: 'ping',
            description: 'Ping the bot.',
            usage: 'ping',
            examples: ['ping'],
        };

        this.options.argsMin = 0;
        this.options.cooldown = 3000;
        this.options.guildOnly = false;
    }

    async execute({ msg }) {
        const start = Date.now();

        const mess = await this.sendMessage(msg.channel, 'Pong! ');

        if (!mess) {
            return;
        }

        const diff = (Date.now() - start);

        return this.editMessage(mess, `Pong! \`${diff}ms\``);
    }
}

export default Ping;
