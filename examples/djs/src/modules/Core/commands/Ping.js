import { Command, CommandOptions, CommandResponse } from '../../../../../../';

import Pong from './Ping_Pong';

class Ping extends Command {
    constructor(module) {
        super(module);

        this.label = 'ping';
        this.aliases = [
            'ping',
            'pang',
            'pung',
        ];

        this.hasSubcmd = true;
        this.subcmds = [Pong];

        this.infos = {
            owners: ['KhaaZ'],
            name: 'ping',
            description: 'Ping the bot.',
            usage: 'ping',
            examples: ['ping'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
            guildOnly: false,
        } );
    }

    async execute( { msg } ) {
        const start = Date.now();

        const mess = await this.sendMessage(msg.channel, 'Pong! ');
        if (!mess) {
            return new CommandResponse( { success: false } );
        }

        const diff = (Date.now() - start);
        this.editMessage(mess, `Pong! \`${diff}ms\``);

        return new CommandResponse( { success: true } );
    }
}

export default Ping;
