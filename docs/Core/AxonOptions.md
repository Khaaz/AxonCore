## Classes

<dl>
<dt><a href="#AxonOptions">AxonOptions</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Languages">Languages</a> : <code>Object.&lt;string, AxonLanguageResponse&gt;</code></dt>
<dd></dd>
</dl>

<a name="AxonOptions"></a>

## AxonOptions
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data._token | <code>String</code> | The discord js token to automatically connect the bot client // Prefixes |
| prefixes | <code>Object</code> | Bot prefixes |
| prefixes.general | <code>String</code> | General Bot prefix |
| prefixes.owner | <code>String</code> | Owner prefix |
| prefixes.admin | <code>String</code> | Admin prefix // Settings |
| settings | <code>Object</code> | Bot settings |
| settings.lang | <code>String</code> | Default lang for the bot |
| settings.debugMode | <code>Boolean</code> | Whether to run the bot in debugMode (additional info) |
| settings.library | <code>LIBRARY\_TYPES</code> | Library type |
| settings.logger | <code>LOGGER\_TYPES</code> | Logger type |
| settings.db | <code>DB\_TYPES</code> | DB type |
| settings.guildConfigCache | <code>Number</code> | max amount of guildConfigs cached at the same time (LRUCache) |
| lang | [<code>Languages</code>](#Languages) | Translation file |
| logo | <code>function</code> | Custom function that will log a custom logo on startup // Info |
| info | <code>Object</code> | General info about the bot |
| info.name | <code>String</code> | The application name |
| info.description | <code>String</code> | The application description |
| info.version | <code>String</code> | The application version // Staff |
| staff | <code>Object</code> | The bot staff (owner, admins) |
| staff.owners | <code>Array.&lt;Object&gt;</code> | The bot staff (owner, admins) |
| staff.admins | <code>Array.&lt;Object&gt;</code> | The bot staff (owner, admins) // Template |
| template | <code>Object</code> | Template information (colours / formatting / emojis) |
| template.embeds | <code>Object.&lt;string, Number&gt;</code> | Embeds colors |
| template.emotes | <code>Object.&lt;string, String&gt;</code> | Emotes // Custom |
| data.custom | <code>Object.&lt;string, any&gt;</code> | Custom configs that can be provided // Webhooks |
| webhooks | <code>Object</code> | Webhooks tokens / id |
| webhooks.FATAL | <code>Object</code> |  |
| webhooks.ERROR | <code>Object</code> |  |
| webhooks.WARN | <code>Object</code> |  |
| webhooks.DEBUG | <code>Object</code> |  |
| webhooks.NOTICE | <code>Object</code> |  |
| webhooks.INFO | <code>Object</code> |  |
| webhooks.VERBOSE | <code>Object</code> | // Extensions |
| extensions | <code>Object</code> | Classes overrides |
| extensions.utils | <code>Utils</code> | Custom utils. Needs to be an instance of AxonCore.Utils |
| extensions.logger | <code>ALogger</code> | Custom logger |
| extensions.DBProvider | <code>DBProvider</code> | DBProvider. Needs to be an instance of DBProvider |
| extensions.DBLocation | <code>String</code> | Path to use as default location for usage of the JSONProvider |
| extensions.axonConfig | <code>AxonConfig</code> | Custom AxonConfig object to use instead of default AxonConfig |
| extensions.guildConfig | <code>GuildConfig</code> | Custom GuildConfig object to use instead of default GuildConfig |


* [AxonOptions](#AxonOptions)
    * [new AxonOptions()](#new_AxonOptions_new)
    * _instance_
        * [.prefixes](#AxonOptions+prefixes) : <code>Object</code>
        * [.settings](#AxonOptions+settings) : <code>Object</code>
        * [.lang](#AxonOptions+lang) : [<code>Languages</code>](#Languages)
        * [.info](#AxonOptions+info) : <code>Object</code>
        * [.staff](#AxonOptions+staff) : <code>Object</code>
        * [.template](#AxonOptions+template) : <code>Object</code>
        * [.webhooks](#AxonOptions+webhooks) : <code>Object</code>
    * _static_
        * [.AxonOptions](#AxonOptions.AxonOptions)
            * [new AxonOptions([data], [webhooks], [extensions])](#new_AxonOptions.AxonOptions_new)

<a name="new_AxonOptions_new"></a>

### new AxonOptions()
AxonOptions definition.
Options passed when creating an AxonClient instance.

<a name="AxonOptions+prefixes"></a>

### axonOptions.prefixes : <code>Object</code>
**Kind**: instance property of [<code>AxonOptions</code>](#AxonOptions)  
<a name="AxonOptions+settings"></a>

### axonOptions.settings : <code>Object</code>
**Kind**: instance property of [<code>AxonOptions</code>](#AxonOptions)  
<a name="AxonOptions+lang"></a>

### axonOptions.lang : [<code>Languages</code>](#Languages)
**Kind**: instance property of [<code>AxonOptions</code>](#AxonOptions)  
<a name="AxonOptions+info"></a>

### axonOptions.info : <code>Object</code>
**Kind**: instance property of [<code>AxonOptions</code>](#AxonOptions)  
<a name="AxonOptions+staff"></a>

### axonOptions.staff : <code>Object</code>
**Kind**: instance property of [<code>AxonOptions</code>](#AxonOptions)  
<a name="AxonOptions+template"></a>

### axonOptions.template : <code>Object</code>
**Kind**: instance property of [<code>AxonOptions</code>](#AxonOptions)  
<a name="AxonOptions+webhooks"></a>

### axonOptions.webhooks : <code>Object</code>
**Kind**: instance property of [<code>AxonOptions</code>](#AxonOptions)  
<a name="AxonOptions.AxonOptions"></a>

### AxonOptions.AxonOptions
**Kind**: static class of [<code>AxonOptions</code>](#AxonOptions)  
<a name="new_AxonOptions.AxonOptions_new"></a>

#### new AxonOptions([data], [webhooks], [extensions])
Creates an instance of AxonOptions.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | <code>Object</code> | <code>{}</code> |  |
| data.token | <code>String</code> |  | The discord js token to automatically connect the bot client // Prefixes |
| data.prefixes | <code>Object</code> |  | Bot prefixes |
| data.prefixes.general | <code>String</code> |  | General Bot prefix |
| data.prefixes.owner | <code>String</code> |  | Owner prefix |
| data.prefixes.admin | <code>String</code> |  | Admin prefix // Settings |
| data.settings | <code>Object</code> |  | Bot settings |
| data.settings.lang | <code>String</code> |  | Default lang for the bot |
| data.settings.debugMode | <code>Boolean</code> |  | Whether to run the bot in debugMode (additional info) |
| data.settings.library | <code>LIBRARY\_TYPES</code> |  | Library type |
| data.settings.logger | <code>LOGGER\_TYPES</code> |  | Logger type |
| data.settings.db | <code>DB\_TYPES</code> |  | DB type |
| data.settings.guildConfigCache | <code>Number</code> |  | max amount of guildConfigs cached at the same time (LRUCache) |
| data.lang | [<code>Languages</code>](#Languages) |  | Translation file |
|  |  |  |  |
| data.info | <code>Object</code> |  | General info about the bot |
| data.info.name | <code>String</code> |  | The application name |
| data.info.description | <code>String</code> |  | The application description |
| data.info.version | <code>String</code> |  | The application version // Staff |
| data.staff | <code>Object</code> |  | The bot staff (owner, admins) |
| data.staff.owners | <code>Array.&lt;{name: String, id: String}&gt;</code> |  | The bot staff (owner, admins) |
| data.staff.admins | <code>Array.&lt;{name: String, id: String}&gt;</code> |  | The bot staff (owner, admins) // Template |
| data.template | <code>Object</code> |  | Template information (colors / formatting / emojis) |
| data.template.embeds | <code>Object.&lt;string, Number&gt;</code> |  | Embeds colors |
| data.template.emotes | <code>Object.&lt;string, String&gt;</code> |  | Emotes // Custom |
| data.custom | <code>Object.&lt;string, any&gt;</code> |  | Custom configs that can be provided // Webhooks |
| [webhooks] | <code>Object</code> | <code>{}</code> | Webhooks tokens / id |
| webhooks.FATAL | <code>Object</code> |  |  |
| webhooks.ERROR | <code>Object</code> |  |  |
| webhooks.WARN | <code>Object</code> |  |  |
| webhooks.DEBUG | <code>Object</code> |  |  |
| webhooks.NOTICE | <code>Object</code> |  |  |
| webhooks.INFO | <code>Object</code> |  |  |
| webhooks.VERBOSE | <code>Object</code> |  | // Extensions |
| [extensions] | <code>Object</code> | <code>{}</code> | Classes overrides |
| extensions.utils | <code>Utils</code> |  | Custom utils. Needs to be an instance of AxonCore.Utils |
| extensions.logger | <code>ALogger</code> |  | Custom logger |
| extensions.DBProvider | <code>ADBProvider</code> |  | DBProvider. Needs to be an instance of DBProvider |
| extensions.DBLocation | <code>String</code> |  | Path to use as default location for usage of the JSONProvider |
| extensions.axonConfig | <code>AxonConfig</code> |  | Custom AxonConfig object to use instead of default AxonConfig |
| extensions.guildConfig | <code>GuildConfig</code> |  | Custom GuildConfig object to use instead of default GuildConfig |

<a name="Languages"></a>

## Languages : <code>Object.&lt;string, AxonLanguageResponse&gt;</code>
**Kind**: global typedef  
