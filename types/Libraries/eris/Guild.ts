/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Guild } from '../definitions/Guild';
// @ts-ignore
import * as Eris from 'eris';

export declare class ErisGuild extends Guild {
    /**
     * @memberof ErisGuild
     */
    public getMember(guild: Eris.Guild, userID: string): Eris.Member;
}
