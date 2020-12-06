import { ShardClient } from 'detritus-client';

import { AxonOptions } from 'axoncore';

import Client from './Client';

import botConfig from './configs/customConfig.json';
import tokenConfig from '../../tokenConfig.json';
import lang from './configs/lang.json';

import MyUtils from './MyUtils';

const axonOptions = new AxonOptions( {
    prefixes: botConfig.prefixes,
    settings: botConfig.settings,
    lang,
    logo: null,

    info: botConfig.info,
    staff: botConfig.staff,
    template: botConfig.template,
    custom: {
        param: 1,
    },
},
tokenConfig.webhooks,
{
    utils: MyUtils, // use your own Utils
    logger: null, // custom Logger
    DBProvider: null, // custom DB Service
    DBLocation: `${__dirname}/Database/`,

    axonConfig: null,
    guildConfig: null,
} );

/**
 * new AxonClient(token, erisOptions, AxonOptions, modules)
 *
 * new Client(token, erisOptions, AxonOptions) => Modules imported in Client
 */
const client = new ShardClient(
    tokenConfig.bot.token,
    {
        gateway: {
            loadAllMembers: true,
        },
    },
);

const Bot = new Client(
    client,
    axonOptions,
);

export default Bot;
