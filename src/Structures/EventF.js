'use strict';

import Base from './Base';

/**
 * Default EventF class
 * extends EventFEvent to create an event
 * 
 * @author KhaaZ
 *
 * @class EventF
 * @extends {Base}
 */
class EventF extends Base {

    constructor(module) {
        super();

        this.bot = module.client;
        this.module = module;

        /** Event Name (Discord name) */
        this.eventName = 'event';
        /** Event name (Function name) */
        this.label = 'label';
        this.enabled = module.enabled;
        
        this.infos = {
            owners: [], // ['Eleos'] OR ['Eleos', 'Ape']
            description: '', // 'A cool command that does things.' <-- With the dot!
        };

        /** Bypass all perms - can/can't be server disabled */
        this.serverBypass = module.serverBypass;
    }
}

export default EventF;
