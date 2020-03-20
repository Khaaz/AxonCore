import { Member } from '../definitions/Member';
import * as Eris from 'eris';
import { DISCORD_LIB_PERMISSIONS } from './Enums';

export declare class ErisMember extends Member {
    /**
     * @memberof ErisMember
     */
    public getRoles(member: Eris.Member): string[];
    /**
     * @memberof ErisMember
     */
    public getRolesObject(member: Eris.Member): Eris.Role[];
    /**
     * @memberof ErisMember
     */
    public hasPermission(member: Eris.Member, permission: DISCORD_LIB_PERMISSIONS): boolean;
}
