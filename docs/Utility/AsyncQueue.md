<a name="AsyncQueue"></a>

## AsyncQueue ⇐ <code>FunctionQueue</code>
**Kind**: global class  
**Extends**: <code>FunctionQueue</code>  
**Author**: KhaaZ  

* [AsyncQueue](#AsyncQueue) ⇐ <code>FunctionQueue</code>
    * [new AsyncQueue()](#new_AsyncQueue_new)
    * [.exec()](#AsyncQueue+exec)
    * [.add(func, [toExec], ...args)](#AsyncQueue+add) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.createClosure(fn, resolve, reject, ...args)](#AsyncQueue+createClosure) ⇒ <code>Promise.&lt;function()&gt;</code>

<a name="new_AsyncQueue_new"></a>

### new AsyncQueue()
This data structure is a queue that will run every function one by one sequentially.
It will run indifferently synchronous and asynchronous functions. Making sure the previous one is over before starting the next one. It will essentially wait for the previous function to be finished before running the next one.
A Promise is returned on add. This promise will resolve or reject when the function is ran.

The queue can be auto executed on add or the execution can be delayed.

<a name="AsyncQueue+exec"></a>

### asyncQueue.exec()
Execute the queue.

**Kind**: instance method of [<code>AsyncQueue</code>](#AsyncQueue)  
<a name="AsyncQueue+add"></a>

### asyncQueue.add(func, [toExec], ...args) ⇒ <code>Promise.&lt;any&gt;</code>
Adds a function to the queue.
Automatically will wrap the function in a closure to keep the function context.
Will also create a Promise that will be returned and will be resolved with the actual data.

**Kind**: instance method of [<code>AsyncQueue</code>](#AsyncQueue)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| func | <code>function</code> |  | The function to run |
| [toExec] | <code>Boolean</code> | <code>true</code> | Whether to auto exec the queue on add or not. |
| ...args | <code>any</code> |  | All arguments the function needs |

<a name="AsyncQueue+createClosure"></a>

### asyncQueue.createClosure(fn, resolve, reject, ...args) ⇒ <code>Promise.&lt;function()&gt;</code>
**Kind**: instance method of [<code>AsyncQueue</code>](#AsyncQueue)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 
| resolve |  | 
| reject |  | 
| ...args | <code>any</code> | 

