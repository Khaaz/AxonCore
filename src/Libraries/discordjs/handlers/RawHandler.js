import AHandler from 'axoncore/src/Core/Event/AHandler';

class RawHandler extends AHandler {
    handle(payload) {
        return payload;
    }
}

export default RawHandler;
