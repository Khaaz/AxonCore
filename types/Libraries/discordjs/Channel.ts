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
    // @ts-expect-error
    sendMessage<T>(channel: djs.TextChannel | djs.DMChannel, content: string | DjsContent): Promise<djs.Message | djs.Message[]>
}
