export declare class Chunker {
     /** @var data Data to chunk */
     public data: any[];
     
     /** @var chunkSize The size of the chunks */
     public readonly chunkSize: number;

     /** @var chunks An array of chunked data */
     public readonly chunks: any[];

     public constructor(chunkData: any[]);

     /**
      * Chunk the data property
      * @param chunkSize - The amount of chunks to generate
      */
     public chunk(chunkSize: number): any[];

     /**
      * Adds a dataset to the current chunks.
      * @param chunkData - Array of data to chunk
      */
     public add(chunkData: any[]): any[];
}