<a name="AutoQueue"></a>

## AutoQueue
**Kind**: global class  
**Khaaz**:   

* [AutoQueue](#AutoQueue)
    * [new AutoQueue()](#new_AutoQueue_new)
    * [.exec()](#AutoQueue+exec)

<a name="new_AutoQueue_new"></a>

### new AutoQueue()
This data structure is a queue that will run every function one by one sequentially.
It will run indifferently synchrones and asynchrones functions. Making sure the previous function is over before starting the next one. It will essentially wait for the previous function to be finished before running the next one.
It has no return value, it will just run the function added sometimes in the future.

The queue can be auto executed on add or the execution can be delayed.

<a name="AutoQueue+exec"></a>

### autoQueue.exec()
Execute the queue.

**Kind**: instance method of [<code>AutoQueue</code>](#AutoQueue)  
