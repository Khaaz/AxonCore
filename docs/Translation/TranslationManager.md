## Classes

<dl>
<dt><a href="#TranslationManager">TranslationManager</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Languages">Languages</a> : <code>Object.&lt;string, AxonLanguageResponse&gt;</code></dt>
<dd></dd>
</dl>

<a name="TranslationManager"></a>

## TranslationManager
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| _manager | <code>[MessageManager](Translation/MessageManager)</code> |  |  |
| [lang] | <code>String</code> | <code>&#x27;english&#x27;</code> | The default lang |


* [TranslationManager](#TranslationManager)
    * [new TranslationManager()](#new_TranslationManager_new)
    * _instance_
        * [.messages](#TranslationManager+messages) : [<code>Languages</code>](#Languages)
        * [.getMessages(lang)](#TranslationManager+getMessages) ⇒ <code>AxonLanguageResponse</code>
        * [.getMessage(message, lang)](#TranslationManager+getMessage) ⇒ <code>String</code>
    * _static_
        * [.TranslationManager](#TranslationManager.TranslationManager)
            * [new TranslationManager(manager, lang)](#new_TranslationManager.TranslationManager_new)

<a name="new_TranslationManager_new"></a>

### new TranslationManager()
Class dedicated to manage translations.
Holds all translations and get the message for the default lang or the specified lang.

<a name="TranslationManager+messages"></a>

### translationManager.messages : [<code>Languages</code>](#Languages)
Returns all messages (all langs)

**Kind**: instance property of [<code>TranslationManager</code>](#TranslationManager)  
**Read only**: true  
<a name="TranslationManager+getMessages"></a>

### translationManager.getMessages(lang) ⇒ <code>AxonLanguageResponse</code>
Return all messages for the specified lang or the default lang if no specified lang.

**Kind**: instance method of [<code>TranslationManager</code>](#TranslationManager)  

| Param | Type |
| --- | --- |
| lang | <code>String</code> | 

<a name="TranslationManager+getMessage"></a>

### translationManager.getMessage(message, lang) ⇒ <code>String</code>
Return a specified message for the specified lang or the default lang if no specified lang

**Kind**: instance method of [<code>TranslationManager</code>](#TranslationManager)  

| Param | Type |
| --- | --- |
| message | <code>String</code> | 
| lang | <code>String</code> | 

<a name="TranslationManager.TranslationManager"></a>

### TranslationManager.TranslationManager
**Kind**: static class of [<code>TranslationManager</code>](#TranslationManager)  
<a name="new_TranslationManager.TranslationManager_new"></a>

#### new TranslationManager(manager, lang)
Creates an instance of TranslationManager.


| Param | Type |
| --- | --- |
| manager | <code>[MessageManager](Translation/MessageManager)</code> | 
| lang | <code>String</code> | 

<a name="Languages"></a>

## Languages : <code>Object.&lt;string, AxonLanguageResponse&gt;</code>
**Kind**: global typedef  
