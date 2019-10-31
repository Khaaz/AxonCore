import Discordjs from 'discord.js';

import { AxonOptions } from '../../..';

import Client from './Client';

import botConfig from './configs/customConfig.json';
import tokenConfig from '../../tokenConfig.json';
import lang from './configs/lang.json';

import MyUtils from './MyUtils';


const axonOptions = new AxonOptions( {
    botConfig,
    lang,
    tokenConfig,
    token: tokenConfig.bot.token,

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
const client = new Discordjs.Client(
    
    {
        disableEveryone: true,
        fetchAllMembers: false,
        messageCacheMaxSize: 100,
        disabledEvents: ['TYPING_START'],
    }
);

const Bot = new Client(
    client,
    axonOptions
);

export default Bot;
