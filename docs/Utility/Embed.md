<a id="embed"></a>

## Embed
Embed class to create Embed without without using raw json format

**Kind**: global class  
**Author**: DutchVanDerLinde  

[Embed](#Embed)
- _static_
  - [Embed](#Embed)
    - [new Embed(data)](#Embed_new)
- _instance_
    - [setTitle(title)](#setTitle) ⇒ [<code>Embed</code>](#Embed)
    - [setDescription(description)](#setDescription) ⇒ [<code>Embed</code>](#Embed)
    - [setURL(url)](#setURL) ⇒ [<code>Embed</code>](#Embed)
    - [setColor(color)](#setColor) ⇒ [<code>Embed</code>](#Embed)
    - [setAuthor(name, icon, url)](#setAuthor) ⇒ [<code>Embed</code>](#Embed)
    - [setTimestamp([timestamp])](#setTimestamp) ⇒ [<code>Embed</code>](#Embed)
    - [addField(name, value, [inline])](#addField) ⇒ [<code>Embed</code>](#Embed)
    - [setThumbnail(url)](#setThumbnail) ⇒ [<code>Embed</code>](#Embed)
    - [setImage(url)](#setImage) ⇒ [<code>Embed</code>](#Embed)
    - [setFooter(text, [icon])](#setFooter) ⇒ [<code>Embed</code>](#Embed)
    - [attachFile(file)](#attachFile) ⇒ [<code>Embed</code>](#Embed)

<a id="embed"></a>

### Embed
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>String</code> |  |
| url | <code>String</code> |  |
| description | <code>String</code> |  |
| color | <code>String</code> |  |
| author | <code>Object</code> |  |
| [author.name] | <code>String</code> |  |
| [author.url] | <code>String</code> |  |
| [author.icon_url] | <code>String</code> |  |
| thumbnail | <code>Object</code> |  |
| [thumbnail.url] | <code>String</code> |  |
| fields | <code>Array</code> | { name: "string", value: "string", inline: boolean } |
| image | <code>Object</code> |  |
| [image.url] | <code>String</code> |  |
| footer | <code>Object</code> |  |
| [footer.text] | <code>String</code> |  |
| [footer.icon_url] | <code>String</code> |  |
| timetamp | <code>String</code> |  |
| file | <code>Object</code> |  |

<a id="embed_new"></a>

### new Embed(data)
An embed to be sent with a message with a fluent interface for creation.


| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>Object</code> | Data to set in the rich embed |
| [data.title] | <code>String</code> |  |
| [data.url] | <code>String</code> |  |
| [data.description] | <code>String</code> |  |
| [data.color] | <code>String</code> |  |
| [data.author] | <code>Object</code> |  |
| [data.author.name] | <code>String</code> |  |
| [data.author.url] | <code>String</code> |  |
| [data.author.icon_url] | <code>String</code> |  |
| [data.thumbnail] | <code>Object</code> |  |
| [data.thumbnail.url] | <code>String</code> |  |
| [data.fields] | <code>Array</code> | { name: "string", value: "string", inline: boolean } |
| [data.image] | <code>Object</code> |  |
| [data.image.url] | <code>String</code> |  |
| [data.footer] | <code>Object</code> |  |
| [data.footer.text] | <code>String</code> |  |
| [data.footer.icon_url] | <code>String</code> |  |
| [data.timetamp] | <code>String</code> |  |
| [data.file] | <code>Object</code> |  |

<a id="settitle"></a>

### setTitle(title) ⇒ [<code>Embed</code>](#Embed)
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

<a id="setdescription"></a>

### setDescription(description) ⇒ [<code>Embed</code>](#Embed)
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

<a id="seturl"></a>

### setURL(url) ⇒ [<code>Embed</code>](#Embed)
Sets the URL of this embed.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The URL |

<a id="setcolor"></a>

### setColor(color) ⇒ [<code>Embed</code>](#Embed)
Sets the color of this embed.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>Number</code> | The color of the embed |

**Example**  
```js
Embed.setColor(0xFFFFF);
```

<a id="setauthor"></a>

### setAuthor(name, icon, url) ⇒ [<code>Embed</code>](#Embed)
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
Embed.setAuthor('KhaaZ', 'khaaz.png');
```

<a id="settimestamp"></a>

### setTimestamp([timestamp]) ⇒ [<code>Embed</code>](#Embed)
Sets the timestamp of this embed.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [timestamp] | <code>Date</code> | <code>new Date()</code> | The timestamp |

<a id="addfield"></a>

### addField(name, value, [inline]) ⇒ [<code>Embed</code>](#Embed)
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

<a id="setthumbnail"></a>

### setThumbnail(url) ⇒ [<code>Embed</code>](#Embed)
Set the thumbnail of this embed.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The URL of the thumbnail |

<a id="setimage"></a>

### setImage(url) ⇒ [<code>Embed</code>](#Embed)
Sets the image of this embed

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The URL of the image |

**Example**  
```js
Embed.setImage('myImageUrl.png');
```

<a id="setfooter"></a>

### setFooter(text, [icon]) ⇒ [<code>Embed</code>](#Embed)
Sets the footer of this embed.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text of the footer |
| [icon] | <code>String</code> | The icon URL of the footer |

**Example**  
```js
Embed.setFooter('My Footer', 'footer.png');
```

<a id="attachfile"></a>

### attachFile(file) ⇒ [<code>Embed</code>](#Embed)
Sets the file to upload alongside the embed. This file can be accessed via `attachment://fileName.extension` when
setting an embed image or author/footer icons. Only one file may be attached.

**Kind**: instance method of [<code>Embed</code>](#Embed)  
**Returns**: [<code>Embed</code>](#Embed) - This embed  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Local path or URL to the file to attach, or valid FileOptions for a file to attach |
