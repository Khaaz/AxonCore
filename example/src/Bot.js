'use strict';

import Client from './Client';

import axonConf from './configs/customConf.json';
import tokenConf from './configs/tokenConf.json';
import templateConf from './configs/templateConf.json';

const AxonOptions = {
    axonConf,
    templateConf,
    tokenConf,

    resolver: null,
    utils: null,
    axonSchema: null,
    guildSchema: null,
};

/**
 * new AxonClient(token, erisOptions, AxonOptions, modules)
 *
 * new Client(token, erisOptions, AxonOptions) => Modules imported in Client
 */
const Bot = new Client(
    tokenConf.bot.token,
    {
        autoreconnect: true,
        defaultImageFormat: 'png',
        defaultImageSize: 512,
        disableEveryone: true,
        getAllUsers: true,
        messageLimit: 100,
        restMode: true,
    },
    AxonOptions
);

export default Bot;
