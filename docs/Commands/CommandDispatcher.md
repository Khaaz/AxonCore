<a name="Dispatcher"></a>

## Dispatcher ⇐ [<code>Dispatcher</code>](#Dispatcher)
**Kind**: global class  
**Extends**: [<code>Dispatcher</code>](#Dispatcher)  
**Author**: KhaaZ  
**Properties**

| Name | Type |
| --- | --- |
| mentionFormatter | <code>RegExp</code> | 


* [Dispatcher](#Dispatcher) ⇐ [<code>Dispatcher</code>](#Dispatcher)
    * [new Dispatcher()](#new_Dispatcher_new)
    * [.CommandDispatcher](#Dispatcher.CommandDispatcher)
        * [new CommandDispatcher(axon)](#new_Dispatcher.CommandDispatcher_new)

<a name="new_Dispatcher_new"></a>

### new Dispatcher()
Class responsible to call the correct command and correct execution flow when needed.
Dispatch to the correct command on message create event.
Handles prefix resolving and command resolving.

<a name="Dispatcher.CommandDispatcher"></a>

### Dispatcher.CommandDispatcher
**Kind**: static class of [<code>Dispatcher</code>](#Dispatcher)  
<a name="new_Dispatcher.CommandDispatcher_new"></a>

#### new CommandDispatcher(axon)
Creates an instance of CommandDispatcher.


| Param | Type |
| --- | --- |
| axon | <code>Object.&lt;AxonClient&gt;</code> | 

