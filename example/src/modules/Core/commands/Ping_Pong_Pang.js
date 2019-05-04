import { Command } from '../../../../..';

import Pung from './Ping_Pong_Pang_Pung';

class Pang extends Command {
    constructor(module) {
        super(module);

        this.label = 'pang';
        this.aliases = ['pang'];

        this.isSubcmd = true;
        this.hasSubcmd = true;
        this.subcmds = [Pung];

        this.infos = {
            owners: ['KhaaZ'],
            name: 'ping pong pang',
            description: 'Ping the bot.',
            usage: 'ping pong pang',
            examples: [
                'ping pong pang',
                'ping pong pang but different',
                'an other ping pong pang',
            ],
        };

        this.options.argsMin = 0;
        this.options.cooldown = 3000;
        this.options.guildOnly = false;

        this.permissions.serverMod = true;
    }

    async execute( { msg } ) {
        const start = Date.now();

        const mess = await this.sendMessage(msg.channel, 'pang pang!');
        if (!mess) {
            return null;
        }

        const diff = (Date.now() - start);

        return this.editMessage(mess, `pang pang! \`${diff}ms\``);
    }
}

export default Pang;
