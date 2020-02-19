import NotImplementedException from '../../Errors/NotImplementedException';
import User from './User';
import Member from './Member';
import Message from './Message';
import Channel from './Channel';
import Guild from './Guild';

/**
 * @typedef {import('./Resolver').default} Resolver
 * @typedef {import('./LibraryInterface').default} LibraryInterface
 */

/**
 * Base class that handle any interaction with the library.
 *
 * @author KhaaZ
 *
 * @class LibraryInterface
 */
class LibraryInterface {
    /**
     * Creates an instance of LibraryInterface.
     *
     * @param {BotClient} botClient - The bot client (lib specific)
     * @param {Object} structs - Object with all structures to use in lib interface
     * @param {new (...args: Array<any>) => User} structs.User
     * @param {new (...args: Array<any>) => Member} structs.Member
     * @param {new (...args: Array<any>) => Message} structs.Message
     * @param {new (...args: Array<any>) => Channel} structs.Channel
     * @param {new (...args: Array<any>) => Guild} structs.Guild
     * @param {Resolver} structs.Resolver
     *
     * @memberof LibraryInterface
     */
    constructor(botClient, structs) {
        this._botClient = botClient;
        
        if (!(structs.User.prototype instanceof User) ) {
            throw new TypeError('Invalid type for User!');
        }
        this.user = new structs.User(this);
        
        if (!(structs.Member.prototype instanceof Member) ) {
            throw new TypeError('Invalid type for Member!');
        }
        this.member = new structs.Member(this);
        
        if (!(structs.Message.prototype instanceof Message) ) {
            throw new TypeError('Invalid type for Message!');
        }
        this.message = new structs.Message(this);
        
        if (!(structs.Channel.prototype instanceof Channel) ) {
            throw new TypeError('Invalid type for Channel!');
        }
        this.channel = new structs.Channel(this);

        if (!(structs.Guild.prototype instanceof Guild) ) {
            throw new TypeError('Invalid type for Guild!');
        }
        this.guild = new structs.Guild(this);

        this.resolver = structs.Resolver;
    }

    /**
     * Bot client
     * @type {BotClient}
     * @readonly
     * @memberof LibraryInterface
     */
    get botClient() {
        return this._botClient;
    }

    /**
     * @returns {void}
     * @memberof LibraryInterface
     */
    // eslint-disable-next-line no-unused-vars
    onMessageCreate(func) {
        throw new NotImplementedException();
    }

    /**
     * @returns {void}
     * @memberof LibraryInterface
     */
    // eslint-disable-next-line no-unused-vars
    onceReady(func) {
        throw new NotImplementedException();
    }
}

export default LibraryInterface;
