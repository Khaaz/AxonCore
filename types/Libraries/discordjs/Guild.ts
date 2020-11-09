import { Guild } from '../definitions/Guild';
// @ts-ignore
import * as djs from 'discord.js';

export declare class DjsGuild extends Guild {
    /**
     * @memberof DjsGuild
     */
    getMember(guild: djs.Guild, userID: string): djs.GuildMember | undefined;
}
