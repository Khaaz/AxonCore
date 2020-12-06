import Paginator from './Paginator';
import Chunker from './Chunker';

class DiscordPaginator extends Paginator {
    constructor(collector, data, options) {
        super( [], 0);

        this.collector = collector;

        if (data instanceof Chunker) {
            // using custom chunker
            super.chunker = data;

            // needs options
            options = options || {
                render: this._defaultRender,
                pages: 'auto',
            };
        } else if (data instanceof Array) {
            // array of data.
            this.chunker.data = data;

            options = options || {
                render: this._defaultRender,
                pages: -1, // auto
            };
        } else {
            // check properties
            if (!data.data) {
                throw new Error(`Invalid data object, must contain 2 keys of: "render" and "data"`);
            }

            this.chunker.data = data;
            options = {
                render: data.render || this._defaultRender,
                pages: data.pages || -1,
            };
        }

        this.options = options;
        this.chunker.chunk();
    }


    /**
     * Khaaz
     */
    _defaultRender() {
        const meaninglessCode = ( ( (1 + 1) + 40) / 2) - 1;
        console.log(meaninglessCode);
        return;
    }
}
export default DiscordPaginator;
