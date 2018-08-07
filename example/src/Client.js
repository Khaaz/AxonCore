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
        // called before init and other. Called before creating modules
        // override default initStaff
        // setup bot staff as per your convenience. Can be anything
        this.staff.contributor = [];
        console.log('child initStaff');
    }

    init() {
        // overrides default init.
        // called after _init has run.
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
        // called after everything (after ready event)
        // overrides default editStatus
        // used to setup custom status
        console.log('override default initStatus');
        this.client.editStatus(null, {
            name: `AxonCore | ${this.params.prefix[0]}help`,
            type: 0
        });
    }

    customInitMethod() {
        console.log('customInitMethod');
        // custom init method that init stuff
    }

    customMethod() {
        // custom method used anywhere?
    }

    sendFullHelp(msg) {
        //override sendFullHelp method
        this.createMessage(msg.channel.id, 'Full Help override').catch();
    }

    sendHelp(command, msg) {
        //override sendHelp method
        this.client.createMessage(msg.channel.id, `Help override for ${command.label}`).catch();
    }
}

export default Client;
