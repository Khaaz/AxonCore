'use strict';

import AxonClient from '../..';

import * as modules from './modules/index';

/**
 * Example - Client constructor
 *
 * @author KhaaZ
 *
 * @class Client
 * @extends {AxonCore.AxonClient}
 */
class Client extends AxonClient {
    constructor(token, options, AxonOptions) {
        super(token, options, AxonOptions, modules);

        this.param = 1; // personal stuff
        this._param = 2; // personal hidden stuff
    }

    initStaff() {
        // Called after initOwners has run
        // setup bot staff as per your convenience. Can be anything
        this.staff.contributor = [];
    }

    init() {
        // Called after AxonClient init has run (_init)
        // used to init all other stuff (personal / custom)

        // this should return a Promise ideally
        return new Promise((resolve, reject) => {
            try {
                this.customInitMethod();
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    initStatus() {
        // called after ready event
        // overrides default editStatus
        // used to setup custom status
        this.client.editStatus(null, {
            name: `AxonCore | ${this.params.prefix[0]}help`,
            type: 0,
        });
    }

    customInitMethod() {
        // custom init method that init stuff
    }

    customMethod() {
        // custom method used anywhere with this.axon.customMethod()
    }

    $sendFullHelp(msg) {
        // override sendFullHelp method
        return this.AxonUtils.sendMessage(msg.channel, 'Full Help override');
    }

    $sendHelp(command, msg) {
        // override sendHelp method
        return this.AxonUtils.sendMessage(msg.channel, `Help override for ${command.label}`);
    }
}

export default Client;
