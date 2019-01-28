import { Command, Prompt, Resolver } from '../../../../..';

class Wave extends Command {
    constructor(module) {
        super(module);
        this.label = 'wave';

        this.infos = {
            owner: ['Null'],
            name: 'wave',
            description: 'Wave at someone',
            usage: 'wave (user)',
            examples: ['wave KhaaZ'],
        };

        this.options.argsMin = 0;
        this.options.cooldown = 15000;
    }
    async execute({ msg, args }) {
        const Util = this.Utils;
        if (!args[0]) {
            const prompt = new Prompt(this.axon, msg.author.id, msg.channel, {
                timeout: 10000,
            });
            try {
                const returnedMes = await prompt.run('Who would you like to me to wave to?', {
                    deleteTimeoutMess: 10000,
                    timeoutMess: 'Well, I guess you don\'t want to wave at anyone then.',
                });
                console.log(returnedMes.content);
                let user = Resolver.member(msg.channel.guild, returnedMes.content) || Resolver.user(this.axon.client, returnedMes.content);
                if (!user) {
                    if (Util.id.test(returnedMes.content)) {
                        user = await this.axon.client.getRESTUser(returnedMes.content);
                    } else {
                        return this.sendMessage(msg.channel, 'I can\'t wave to someone who does not exist.');
                    }
                }
                const username = (user.guild && user.nick) || (user.guild && `${user.username}#${user.discriminator}`) || `${user.username}#${user.discriminator}`;
                return this.sendMessage(msg.channel, `*Waves to ${username}*`);
            } catch (err) {
                if (err === 'Prompt timed out' || err === 'Invalid usage found. Prompt ended.') {
                    return;
                }
                return this.sendMessage(msg.channel, `Error: \`\`\`js\n${err}\`\`\``);
            }
        } else {
            try {
                let user = Resolver.member(msg.channel.guild, args.join(' ')) || Resolver.user(this.axon.client, args.join(' '));
                if (!user) {
                    if (Util.id.test(args[0])) {
                        user = await this.axon.client.getRESTUser(args[0]);
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
                return this.sendMessage(msg.channel, `Error: \`\`\`js\n${err}\`\`\``);
            }
        }
    }
}

export default Wave;
