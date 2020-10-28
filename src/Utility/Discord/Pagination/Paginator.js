import Chunker from './Chunker';

/**
 * Paginator Constructor
 * @param {Chunker|any[]} data 
 * @param {number} pages
 */
class Paginator {
     /** @var {Chunker} chunker */
     chunker;

     /** @var {number} page */
     page;

     constructor(data = [], pages = 2) {
          // check type of data.
          if (data instanceof Chunker) {
               this.chunker = data;
          }

          if (data instanceof Array) {
               this.chunker = new Chunker(data);
          } else {
               throw new TypeError('Parameter "data" must be a type of Chunker or Array');
          }

          this.pages = pages;
     }

     /**
      * @todo Should we implement pages where it will index at 0 if a given page is invalid.
      */
     getPreviousPage() {
          if (!this.pages[--this.page]) {
               throw new RangeError('Page out of bounds');
          }
          return this.pages[this.page];
     }

     /**
      * @todo Should we implement pages where it will index at 0 if a given page is invalid.
      */
     getNextPage() {
          if (!this.pages[++this.page]) {
               throw new RangeError('Page out of bounds');
          }
          return this.pages[this.page];
     }

     /**
      * Gets a specific page in the chunked data
      * @param {number} number 
      */
     getPage(number = null) {
          this.page = number || this.page;

          if (!this.pages[this.page]) {
               this.page = 0;
          }

          return this.pages[this.page];
     }

     /**
      * Adds a page to the paginator
      * @param {any} data - Data to add
      */
     addPage(data) {
          return this.chunker.add(data);
     }

     /**
      * Gets all the pages as an array
      */
     get pages() {
          return this.chunker.chunks;
     }

     /**
      * Gets the data 
      */
     get data() {
          return this.chunker.data;
     }
}
export default Paginator;