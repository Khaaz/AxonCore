import { User } from '../definitions/User';
import * as Eris from 'eris';

export declare class ErisUser extends User {
    /**
     * @memberof ErisUser
     */
    public getDM(user: Eris.User): Promise<Eris.PrivateChannel>;
}
