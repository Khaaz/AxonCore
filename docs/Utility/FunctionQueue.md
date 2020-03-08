<a name="FunctionQueue"></a>

## FunctionQueue
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| _functions | <code>Queue.&lt;function()&gt;</code> |  | The queue of function |
| [_running] | <code>Boolean</code> | <code>false</code> | Whether the FunctionQueue is running. |
| [stopOnError] | <code>Boolean</code> | <code>false</code> | Whether to stop the FunctionQueue execution on error. |


* [FunctionQueue](#FunctionQueue)
    * [new FunctionQueue()](#new_FunctionQueue_new)
    * _instance_
        * [._functions](#FunctionQueue+_functions) : <code>Queue.&lt;function()&gt;</code>
        * [.exec()](#FunctionQueue+exec)
        * [.add(func, [toExec], ...args)](#FunctionQueue+add)
        * [.createClosure(fn, ...args)](#FunctionQueue+createClosure) ⇒ <code>unknown</code>
    * _static_
        * [.FunctionQueue](#FunctionQueue.FunctionQueue)
            * [new FunctionQueue([stopOnError])](#new_FunctionQueue.FunctionQueue_new)

<a name="new_FunctionQueue_new"></a>

### new FunctionQueue()
This default FunctionQueue works in a synchronous fashion.
It will execute all synchronous functions sequentially.
Any error will be caught and unless specified otherwise won't break the FunctionQueue execution.
The FunctionQueue can be auto executed on add or the execution can be delayed.

<a name="FunctionQueue+_functions"></a>

### functionQueue.\_functions : <code>Queue.&lt;function()&gt;</code>
**Kind**: instance property of [<code>FunctionQueue</code>](#FunctionQueue)  
<a name="FunctionQueue+exec"></a>

### functionQueue.exec()
Execute the FunctionQueue

**Kind**: instance method of [<code>FunctionQueue</code>](#FunctionQueue)  
<a name="FunctionQueue+add"></a>

### functionQueue.add(func, [toExec], ...args)
Adds a function to the FunctionQueue.
Automatically will wrap the function in a closure to keep the function context.

**Kind**: instance method of [<code>FunctionQueue</code>](#FunctionQueue)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func | <code>function</code> |  | The function to run |
| [toExec] | <code>Boolean</code> | <code>true</code> | Whether to auto exec the FunctionQueue on add or not. |
| ...args | <code>any</code> |  | All arguments the function needs |

<a name="FunctionQueue+createClosure"></a>

### functionQueue.createClosure(fn, ...args) ⇒ <code>unknown</code>
**Kind**: instance method of [<code>FunctionQueue</code>](#FunctionQueue)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 
| ...args | <code>any</code> | 

<a name="FunctionQueue.FunctionQueue"></a>

### FunctionQueue.FunctionQueue
**Kind**: static class of [<code>FunctionQueue</code>](#FunctionQueue)  
<a name="new_FunctionQueue.FunctionQueue_new"></a>

#### new FunctionQueue([stopOnError])
Creates an instance of FunctionQueue.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [stopOnError] | <code>Boolean</code> | <code>false</code> | Whether to stop the FunctionQueue execution on error. |

