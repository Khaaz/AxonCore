import { Member } from '../definitions/Member';
import * as djs from 'discord.js';
import { DISCORD_LIB_PERMISSIONS } from './Enums';

export declare class DjsMember extends Member {
    /**
     * @memberof DjsMember
     */
    getRoles(member: djs.GuildMember): string[];
    /**
     * @memberof DjsMember
     */
    getRolesObject(member: djs.GuildMember): djs.Role[];
    /**
     * @memberof DjsMember
     */
    hasPermission(member: djs.GuildMember, permission: DISCORD_LIB_PERMISSIONS): boolean;
}
