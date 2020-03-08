/**
 * @typedef {import('../../Loggers/ALogger').default} ALogger
 * @typedef {import('../../AxonClient').default} AxonClient
 */

/**
 * Loads the AxonClient.
 *
 * @author KhaaZ
 *
 * @static
 * @class ClientInitialiser
 */
class ClientInitialiser {
    /**
     * Initialise AxonStaff from the configuration file.
     *
     * @static
     * @param {Object.<string, Array<{id: String, name: String}>} staffConfig
     * @param {ALogger} logger
     * @returns {Object.<string, Array<String>} Axon staff newly created.
     * @memberof ClientInitialiser
     */
    static initStaff(staffConfig, logger) {
        const staff = {};

        for (const s of Object.keys(staffConfig) ) {
            staff[s] = staffConfig[s].map(o => o.id);
        }
        logger.info('Bot-Staff engaged!');

        return staff;
    }

    /**
     * Initialise AxonConfig from the DB.
     * Either create or fetch it.
     *
     * This method needs to directly add the axonConfig to axonClient.
     * Otherwise the return value is a promise.
     *
     * @static
     * @param {AxonClient} axon
     * @memberof ClientInitialiser
     */
    static async initAxon(axon) {
        let axonConf;
        try {
            axonConf = await axon.DBProvider.fetchAxon();
            if (!axonConf) {
                axonConf = await axon.DBProvider.initAxon();
            }
        } catch (err) {
            axonConf = await axon.DBProvider.initAxon();
        }
        
        // eslint-disable-next-line require-atomic-updates
        axon.axonConfig = axonConf; // We have to do it here and not return the value because we need to unwrap the promise and actually assign the value.
        
        axon.logger.info('[INIT] Axon config initialised!');
    }
}

export default ClientInitialiser;
