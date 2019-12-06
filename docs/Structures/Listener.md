<a name="Listener"></a>

## Listener ⇐ <code>Base</code>
**Kind**: global class  
**Extends**: <code>Base</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| _module | <code>Object.&lt;Module&gt;</code> |  | Module instance |
| eventName | <code>String</code> |  | The discord event name |
| label | <code>String</code> |  | The listener name |
| load | <code>Boolean</code> |  | Whether to load this event on startup or not |
| [enabled] | <code>Boolean</code> | <code>module.enabled</code> | Whether the event is enabled or not |
| [serverBypass] | <code>Boolean</code> | <code>module.serverBypass</code> | Can the event be disabled? |
| infos | <code>Object</code> |  | Default infos about the event |
| infos.owners | <code>Array</code> |  | Listener owners/authors |
| infos.description | <code>String</code> |  | Listener description |


* [Listener](#Listener) ⇐ <code>Base</code>
    * [new Listener()](#new_Listener_new)
    * _instance_
        * [.module](#Listener+module) : <code>Object.&lt;Module&gt;</code>
        * [._execute(guildConfig, ...args)](#Listener+_execute) ⇒ <code>Promise</code>
    * _static_
        * [.Listener](#Listener.Listener)
            * [new Listener(module)](#new_Listener.Listener_new)

<a name="new_Listener_new"></a>

### new Listener()
Default Listener class
Extends Listener to create an event

<a name="Listener+module"></a>

### listener.module : <code>Object.&lt;Module&gt;</code>
Returns the parent Module instance

**Kind**: instance property of [<code>Listener</code>](#Listener)  
**Read only**: true  
<a name="Listener+_execute"></a>

### listener.\_execute(guildConfig, ...args) ⇒ <code>Promise</code>
Promisify the return execute return to prevent promise issue

**Kind**: instance method of [<code>Listener</code>](#Listener)  

| Param | Type | Description |
| --- | --- | --- |
| guildConfig | <code>Object</code> | the guildConfig or undefined if not a guild event |
| ...args | <code>Array</code> | Array of the events arguments |

<a name="Listener.Listener"></a>

### Listener.Listener
**Kind**: static class of [<code>Listener</code>](#Listener)  
<a name="new_Listener.Listener_new"></a>

#### new Listener(module)
Creates an Listener instance.


| Param | Type |
| --- | --- |
| module | <code>Object.&lt;Module&gt;</code> | 

