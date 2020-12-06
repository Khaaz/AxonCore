import { Chunker } from './Chunker';
export declare class Paginator {
     /** @var pages Array of chunks */
     public readonly pages: any[];

     /** @var data Array of data (not in chunks) */
     public readonly data: any[];

     public constructor(data: Chunker|any[]);

     /**
      * Gets the previous page from the current page.
      */
     public getPreviousPage(): any[];

     /**
      * Gets the next page from the current page.
      */
     public getNextPage(): any[];

     /**
      * Returns the given page, if non-existant, the first page is returned.
      * If no page is given, the current page is returned.
      * @param page - The page number to get
      */
     public getPage(page?: number): any[];

     /**
      * Appends a page to the current data.
      * @param page - Page of data to add.
      */
     public addPage(page: any[]): any[];
}