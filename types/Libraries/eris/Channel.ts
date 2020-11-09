import { Channel } from '../definitions/Channel';
// @ts-ignore
import * as Eris from 'eris';
import { DISCORD_LIB_PERMISSIONS } from './Enums';
import { ErisContent } from '../../';

export declare class ErisChannel extends Channel {
    /**
     * @memberof ErisChannel
     */
    public hasPermission(channel: Eris.GuildChannel, user: Eris.User | Eris.Member, perm: DISCORD_LIB_PERMISSIONS): boolean;
    /**
     * @memberof ErisChannel
     */
    // @ts-ignore
    public sendMessage<T extends Eris.TextableChannel>(channel: T, content: ErisContent): Promise<Eris.Message<T>>;
}
