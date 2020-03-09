import { ALogger, AxonClient } from '../../';

/**
 * Loads the AxonClient.
 *
 * @author KhaaZ
 *
 * @static
 * @class ClientInitialiser
 */
export declare class ClientInitialiser {
    /**
     * Initialise AxonStaff from the configuration file.
     *
     * @static
     * @returns Axon staff newly created.
     * @memberof ClientInitialiser
     */
    static initStaff(staffConfig: { [key: string]: {id: string; name: string;}[];}, logger: ALogger): { [key: string]: string[]; };
    /**
     * Initialise AxonConfig from the DB.
     * Either create or fetch it.
     *
     * This method needs to directly add the axonConfig to axonClient.
     * Otherwise the return value is a promise.
     *
     * @static
     * @memberof ClientInitialiser
     */
    initAxon(axon: AxonClient): Promise<void>;
}
