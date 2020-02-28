import { ALogger } from '../';
import * as Winston from 'winston';

export declare class WinstonLogger extends ALogger {
    /** Winston */
    public out: Winston.Logger;
}
