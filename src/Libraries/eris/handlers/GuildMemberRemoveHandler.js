import AHandler from '../../../Structures/Event/AHandler';

class GuildMemberRemoveHandler extends AHandler {
    handle(guild) {
        return guild.id;
    }
}

export default GuildMemberRemoveHandler;
