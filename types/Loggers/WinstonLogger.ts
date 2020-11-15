import { ALogger, LOGGER_TYPES } from '../';
// @ts-ignore
import * as Winston from 'winston';

export declare class WinstonLogger extends ALogger {
    /** Winston */
    // @ts-ignore
    public out: Winston.Logger;
    public type: LOGGER_TYPES.WINSTON;
}
