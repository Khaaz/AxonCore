import { Guild } from '../definitions/Guild';
import * as djs from 'discord.js';

export declare class DjsGuild extends Guild {
    /**
     * @memberof DjsGuild
     */
    getMember(guild: djs.Guild, userID: string): djs.GuildMember;
}
