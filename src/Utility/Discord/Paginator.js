/**
 * Paginator class that allows for "Paging" functionality with sets of data.
 * @author Olybear9
 * 
 * @class Paginator
 * 
 * @param {Array<any>} content - The array to paginate.
 * @param {Number} pages - The amount of chunks or "pages" to create with the data.
 */
class Paginator {
    constructor(content = [], pages = 2) {
        this.__data = content;
        this.__chunked = [];
        this.__chunks = pages;
        this.__page = 0;
        this.chunk();
    }

    /**
     * Chunks given data.
     * @param {Number} size - The size of chunks to create.
     * 
     * @returns {Array<any>} - The array of chunked data.
     */
    chunk(size = this.__chunks) {
        for (let i = 0; i < this.__data.length; i++) {
            const index = Math.floor(i / size);

            if (!this.__chunked[index]) {
                this.__chunked[index] = [];
            }

            this.__chunked[index].push(this.__data[i]);
            continue;
        }

        return this.__chunked;
    }

    /**
     * Get a chunk from the chunked data.
     * @param {Number} number - Number of the data chunk to get.
     */
    getChunk(number = 1) {
        if (isNaN(number)) {
            return null;
        }

        if (number <= 0) {
            return null;
        }

        if (!this.__chunked[number]) {
            return false;
        } else {
            return this.__chunked[number];
        }
    }

    /**
     * Alias for getChunk()
     * @param {Number} number - Chunk or "Page" to get.
     */
    getPage(number = 1) {
        this.__page = number;
        return this.getChunk(number - 1);
    }

    /**
     * Gets the current chunk
     * @returns {Array<any>} Array of chunks
     */
    getCurrentPage() {
        return this.getChunk(this.__page);
    }

    /**
     * Gets the next chunk from the current chunk.
     * @returns {Array<any>} Array of chunks
     */
    getNextPage() {
        this.__page++;
        return this.getChunk(this.__page);
    }

    /**
     * Gets the previous chunk
     * @returns {Array<any>} Array of chunks
     */
    getLastPage() {
        this.__page--;
        return this.getChunk(this.__page);
    }

    /**
     * Insert data into the paginator, to chunk.
     * @param {Array<any>} data - Data to insert.
     */
    insert(data) {
        if (!data instanceof Array) {
            return null;
        }

        this.__data.concat(data);
        this.chunk();

        return this.__chunked;
    }

    /**
     * Removes a chunk from the chunked list.
     * @param {Number} number - The number of chunk to remove.
     */
    removeChunk(number) {
        if (!number) {
            return null;
        }

        if (!this.__chunked[number]) {
            delete this.__chunked[number];
            return this.__chunked;
        }
    }

    /**
     * @returns {Number} Length of chunks
     */
    getChunkCount() {
        return this.__chunked.length || 0;
    }

}

export default Paginator;
