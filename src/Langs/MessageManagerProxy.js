function createMessageManagerProxy(_messageManager) {
    const handler = {
        get(t, name) {
            const path = [];
            const MessageManagerProxy = (args, lang) => {
                if ( (args !== undefined && typeof args !== 'object') || (lang !== undefined && typeof lang !== 'string') ) {
                    throw new TypeError('INVALID_TYPE_IN_PARAMETER');
                }
                return path.length ? _messageManager.get(path.join('.'), args, lang) : _messageManager;
            };
            
            if (name === undefined || typeof name === 'symbol' || (!path.length && name === 'then') ) {
                return t; // MessageManager
            }

            const handlerLoop = {
                get(obj, prop) {
                    console.log('handlerLoop prop: ', prop); console.log('path: ', path);
                    if (prop === undefined || typeof prop === 'symbol') {
                        return obj;
                    }
                    return prop in obj ? obj[prop] : (path.push(prop) && new Proxy(MessageManagerProxy, handlerLoop) );
                },
            };
            return name in t ? t[name] : (path.push(name) && new Proxy(MessageManagerProxy, handlerLoop) );
        },
    };
    return new Proxy(_messageManager, handler);
}

export default createMessageManagerProxy;
