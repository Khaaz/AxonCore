<a name="ADBProvider"></a>

## *ADBProvider*
**Kind**: global abstract class  
**Author**: KhaaZ  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| axon | <code>AxonClient</code> | The AxonClient |

<a name="new_ADBProvider_new"></a>

### *new ADBProvider()*
Abstract class for all DB services.
Extend this class to create your own Database provider.
You just need to write these methods for the framewor to be able to interact with the database.

The provider creates guildconfigs with DB datas.

