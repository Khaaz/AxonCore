<a name="DefLogger"></a>

## DefLogger ⇐ <code>Console</code>
**Kind**: global class  
**Extends**: <code>Console</code>  
**Author**: KhaaZ  

* [DefLogger](#DefLogger) ⇐ <code>Console</code>
    * [new DefLogger()](#new_DefLogger_new)
    * [.emerg(input, opt)](#DefLogger+emerg)
    * [.error(input, opt)](#DefLogger+error)
    * [.warn(input, opt)](#DefLogger+warn)
    * [.debug(input, opt)](#DefLogger+debug)
    * [.notice(input, opt)](#DefLogger+notice)
    * [.info(input, opt)](#DefLogger+info)
    * [.verbose(input, opt)](#DefLogger+verbose)
    * [.axon(input)](#DefLogger+axon)
    * [.init(input)](#DefLogger+init)
    * [._initModule(module)](#DefLogger+_initModule)
    * [._initCommand(command)](#DefLogger+_initCommand)
    * [._initSubCmd(sub)](#DefLogger+_initSubCmd)
    * [._initEvent(sub)](#DefLogger+_initEvent)

<a name="new_DefLogger_new"></a>

### new DefLogger()
Default Logger with timestamps and custom methods. Doesn't use any dependencies.

<a name="DefLogger+emerg"></a>

### defLogger.emerg(input, opt)
Major - Critical fault
Crashing bugs, unexpected errors...

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a name="DefLogger+error"></a>

### defLogger.error(input, opt)
Major - critical error

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a name="DefLogger+warn"></a>

### defLogger.warn(input, opt)
Warns - expected errors

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a name="DefLogger+debug"></a>

### defLogger.debug(input, opt)
Eval - Debugging logs

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a name="DefLogger+notice"></a>

### defLogger.notice(input, opt)
Important information

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a name="DefLogger+info"></a>

### defLogger.info(input, opt)
Default information

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a name="DefLogger+verbose"></a>

### defLogger.verbose(input, opt)
Other Logging - executed commands, etc...

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Object</code> | context object |

<a name="DefLogger+axon"></a>

### defLogger.axon(input)
AxonClient information

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type |
| --- | --- |
| input | <code>String</code> | 

<a name="DefLogger+init"></a>

### defLogger.init(input)
Initialisation - Client info

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type |
| --- | --- |
| input | <code>String</code> | 

<a name="DefLogger+_initModule"></a>

### defLogger.\_initModule(module)
Initialisation - Module info

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type |
| --- | --- |
| module | <code>Module</code> | 

<a name="DefLogger+_initCommand"></a>

### defLogger.\_initCommand(command)
Initialisation - Command info

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type |
| --- | --- |
| command | <code>Command</code> | 

<a name="DefLogger+_initSubCmd"></a>

### defLogger.\_initSubCmd(sub)
Initialisation - SubCommand info

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type |
| --- | --- |
| sub | <code>Command</code> | 

<a name="DefLogger+_initEvent"></a>

### defLogger.\_initEvent(sub)
Initialisation - SubCommand info

**Kind**: instance method of [<code>DefLogger</code>](#DefLogger)  

| Param | Type |
| --- | --- |
| sub | <code>Command</code> | 

