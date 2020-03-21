<a name="Embed"></a>

## Embed
**Kind**: global class  
**Author**: DutchVanDerLinde  
**Properties**

| Name | Type |
| --- | --- |
| title | <code>String</code> | 
| url | <code>String</code> | 
| description | <code>String</code> | 
| color | <code>Number</code> | 
| author | <code>Object</code> | 
| author.name | <code>String</code> | 
| [author.url] | <code>String</code> | 
| [author.icon_url] | <code>String</code> | 
| thumbnail | <code>Object</code> | 
| [thumbnail.url] | <code>String</code> | 
|  |  | 
| image | <code>Object</code> | 
| image.url | <code>String</code> | 
| footer | <code>Object</code> | 
| footer.text | <code>String</code> | 
| [footer.icon_url] | <code>String</code> | 
| timestamp | <code>Date</code> | 


* [Embed](#Embed)
    * [new Embed()](#new_Embed_new)
    * _instance_
        * [.setTitle(title)](#Embed+setTitle) ⇒ [<code>Embed</code>](#Embed)
        * [.setDescription(description)](#Embed+setDescription) ⇒ [<code>Embed</code>](#Embed)
        * [.setURL(url)](#Embed+setURL) ⇒ [<code>Embed</code>](#Embed)
        * [.setColor(color)](#Embed+setColor) ⇒ [<code>Embed</code>](#Embed)
        * [.setAuthor(name, icon, url)](#Embed+setAuthor) ⇒ [<code>Embed</code>](#Embed)
        * [.setTimestamp([timestamp])](#Embed+setTimestamp) ⇒ [<code>Embed</code>](#Embed)
        * [.addField(name, value, [inline])](#Embed+addField) ⇒ [<code>Embed</code>](#Embed)
        * [.setThumbnail(url)](#Embed+setThumbnail) ⇒ [<code>Embed</code>](#Embed)
        * [.setImage(url)](#Embed+setImage) ⇒ [<code>Embed</code>](#Embed)
        * [.setFooter(text, [icon])](#Embed+setFooter) ⇒ [<code>Embed</code>](#Embed)
    * _static_
        * [.Embed](#Embed.Embed)
            * [new Embed([data])](#new_Embed.Embed_new)

<a name="new_Embed_new"></a>

### new Embed()
Embed class to create Embed without without using raw json format

<a name="Embed+setTitle"></a>

### embed.setTitle(title) ⇒ [<code>Embed</code>](#Embed)
Sets the title of this embed.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | The title |

**Example**  
```js
Embed.setTitle('My New Embed');
```
<a name="Embed+setDescription"></a>

### embed.setDescription(description) ⇒ [<code>Embed</code>](#Embed)
Sets the description of this embed.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| description | <code>String</code> | The description |

**Example**  
```js
Embed.setDescription('Hi, this is my description!!!');
```
<a name="Embed+setURL"></a>

### embed.setURL(url) ⇒ [<code>Embed</code>](#Embed)
Sets the URL of this embed.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The URL |

<a name="Embed+setColor"></a>

### embed.setColor(color) ⇒ [<code>Embed</code>](#Embed)
Sets the color of this embed.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>Number</code> | The color of the embed |

**Example**  
```js
Embed.setColor(0xFFFFFF);
```
<a name="Embed+setAuthor"></a>

### embed.setAuthor(name, icon, url) ⇒ [<code>Embed</code>](#Embed)
Sets the author of this embed.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the author |
| icon | <code>String</code> | The icon URL of the author |
| url | <code>String</code> | The URL of the author |

**Example**  
```js
Embed.setAuthor('KhaaZ', 'https://www.image.com/khaaz.png');
```
<a name="Embed+setTimestamp"></a>

### embed.setTimestamp([timestamp]) ⇒ [<code>Embed</code>](#Embed)
Sets the timestamp of this embed.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [timestamp] | <code>Date</code> | <code>new Date()</code> | The timestamp |

<a name="Embed+addField"></a>

### embed.addField(name, value, [inline]) ⇒ [<code>Embed</code>](#Embed)
Adds a field to the embed (max 25).

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>String</code> |  | The name of the field |
| value | <code>String</code> |  | The value of the field |
| [inline] | <code>Boolean</code> | <code>false</code> | Set the field to display inline |

**Example**  
```js
Embed.addField('My Field', 'This is a new field!', true);
```
<a name="Embed+setThumbnail"></a>

### embed.setThumbnail(url) ⇒ [<code>Embed</code>](#Embed)
Set the thumbnail of this embed.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The URL of the thumbnail |

<a name="Embed+setImage"></a>

### embed.setImage(url) ⇒ [<code>Embed</code>](#Embed)
Sets the image of this embed

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The URL of the image |

**Example**  
```js
Embed.setImage('https://www.image.com/myImageUrl.png');
```
<a name="Embed+setFooter"></a>

### embed.setFooter(text, [icon]) ⇒ [<code>Embed</code>](#Embed)
Sets the footer of this embed.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text of the footer |
| [icon] | <code>String</code> | The icon URL of the footer |

**Example**  
```js
Embed.setFooter('My Footer', 'https://www.image.com/footer.png');
```
<a name="Embed.Embed"></a>

### Embed.Embed
**Kind**: static class of [<code>Embed</code>](#Embed)  
<a name="new_Embed.Embed_new"></a>

#### new Embed([data])
An embed to be sent with a message with a fluent interface for creation.


| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>Object</code> | Data to set in the rich embed |
| [data.title] | <code>String</code> |  |
| [data.url] | <code>String</code> |  |
| [data.description] | <code>String</code> |  |
| [data.color] | <code>Number</code> |  |
| [data.author] | <code>Object</code> |  |
| data.author.name | <code>String</code> |  |
| [data.author.url] | <code>String</code> |  |
| [data.author.icon_url] | <code>String</code> |  |
| [data.thumbnail] | <code>Object</code> |  |
| data.thumbnail.url | <code>String</code> |  |
|  |  |  |
| [data.image] | <code>Object</code> |  |
| data.image.url | <code>String</code> |  |
| [data.footer] | <code>Object</code> |  |
| data.footer.text | <code>String</code> |  |
| [data.footer.icon_url] | <code>String</code> |  |
| [data.timestamp] | <code>Date</code> |  |

