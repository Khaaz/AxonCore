import NotImplementedException from '../../Errors/NotImplementedException';
import User from './User';
import Member from './Member';
import Message from './Message';
import Channel from './Channel';
import Guild from './Guild';

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
     * @param {Object} botClient - The bot client (lib specific)
     * @param {Object} structs - Object with all structures to use in lib interface
     * @param {Object} structs.User
     * @param {Object} structs.Member
     * @param {Object} structs.Message
     * @param {Object} structs.Channel
     * @param {Object} structs.Guild
     * @param {Object} structs.resolver
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

    get botClient() {
        return this._botClient;
    }

    // eslint-disable-next-line no-unused-vars
    onMessageCreate(func) {
        throw new NotImplementedException();
    }

    // eslint-disable-next-line no-unused-vars
    onceReady(func) {
        throw new NotImplementedException();
    }
}

export default LibraryInterface;
