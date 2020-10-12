import Chunker from './Chunker';

/**
 * To Do:
 * - ~~chunker that directly handle the data to output~~
 * - renderer that display the data needed like we want
 * - navigator that will take user input and call the rendered to correctly render the data
 **/
class Paginator {
     /** @var {Chunker} chunker */
     #chunker;
     /** @var {Function<any[]>} */
     #renderFunc;

     constructor(data = [], pages = 2, closure) {
          this.#chunker = new Chunker(data);
          this.#chunker.chunk(pages);
          this.#renderFunc = closure;
     }

     /**
      * Unsure what to do here @Khaaz
      */
     render(data) {
          return this.#renderFunc(data);
     }

     get pages() {
          return this.#chunker.chunks;
     }
}
export default Paginator;