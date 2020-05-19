<a name="ALogger"></a>

## *ALogger*
**Kind**: global abstract class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| out | <code>\*</code> | Can be Console, Winston or Signale. Chalk will go as Console |
| type | <code>LOGGER\_TYPES</code> | The logger type |


* *[ALogger](#ALogger)*
    * *[new ALogger()](#new_ALogger_new)*
    * _instance_
        * *[.fatal(input, opt)](#ALogger+fatal)*
        * *[.error(input, opt)](#ALogger+error)*
        * *[.warn(input, opt)](#ALogger+warn)*
        * *[.debug(input, opt)](#ALogger+debug)*
        * *[.notice(input, opt)](#ALogger+notice)*
        * *[.info(input, opt)](#ALogger+info)*
        * *[.verbose(input, opt)](#ALogger+verbose)*
    * _static_
        * *[.ALogger](#ALogger.ALogger)*
            * [new ALogger(out, [type])](#new_ALogger.ALogger_new)

<a name="new_ALogger_new"></a>

### *new ALogger()*
Abstract Logger, based to create all loggers used in AxonCore.

<a name="ALogger+fatal"></a>

### *aLogger.fatal(input, opt)*
Major - Critical fault
Crashing bugs, unexpected errors...

**Kind**: instance method of [<code>ALogger</code>](#ALogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Context</code> | context object |

<a name="ALogger+error"></a>

### *aLogger.error(input, opt)*
Major - critical error

**Kind**: instance method of [<code>ALogger</code>](#ALogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Context</code> | context object |

<a name="ALogger+warn"></a>

### *aLogger.warn(input, opt)*
Warns - expected errors

**Kind**: instance method of [<code>ALogger</code>](#ALogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Context</code> | context object |

<a name="ALogger+debug"></a>

### *aLogger.debug(input, opt)*
Eval - Debugging logs

**Kind**: instance method of [<code>ALogger</code>](#ALogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Context</code> | context object |

<a name="ALogger+notice"></a>

### *aLogger.notice(input, opt)*
Important information

**Kind**: instance method of [<code>ALogger</code>](#ALogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Context</code> | context object |

<a name="ALogger+info"></a>

### *aLogger.info(input, opt)*
Default information

**Kind**: instance method of [<code>ALogger</code>](#ALogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Context</code> | context object |

<a name="ALogger+verbose"></a>

### *aLogger.verbose(input, opt)*
Other Logging - executed commands, etc...

**Kind**: instance method of [<code>ALogger</code>](#ALogger)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>String</code> |  |
| opt | <code>Context</code> | context object |

<a name="ALogger.ALogger"></a>

### *ALogger.ALogger*
**Kind**: static class of [<code>ALogger</code>](#ALogger)  
<a name="new_ALogger.ALogger_new"></a>

#### new ALogger(out, [type])
Creates an instance of ALogger


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| out |  |  | Can be Console, Winston or Signale. Chalk will go as Console |
| [type] | <code>LOGGER\_TYPES</code> | <code>0</code> | The logger type |

