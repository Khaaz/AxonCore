<a name="AxonError"></a>

## AxonError ⇐ <code>Error</code>
**Kind**: global class  
**Extends**: <code>Error</code>  
**Author**: KhaaZ  

* [AxonError](#AxonError) ⇐ <code>Error</code>
    * [new AxonError()](#new_AxonError_new)
    * [.AxonError](#AxonError.AxonError)
        * [new AxonError(message, module, [subModule])](#new_AxonError.AxonError_new)

<a name="new_AxonError_new"></a>

### new AxonError()
Custom error with better formatting + information about wherethe erroris originated from.
Used for errors thrown by the client (Object validity / internal). (general error)

<a name="AxonError.AxonError"></a>

### AxonError.AxonError
**Kind**: static class of [<code>AxonError</code>](#AxonError)  
<a name="new_AxonError.AxonError_new"></a>

#### new AxonError(message, module, [subModule])
Creates an instance of AxonError.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>String</code> |  | custom error message |
| module | <code>Module</code> \| <code>String</code> |  | Module in which the error originated from |
| [subModule] | <code>String</code> | <code></code> | Module in which the error originated from |

