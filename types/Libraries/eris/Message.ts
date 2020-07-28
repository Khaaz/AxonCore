import { Message } from '../definitions/Message';
// @ts-ignore
import * as Eris from 'eris';
import { ErisContent } from '../../';

export declare class ErisMessage extends Message {
    /**
     * @memberof ErisMessage
     */
    // @ts-expect-error
    public delete(message: Eris.Message): Promise<void>;
    /**
     * @memberof ErisMessage
     */
    // @ts-expect-error
    public edit<T extends Eris.TextableChannel>(message: Eris.Message<T>, content: ErisContent): Promise<Eris.Message<T>>;
}
