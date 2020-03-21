import { Channel } from '../definitions/Channel';
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
    public sendMessage(channel: Eris.Channel, content: ErisContent): Promise<Eris.Message>;
}
