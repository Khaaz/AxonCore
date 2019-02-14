'use strict';

import { Command } from '../../../../..';

class Pung extends Command {
    constructor(module) {
        super(module);

        this.label = 'pung';
        this.aliases = ['pung'];

        this.isSubcmd = true;
        this.hasSubcmd = false;

        this.infos = {
            owners: ['KhaaZ'],
            name: 'ping pong pang pung',
            description: 'Ping the bot.',
            usage: 'ping pong pang pung',
            examples: [],
        };

        this.options.argsMin = 0;
        this.options.cooldown = 3000;
        this.options.guildOnly = false;

        this.permissions.custom = (msg) => msg.channel.guild.id === '365236789855649814'; // Ease guild id
    }

    async execute({ msg }) {
        const start = Date.now();

        const mess = await this.sendMessage(msg.channel, 'REEEEEEEEE!');
        if (!mess) {
            return;
        }

        const diff = (Date.now() - start);

        return this.editMessage(mess, `REEEEEEEEE! \`${diff}ms\``);
    }
}

export default Pung;
