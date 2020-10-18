import NoAbstractInstanceException from '../../../Errors/NoAbstractInstanceException';
import Paginator from './Paginator';

/**
 * To Do:
 * - you give them a collector (reaction or message: you can wait fo rmy update on collectors that will makes then slightly easier to use)
 * - you give them a list of page to render as discord embeds
 * - you need to be able to have one instance of the paginator per list of pages (aka not having to recreate at every command run) that you call several time to send the pages (I think? but not sure about this one)
 * - you need to be able to call the paginator with just the page number for both react and message and it shows the called page. Then it acts as a regular paginator.
 * - There should be a different way to call the paginator (maybe can be when you create a paginator and not a MessagePaginator / ReactionPaginator but not sure about that). The only thing I want is that when you call this Paginator with a different method, you get the correct page rendered but it doesn't await anything, doesn't put reaction or anything
 **/
class DiscordPaginator extends Paginator {
     /**
      * 
      * @param {Collector} collector - Any collector
      * @param {Chunker|any[]|any} data - Data option 
      * @param {} options 
      */
     constructor(collector, data, options) {
          if (this.constructor.name === 'DiscordPaginator') {
               throw new NoAbstractInstanceException();
          }
     }
}
export default DiscordPaginator;