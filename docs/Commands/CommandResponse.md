<a name="CommandResponse"></a>

## CommandResponse
**Kind**: global class  
**Properties**

| Name | Type |
| --- | --- |
| success | <code>Boolean</code> | 
| triggerCooldown | <code>Boolean</code> | 
| error | <code>Error</code> \| <code>null</code> | 


* [CommandResponse](#CommandResponse)
    * [new CommandResponse()](#new_CommandResponse_new)
    * _instance_
        * [.resolve()](#CommandResponse+resolve) ⇒ [<code>Promise.&lt;CommandResponse&gt;</code>](#CommandResponse)
        * [.resolveAsync()](#CommandResponse+resolveAsync) ⇒ [<code>Promise.&lt;CommandResponse&gt;</code>](#CommandResponse)
        * [.resolveSync()](#CommandResponse+resolveSync) ⇒ [<code>CommandResponse</code>](#CommandResponse)
    * _static_
        * [.CommandResponse](#CommandResponse.CommandResponse)
            * [new CommandResponse([data])](#new_CommandResponse.CommandResponse_new)

<a name="new_CommandResponse_new"></a>

### new CommandResponse()
Build a Command Response - the formatted object used internally by the framework to resolve context.

<a name="CommandResponse+resolve"></a>

### commandResponse.resolve() ⇒ [<code>Promise.&lt;CommandResponse&gt;</code>](#CommandResponse)
By default returns the Command Response asynchronously.

**Kind**: instance method of [<code>CommandResponse</code>](#CommandResponse)  
<a name="CommandResponse+resolveAsync"></a>

### commandResponse.resolveAsync() ⇒ [<code>Promise.&lt;CommandResponse&gt;</code>](#CommandResponse)
Returns the Command Response in a Promise (asynchronously)

**Kind**: instance method of [<code>CommandResponse</code>](#CommandResponse)  
<a name="CommandResponse+resolveSync"></a>

### commandResponse.resolveSync() ⇒ [<code>CommandResponse</code>](#CommandResponse)
Returns the Command Response (synchronously)

**Kind**: instance method of [<code>CommandResponse</code>](#CommandResponse)  
<a name="CommandResponse.CommandResponse"></a>

### CommandResponse.CommandResponse
**Kind**: static class of [<code>CommandResponse</code>](#CommandResponse)  
<a name="new_CommandResponse.CommandResponse_new"></a>

#### new CommandResponse([data])
Creates an instance of CommandResponse.
Build the CommandResponse from all options given in parameters


| Param | Type | Default |
| --- | --- | --- |
| [data] | <code>Object</code> | <code>{}</code> | 
| [data.success] | <code>Boolean</code> | <code>true</code> | 
| [data.triggerCooldown] | <code>Boolean</code> | <code>true</code> | 
| [data.error] | <code>Error</code> | <code></code> | 

