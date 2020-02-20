import { Command, CommandOptions, CommandPermissions, CommandResponse } from 'axoncore';

import Pang from './Ping_Pong_Pang';

class Pong extends Command {
    constructor(module) {
        super(module);

        this.label = 'pong';
        this.aliases = ['pong'];

        this.isSubcmd = true;
        this.hasSubcmd = true;
        this.subcmds = [Pang];

        this.info = {
            owners: ['KhaaZ'],
            name: 'ping pong',
            description: 'Ping the bot.',
            usage: 'ping pong',
            examples: ['ping pong'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
            cooldown: 10000,
            guildOnly: false,
            hidden: true,
            sendPermissionMessage: true,
        } );

        this.permissions = new CommandPermissions(this, {
            author: {
                needed: ['MANAGE_GUILD'],
            },
            staff: {
                bypass: [...this.axon.staff.owners, ...this.axon.staff.admins],
            },
        } );
    }

    async execute( { msg } ) {
        const start = Date.now();

        const mess = await this.sendMessage(msg.channel, 'BADABOUM!');
        if (!mess) {
            return new CommandResponse( { success: false } );
        }

        const diff = (Date.now() - start);

        this.editMessage(mess, `BADABOUM! \`${diff}ms\``);
        return new CommandResponse( { success: true } );
    }
}

export default Pong;
