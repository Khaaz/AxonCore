import { Channel } from '../definitions/Channel';
// @ts-ignore
import * as Eris from 'eris';
import { DISCORD_LIB_PERMISSIONS } from './Enums';
import { ErisContent } from '../../';

export declare class ErisChannel extends Channel {
    /**
     * @memberof ErisChannel
     */
    public hasPermission(channel: Eris.Channel, user: Eris.User, perm: DISCORD_LIB_PERMISSIONS): boolean;
    /**
     * @memberof ErisChannel
     */
    // @ts-ignore (These should really have ts-expect-error)
    public sendMessage<T extends Eris.TextableChannel>(channel: T, content: ErisContent): Promise<Eris.Message<T>>;
}
