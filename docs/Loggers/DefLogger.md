<a id="deflogger"></a>

## DefLogger ⇐ <code>Console</code>
Default Logger with timestamps and custom methods. Doesn't use any dependencies.  

**Kind**: global class  
**Extends**: <code>Console</code>  
**Author**: KhaaZ  

[DefLogger](#DefLogger) ⇐ <code>Console</code>
- _static_
  - [DefLogger](#DefLogger)
    - [new DefLogger()](#DefLogger_new)
- _instance_
  - [emerg(input, opt)](#emerg)
  - [error(input, opt)](#error)
  - [warn(input, opt)](#warn)
  - [debug(input, opt)](#debug)
  - [notice(input, opt)](#notice)
  - [info(input, opt)](#info)
  - [verbose(input, opt)](#verbose)
  - [axon(input)](#axon)
  - [init(input)](#init)

<a id="deflogger_new"></a>

### new DefLogger()
A default Logger that has time and custom methods.  
A context Object is made as:  

| Param | Type | Description |
| --- | --- | --- |
| [context] | <code>Object</code> | Optional Object to pass with contextual informations |
| [context.guildObj] | <code>Object</code> | The guild Object |
| [context.cmd] | <code>String</code> | The command name |
| [context.user] | <code>Object</code> | The user Object |

<a id="emerg"></a>

### emerg(input, opt)
Major - Critical fault  
Crashing bugs, unexpected...

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a id="error"></a>

### error(input, opt)
Major - critical error

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a id="warn"></a>

### warn(input, opt)
Warnings - Expected errors

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a id="debug"></a>

### debug(input, opt)
Eval - Debugging logs

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a id="notice"></a>

### notice(input, opt)
Important information

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a id="info"></a>

### info(input, opt)
Default information

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a id="verbose"></a>

### verbose(input, opt)
Other logs - executed commands, etc...

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a id="axon"></a>

### axon(input)
AxonClient information

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type |
| --- | --- |
| input | <code>String</code> | 

<a id="init"></a>

### init(input)
Initialization - Client info

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type |
| --- | --- |
| input | <code>String</code> | 
