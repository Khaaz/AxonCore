// @ts-ignore
import * as djs from 'discord.js';
import { DjsContent } from '../../';
import { Channel } from '../definitions/Channel';
import { DISCORD_LIB_PERMISSIONS } from './Enums';

export declare class DjsChannel extends Channel {
    /**
     * @memberof DjsChannel
     */
    hasPermission(channel: djs.Channel, user: djs.User, perm: DISCORD_LIB_PERMISSIONS): boolean;
    /**
     * @memberof DjsChannel
     */
    sendMessage(channel: djs.Channel, content: string | DjsContent): Promise<djs.Message | djs.Message[]>
}
