<a id="event"></a>

## Event ⇐ <code>Base</code>
**Kind**: global class  
**Extends**: <code>Base</code>  
**Author**: KhaaZ  

[Event](#Event) ⇐ <code>Base</code>
- _static_
    - [Event](#Event)
        - [new Event(module)](#Event_new)

<a id="event"></a>

### Event
**Kind**: static class of [<code>Event</code>](#Event)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| axon | <code>Object.&lt;AxonClient&gt;</code> |  | Axon Client [GETTER: _axon] |
| bot | <code>Object.&lt;Eris.Client&gt;</code> |  | Eris bot Client [GETTER: _axon.client] |
| Logger | <code>Object</code> |  | Logger Object/Methods [GETTER: axon.Logger] |
| AxonUtils | <code>Object</code> |  | AxonUtils Object/Methods [GETTER: axon.AxonUtils] |
| Utils | <code>Object</code> |  | Utils Object/Methods [GETTER: axon.Utils] |
| module | <code>Object.&lt;Module&gt;</code> |  | Module object [GETTER: _module] |
| eventName | <code>String</code> |  | The discord event name |
| label | <code>String</code> |  | The function name |
| load | <code>Boolean</code> |  | Whether to load this event on startup or not |
| [enabled] | <code>Boolean</code> | <code>module.enabled</code> | Whether the event is enabled or not |
| [serverBypass] | <code>Boolean</code> | <code>module.serverBypass</code> | Can the event be disabled? |
| infos | <code>Object</code> |  | Default infos about the event |
| infos.owners | <code>Array</code> |  | Event owners/authors |
| infos.description | <code>String</code> |  | Event description |

<a id="event_new"></a>

#### new Event(module)
Creates an Instance of Event.


| Param | Type |
| --- | --- |
| module | <code>Object.&lt;Module&gt;</code> | 

