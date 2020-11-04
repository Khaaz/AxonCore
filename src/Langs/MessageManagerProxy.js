/**
Message Manager proxy - this allows the user to efficiently access the translation strings directly and dynamically by doing <Base>.l.transationProps().
The user will map to the translation string they want then call a function on that string which will return that translation.

E.g. if the user had the following in the translation file:
```json
{
    "english": {
        "greeting": {
            "join": "Hello there {{user}}!"
        }
    }
}
```
They would use `this.l.greeting.join({ user: joinedMember.mention }, 'english')`. They can also view the default translation by calling the function without any arguments.

Due to how JavaScript works, evaluating a non resolved translation (i.e. `this.axon.l.function.not.called`) using `await` will cause an error to throw.
This is unavoidable and you will just need to put up with it.

However, if normal properties of MessageManager or itself need to be accessed, then the MessageManager class will be resolved instead.
This allows the user to still access whatever they need with flexibility and full control.

Technical overview:
We are creating one Proxy wrapping the MessageManager. This Proxy will create an empty `path` upon every call to MessageManager.
If there is any property called after MessageManager we will enter in a second Proxy: the Proxy-Loop which will loop through all properties to create an array of string properties.
This allows us then to call messageManager.get() method to resolve the actual property in the language object.
*/
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
