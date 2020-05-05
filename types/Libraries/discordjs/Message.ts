import { Message } from '../definitions/Message';
// @ts-ignore
import * as djs from 'discord.js';
import { DjsContent } from '../../';

export declare class DjsMessage extends Message {
    /**
     * @memberof DjsMessage
     */
    delete(message: djs.Message): Promise<djs.Message>;
    /**
     * @memberof DjsMessage
     */
    edit(message: djs.Message, content: string | DjsContent): Promise<djs.Message>
}
