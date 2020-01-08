<a name="AxonOptions"></a>

## AxonOptions
**Kind**: global class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [botConfig] | <code>Object</code> | <code></code> | General Axon config |
| [lang] | <code>Object</code> | <code></code> | Message templates / translations |
| [tokenConfig] | <code>Object</code> | <code></code> | Token config |
| [logo] | <code>function</code> | <code></code> | Custom function that will log a logo |
| [utils] | <code>Object.&lt;Utils&gt;</code> | <code></code> | Custom utils. Needs to be an instance of AxonCore.Utils |
| [logger] | <code>Object</code> | <code></code> | Custom logger |
| [DBProvider] | <code>Object.&lt;DBProvider&gt;</code> | <code></code> | DBProvider. Needs to be an instance of DBProvider |
| [DBLocation] | <code>String</code> | <code></code> | Path to use as default location for usage of the JSONProvider |
| [axonConfig] | <code>Object.&lt;AxonConfig&gt;</code> | <code></code> | Custom AxonConfig object to use instead of default AxonConfig |
| [guildConfig] | <code>Object.&lt;GuildConfig&gt;</code> | <code></code> | Custom GuildConfig object to use instead of default GuildConfig |


* [AxonOptions](#AxonOptions)
    * [new AxonOptions()](#new_AxonOptions_new)
    * [.AxonOptions](#AxonOptions.AxonOptions)
        * [new AxonOptions([data])](#new_AxonOptions.AxonOptions_new)

<a name="new_AxonOptions_new"></a>

### new AxonOptions()
AxonOptions definition.
Options passed when creating an AxonClient instance.

<a name="AxonOptions.AxonOptions"></a>

### AxonOptions.AxonOptions
**Kind**: static class of [<code>AxonOptions</code>](#AxonOptions)  
<a name="new_AxonOptions.AxonOptions_new"></a>

#### new AxonOptions([data])
Creates an instance of AxonOptions.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | <code>Object</code> | <code>{}</code> |  |
| [data.botConfig] | <code>Object</code> | <code></code> | General Axon config |
| [data.lang] | <code>Object</code> | <code></code> | Message templates / translations |
| [data.tokenConfig] | <code>Object</code> | <code></code> | Token config |
| [data.token] | <code>String</code> | <code></code> | The discord js token to automatically connect the bot client |
| [data.logo] | <code>function</code> | <code></code> | Custom function that will log a logo |
| [data.utils] | <code>Object.&lt;Utils&gt;</code> | <code></code> | Custom utils. Needs to be an instance of AxonCore.Utils |
| [data.logger] | <code>Object</code> | <code></code> | Custom logger |
| [data.DBProvider] | <code>Object.&lt;DBProvider&gt;</code> | <code></code> | DBProvider. Needs to be an instance of DBProvider |
| [data.DBLocation] | <code>String</code> | <code></code> | Path to use as default location for usage of the JSONProvider |
| [data.axonConfig] | <code>Object.&lt;AxonConfig&gt;</code> | <code></code> | Custom AxonConfig object to use instead of default AxonConfig |
| [data.guildConfig] | <code>Object.&lt;GuildConfig&gt;</code> | <code></code> | Custom GuildConfig object to use instead of default GuildConfig |

