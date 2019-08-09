import { Command, CommandPermissions, CommandResponse } from '../../../../..';

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

        this.permissions = new CommandPermissions(this, {
            custom: (msg) => msg.channel.guild.id === '365236789855649814', // Ease guild id
        } );
    }

    async execute( { msg } ) {
        const start = Date.now();

        const mess = await this.sendMessage(msg.channel, 'REEEEEEEEE!');
        if (!mess) {
            return new CommandResponse( { success: false } );
        }

        const diff = (Date.now() - start);

        this.editMessage(mess, `REEEEEEEEE! \`${diff}ms\``);
        return new CommandResponse( { success: true } );
    }
}

export default Pung;
