import { Message } from '../definitions/Message';
// @ts-ignore
import * as Eris from 'eris';
import { ErisContent } from '../../';

export declare class ErisMessage extends Message {
    /**
     * @memberof ErisMessage
     */
    public delete(message: Eris.Message): Promise<void>;
    /**
     * @memberof ErisMessage
     */
    public edit(message: Eris.Message, content: ErisContent): Promise<Eris.Message>;
}
