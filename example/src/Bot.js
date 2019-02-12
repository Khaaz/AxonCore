'use strict';
import Eris from 'eris';
import Client from './Client';

import axonConf from './configs/customConf.json';
import tokenConf from './configs/tokenConf.json';
import templateConf from './configs/templateConf.json';

import MyUtils from './MyUtils';
import MyGuildSchema from './MyGuildSchema';

const AxonOptions = {
    axonConf,
    templateConf,
    tokenConf,

    utils: MyUtils, // use your own Utils
    logger: null, // custom Logger
    db: null, // custom DB Service
    axonSchema: null,
    guildSchema: MyGuildSchema,
};

/**
 * new AxonClient(token, erisOptions, AxonOptions, modules)
 *
 * new Client(token, erisOptions, AxonOptions) => Modules imported in Client
 */
const  client = new Eris.Client(
    tokenConf.bot.token,
    {
        autoreconnect: true,
        defaultImageFormat: 'png',
        defaultImageSize: 512,
        disableEveryone: true,
        getAllUsers: false,
        messageLimit: 100,
        restMode: true,
    }
);

const Bot = new Client(
    client,
    AxonOptions
);

export default Bot;
