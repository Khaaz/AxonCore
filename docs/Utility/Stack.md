<a name="Stack"></a>

## Stack
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _elements | <code>Array.&lt;T&gt;</code> |  |
| max | <code>Boolean</code> | Maximum number of elements that can be added in this Stack |
| replaceOnMax | <code>Boolean</code> | Whether to replace value when adding if max is reached (unstack first element and stack new element) |


* [Stack](#Stack)
    * [new Stack()](#new_Stack_new)
    * _instance_
        * [.size](#Stack+size) : <code>Number</code>
        * [.first()](#Stack+first) ⇒ <code>T</code>
        * [.stack(elem, [replaceOnMax])](#Stack+stack) ⇒ <code>Boolean</code>
        * [.unstack()](#Stack+unstack) ⇒ <code>T</code>
    * _static_
        * [.Stack](#Stack.Stack)
            * [new Stack([max], [replaceOnMax])](#new_Stack.Stack_new)

<a name="new_Stack_new"></a>

### new Stack()
Stack class.

<a name="Stack+size"></a>

### stack.size : <code>Number</code>
Returns the Stack size

**Kind**: instance property of [<code>Stack</code>](#Stack)  
**Read only**: true  
<a name="Stack+first"></a>

### stack.first() ⇒ <code>T</code>
Return first element of this Stack (top of the Stack).

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+stack"></a>

### stack.stack(elem, [replaceOnMax]) ⇒ <code>Boolean</code>
Stack up an element.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>Boolean</code> - Whether element was successfully added  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>T</code> |  |
| [replaceOnMax] | <code>Boolean</code> | Whether to replace value when adding if max is reached (unstack first element and stack new element) |

<a name="Stack+unstack"></a>

### stack.unstack() ⇒ <code>T</code>
Unstack an element and returns it

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack.Stack"></a>

### Stack.Stack
**Kind**: static class of [<code>Stack</code>](#Stack)  
<a name="new_Stack.Stack_new"></a>

#### new Stack([max], [replaceOnMax])
Creates an instance of Stack.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [max] | <code>Number</code> | <code></code> | Maximum number of elements that can be added in this Stack |
| [replaceOnMax] | <code>Boolean</code> | <code>true</code> | Whether to replace value when adding if max is reached (unstack first element and stack new element) |

