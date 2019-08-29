<a name="Module"></a>

## Module ⇐ <code>Base</code>
**Kind**: global class  
**Extends**: <code>Base</code>  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>String</code> |  | Module label (name/id) |
| commands | <code>Collection.&lt;Command&gt;</code> |  | Collection of commands in the module [key: label, value: command Obj] |
| listeners | <code>Collection.&lt;Listener&gt;</code> |  | Collection of events in the module [key: label, value: listener Obj] |
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
        * [.enabled](#Module+enabled)
        * [.infos](#Module+infos)
        * [.permissions](#Module+permissions)
        * [.commandLoader](#Module+commandLoader)
        * [.init([commands], [listeners])](#Module+init)
    * _static_
        * [.Module](#Module.Module)
            * [new Module(client)](#new_Module.Module_new)

<a name="new_Module_new"></a>

### new Module()
AxonCore Module.
A Module holds commands and listeners.
It also has default CommandOptions and CommandPermissions that can potentially be used as base when creating a Command.

<a name="Module+commands"></a>

### module.commands
Containments - all commands and events within this module

**Kind**: instance property of [<code>Module</code>](#Module)  
<a name="Module+enabled"></a>

### module.enabled
Default options and params

**Kind**: instance property of [<code>Module</code>](#Module)  
<a name="Module+infos"></a>

### module.infos
Info for the help command
All fields are required

**Kind**: instance property of [<code>Module</code>](#Module)  
<a name="Module+permissions"></a>

### module.permissions
Default CommandPermissions at the module level

**Kind**: instance property of [<code>Module</code>](#Module)  
<a name="Module+commandLoader"></a>

### module.commandLoader
Loaders

**Kind**: instance property of [<code>Module</code>](#Module)  
<a name="Module+init"></a>

### module.init([commands], [listeners])
Init a module with all commands and events.
Called at the end of every module contructor with correct parameters.

**Kind**: instance method of [<code>Module</code>](#Module)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [commands] | <code>Object.&lt;Commands&gt;</code> | <code></code> | Object containing all commands |
| [listeners] | <code>Object.&lt;Listener&gt;</code> | <code></code> | Object containing all listeners |

<a name="Module.Module"></a>

### Module.Module
**Kind**: static class of [<code>Module</code>](#Module)  
<a name="new_Module.Module_new"></a>

#### new Module(client)
Creates a Module instance.


| Param | Type |
| --- | --- |
| client | <code>Object.&lt;AxonClient&gt;</code> | 

