import { AxonClient, updateDBVal } from '../..';

/**
 * Base class for all DB ModelConfig
 *
 * @author Khaaz

 * @abstract
 * @class AModel
 */
export declare class AModel {
    private _axon: AxonClient;

    constructor(axon: AxonClient);
    /**
     * Update the config and the DB with the given value.
     * @param {String} key
     * @param {*} value
     * @returns {Promise<AModel>}
     * @memberof AModel
     */
    public updateKey(key: string, value: updateDBVal): Promise<this|null>;
    protected _req(key: string, value: updateDBVal): Promise<this|null>;
}
