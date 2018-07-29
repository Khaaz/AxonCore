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
    constructor(token, options, config, generalConfig, templateConfig, tokenConfig) {
        super(token, options, config, generalConfig, templateConfig, tokenConfig, modules);

        this.param = 1; // personal stuff
        this._param = 2; // personal hided stuff
    }

    initStaff() {
        // called before init and other. Called before creating modules
        // override default initStaff
        // setup bot staff as convenience. Can be anything
        this.staff.contributor = [];
        console.log('child initStaff');
    }

    init() {
        // override default init.
        // called aftet _init has run.
        // used to init all other stuff (personal/custom)
        

        // this should returns a Promise ideally
        return new Promise((resolve, reject) => {
            try {
                this.customInitMethod();
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }    

    NotinitStatus() {
        // called after everything (after ready event)
        // override default editStatus
        // used to setup custom status
        console.log('override default initStatus');
    }

    customInitMethod() {
        console.log('customInitMethod');
        // custom init method that init stuff
    }

    customMethod() {
        // custom method used anywhere?
    }
}

export default Client;
