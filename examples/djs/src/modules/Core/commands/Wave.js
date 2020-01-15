import { Command, Prompt } from 'axoncore';

class Wave extends Command {
    constructor(module) {
        super(module);
        this.label = 'wave';

        this.infos = {
            owners: ['Null'],
            name: 'wave',
            description: 'Wave at someone',
            usage: 'wave (user)',
            examples: ['wave KhaaZ'],
        };

        this.options.argsMin = 0;
        this.options.cooldown = 15000;
    }

    async execute( { msg, args } ) {
        if (!args[0] ) {
            const prompt = new Prompt(this.axon, msg.author.id, msg.channel, {
                timeoutTime: 10000,
            } );
            try {
                const returnedMes = await prompt.run('Who would you like to me to wave to?', {
                    deleteTimeoutMsg: 10000,
                    timeoutMessage: 'Well, I guess you don\'t want to wave at anyone then.',
                } );
                let user = this.Resolver.member(msg.channel.guild, returnedMes.content) || this.Resolver.user(this.axon.botClient, returnedMes.content);
                if (!user) {
                    if (this.utils.id.test(returnedMes.content) ) {
                        user = await this.axon.botClient.getRESTUser(returnedMes.content);
                    } else {
                        return this.sendMessage(msg.channel, 'I can\'t wave to someone who does not exist.');
                    }
                }
                const username = (user.guild && user.nick) || (user.guild && `${user.username}#${user.discriminator}`) || `${user.username}#${user.discriminator}`;
                return this.sendMessage(msg.channel, `*Waves to ${username}*`);
            } catch (err) {
                if (err.message === 'Prompt timed out' || err.message === 'Invalid usage found. Prompt ended.') {
                    return null;
                }
                console.log(err);
                return this.sendError(msg.channel, err);
            }
        } else {
            try {
                let user = this.Resolver.member(msg.channel.guild, args.join(' ') ) || this.Resolver.user(this.axon.botClient, args.join(' ') );
                if (!user) {
                    if (this.utils.id.test(args[0] ) ) {
                        user = await this.bot.getRESTUser(args[0] );
                    } else {
                        return this.sendMessage(msg.channel, 'I can\'t wave to someone who does not exist.');
                    }
                }
                const username = (user.guild && user.nick) || (user.guild && `${user.username}#${user.discriminator}`) || `${user.username}#${user.discriminator}`;
                return this.sendMessage(msg.channel, `*Waves to ${username}*`);
            } catch (err) {
                if (err.message) {
                    if (err.message === 'DiscordRESTError [10013]: Unknown User') {
                        return this.sendMessage(msg.channel, 'I can\'t wave to someone who does not exist.');
                    }
                }
                return this.sendError(msg.channel, `Error: \`\`\`js\n${err.message}\`\`\``);
            }
        }
    }
}

export default Wave;
