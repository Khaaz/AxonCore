import { Command, CommandOptions, CommandPermissions, CommandResponse } from 'axoncore';

import Pung from './Ping_Pong_Pang_Pung';

class Pang extends Command {
    constructor(module) {
        super(module);

        this.label = 'pang';
        this.aliases = ['pang'];

        this.hasSubcmd = true;

        this.info = {
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

        this.options = new CommandOptions(this, {
            guildOnly: false,
        } );
        
        this.permissions = new CommandPermissions(this, {
            serverMod: true,
        } );
    }

    init() {
        return [Pung];
    }

    async execute( { msg } ) {
        const start = Date.now();

        const mess = await this.sendMessage(msg.channel, 'pang pang!');
        if (!mess) {
            return new CommandResponse( { success: false } );
        }

        const diff = (Date.now() - start);

        this.editMessage(mess, `pang pang! \`${diff}ms\``);
        return new CommandResponse( { success: true } );
    }
}

export default Pang;
