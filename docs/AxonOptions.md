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
| settings.debugMode | <code>Boolean</code> | Whether to runthe bot in debugMode (additional info) |
| settings.library | <code>Number.&lt;LIBRARY\_TYPES&gt;</code> | Library type |
| setting.logger | <code>Number.&lt;LOGGER\_TYPES&gt;</code> | Logger type |
| settings.db | <code>Number.&lt;DB\_TYPES&gt;</code> | DB type |
| settings.guildConfigCache | <code>Number</code> | max amount of guildConfigs cached at the sametime (LRUCache) |
| lang | <code>Object</code> | Translation file |
| logo | <code>function</code> | Custom function that will log a custom logo on startup // Info |
| info | <code>Object</code> | General info about the bot |
| info.name | <code>String</code> | The application name |
| info.description | <code>String</code> | The application description |
| info.version | <code>String</code> | The application version // Staff |
| staff | <code>Object</code> | The bot staff (owner, admins) |
| staff.owners | <code>Array.&lt;Object&gt;</code> | The bot staff (owner, admins) |
| staff.admins | <code>Array.&lt;Object&gt;</code> | The bot staff (owner, admins) // Template |
| template | <code>Object</code> | Template information (cpropolors / formatting / emojis) |
| template.embeds | <code>Object</code> | Embeds colors |
| template.emotes | <code>Object</code> | Emotes // Custom |
| data.custom | <code>Object</code> | Custom configs that can be provided // Webhooks |
| webhooksConfig | <code>Object</code> | Webhooks tokens / id |
| webhooksConfig.status | <code>Object</code> | Webhooks tokens / id for status info |
| webhooksConfig.loader | <code>Object</code> | Webhooks tokens / id for loader info |
| webhooksConfig.error | <code>Object</code> | Webhooks tokens / id for error info |
| webhooksConfig.misc | <code>Object</code> | Webhooks tokens / id for misc info // Extensions |
| extensions | <code>Object</code> | Classes overrides |
| extensions.utils | <code>Object.&lt;Utils&gt;</code> | Custom utils. Needs to be an instance of AxonCore.Utils |
| extensions.logger | <code>Object</code> | Custom logger |
| extensions.DBProvider | <code>Object.&lt;DBProvider&gt;</code> | DBProvider. Needs to be an instance of DBProvider |
| extensions.DBLocation | <code>String</code> | Path to use as default location for usage of the JSONProvider |
| extensions.axonConfig | <code>Object.&lt;AxonConfig&gt;</code> | Custom AxonConfig object to use instead of default AxonConfig |
| extensions.guildConfig | <code>Object.&lt;GuildConfig&gt;</code> | Custom GuildConfig object to use instead of default GuildConfig |


* [AxonOptions](#AxonOptions)
    * [new AxonOptions()](#new_AxonOptions_new)
    * [.AxonOptions](#AxonOptions.AxonOptions)
        * [new AxonOptions([data], [webhooksConfig], [extensions])](#new_AxonOptions.AxonOptions_new)

<a name="new_AxonOptions_new"></a>

### new AxonOptions()
AxonOptions definition.
Options passed when creating an AxonClient instance.

<a name="AxonOptions.AxonOptions"></a>

### AxonOptions.AxonOptions
**Kind**: static class of [<code>AxonOptions</code>](#AxonOptions)  
<a name="new_AxonOptions.AxonOptions_new"></a>

#### new AxonOptions([data], [webhooksConfig], [extensions])
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
| data.settings.debugMode | <code>Boolean</code> |  | Whether to runthe bot in debugMode (additional info) |
| data.settings.library | <code>Number.&lt;LIBRARY\_TYPES&gt;</code> |  | Library type |
| data.setting.logger | <code>Number.&lt;LOGGER\_TYPES&gt;</code> |  | Logger type |
| data.settings.db | <code>Number.&lt;DB\_TYPES&gt;</code> |  | DB type |
| data.settings.guildConfigCache | <code>Number</code> |  | max amount of guildConfigs cached at the sametime (LRUCache) |
| data.lang | <code>Object</code> |  | Translation file |
| data.logo | <code>function</code> |  | Custom function that will log a custom logo on startup // Info |
| data.info | <code>Object</code> |  | General info about the bot |
| data.info.name | <code>String</code> |  | The application name |
| data.info.description | <code>String</code> |  | The application description |
| data.info.version | <code>String</code> |  | The application version // Staff |
| data.staff | <code>Object</code> |  | The bot staff (owner, admins) |
| data.staff.owners | <code>Array.&lt;Object&gt;</code> |  | The bot staff (owner, admins) |
| data.staff.admins | <code>Array.&lt;Object&gt;</code> |  | The bot staff (owner, admins) // Template |
| data.template | <code>Object</code> |  | Template information (colors / formatting / emojis) |
| data.template.embeds | <code>Object</code> |  | Embeds colors |
| data.template.emotes | <code>Object</code> |  | Emotes // Custom |
| data.custom | <code>Object</code> |  | Custom configs that can be provided // Webhooks |
| [webhooksConfig] | <code>Object</code> | <code>{}</code> | Webhooks tokens / id |
| webhooksConfig.status | <code>Object</code> |  | Webhooks tokens / id for status info |
| webhooksConfig.loader | <code>Object</code> |  | Webhooks tokens / id for loader info |
| webhooksConfig.error | <code>Object</code> |  | Webhooks tokens / id for error info |
| webhooksConfig.misc | <code>Object</code> |  | Webhooks tokens / id for misc info // Extensions |
| [extensions] | <code>Object</code> | <code>{}</code> | Classes overrides |
| extensions.utils | <code>Object.&lt;Utils&gt;</code> |  | Custom utils. Needs to be an instance of AxonCore.Utils |
| extensions.logger | <code>Object</code> |  | Custom logger |
| extensions.DBProvider | <code>Object.&lt;DBProvider&gt;</code> |  | DBProvider. Needs to be an instance of DBProvider |
| extensions.DBLocation | <code>String</code> |  | Path to use as default location for usage of the JSONProvider |
| extensions.axonConfig | <code>Object.&lt;AxonConfig&gt;</code> |  | Custom AxonConfig object to use instead of default AxonConfig |
| extensions.guildConfig | <code>Object.&lt;GuildConfig&gt;</code> |  | Custom GuildConfig object to use instead of default GuildConfig |

