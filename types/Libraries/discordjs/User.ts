import { User } from '../definitions/User';
// @ts-ignore
import * as djs from 'discord.js';

export declare class DjsUser extends User {
    /**
     * @memberof DjsUser
     */
    getDM(user: djs.User): Promise<djs.DMChannel>;
}
