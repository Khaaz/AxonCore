<a name="Module"></a>

## Module ⇐ <code>Base</code>
**Kind**: global class  
**Extends**: <code>Base</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>String</code> |  | Module label (name/id) |
| [enabled] | <code>Boolean</code> | <code>true</code> | Whether the module is enabled or not |
| [serverBypass] | <code>Boolean</code> | <code>false</code> | Whether the module can be disabled or not (will bypass guild disabled) |
| info | <code>Object</code> |  | Default info about the module |
| [info.name] | <code>String</code> |  |  |
| [info.category] | <code>String</code> |  |  |
| [info.description] | <code>String</code> |  |  |
| permissions | <code>Object.&lt;CommandPermissions&gt;</code> |  | Default values potentially used for CommandPermissions |
| options | <code>Object.&lt;CommandOptions&gt;</code> |  | Default values potentially used  for CommandOptions |
| commandLoader | <code>Object.&lt;CommandLoader&gt;</code> |  | Load all commands in the module / register / unregister |
| listenerLoader | <code>Object.&lt;ListenerLoader&gt;</code> |  | Load all events in the module / register / unregister |


* [Module](#Module) ⇐ <code>Base</code>
    * [new Module()](#new_Module_new)
    * _instance_
        * [.commands](#Module+commands)
        * [.listeners](#Module+listeners)
        * [._init()](#Module+_init)
        * [.init()](#Module+init) ⇒ <code>Object.&lt;{Commands, Listeners}&gt;</code>
    * _static_
        * [.Module](#Module.Module)
            * [new Module(client, [data])](#new_Module.Module_new)

<a name="new_Module_new"></a>

### new Module()
AxonCore Module.
A Module holds commands and listeners.
It also has default CommandOptions and CommandPermissions that can potentially be used as base when creating a Command.

<a name="Module+commands"></a>

### module.commands
A Collection of all commands the module holds

**Kind**: instance property of [<code>Module</code>](#Module)  
**Read only**: true  
<a name="Module+listeners"></a>

### module.listeners
A Collection of all listeners the module holds

**Kind**: instance property of [<code>Module</code>](#Module)  
**Read only**: true  
<a name="Module+_init"></a>

### module.\_init()
Init a module with all commands and listeners.

**Kind**: instance method of [<code>Module</code>](#Module)  
<a name="Module+init"></a>

### module.init() ⇒ <code>Object.&lt;{Commands, Listeners}&gt;</code>
Override this method to returns { commands, listeners }

**Kind**: instance method of [<code>Module</code>](#Module)  
**Returns**: <code>Object.&lt;{Commands, Listeners}&gt;</code> - An object containing commands and listeners to initialise. { commands, listeners}  
<a name="Module.Module"></a>

### Module.Module
**Kind**: static class of [<code>Module</code>](#Module)  
<a name="new_Module.Module_new"></a>

#### new Module(client, [data])
Creates a Module instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| client | <code>Object.&lt;AxonClient&gt;</code> |  |  |
| [data] | <code>Object</code> | <code>{}</code> | All module parameters |
| [data.label] | <code>String</code> |  | The module label |
| [data.enabled] | <code>Boolean</code> |  | Whether the module is enabled or not |
| [data.serverBypass] | <code>Boolean</code> |  | Whether the module can be disabled in a server or not |
| [data.infos] | <code>Object</code> |  |  |
| [data.options] | <code>Object.&lt;CommandOptions&gt;</code> \| <code>Object</code> |  | The default options for all commands in this module |
| [data.permissions] | <code>Object.&lt;CommandPermissions&gt;</code> \| <code>Object</code> |  | The default permissions for all commands in this module |

