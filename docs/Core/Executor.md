<a name="Executor"></a>

## Executor
**Kind**: global class  
**Properties**

| Name | Type |
| --- | --- |
| axon | <code>AxonClient</code> | 


* [Executor](#Executor)
    * [new Executor()](#new_Executor_new)
    * _instance_
        * [.listener(listener, guildConfig, ...args)](#Executor+listener)
        * [.command(command, env)](#Executor+command)
        * [.help(command, env)](#Executor+help)
    * _static_
        * [.Executor](#Executor.Executor)
            * [new Executor(axonClient)](#new_Executor.Executor_new)

<a name="new_Executor_new"></a>

### new Executor()
Executor class. Execute and handle execution of listeners and command in the framework
Will emit events depending on the execution

<a name="Executor+listener"></a>

### executor.listener(listener, guildConfig, ...args)
**Kind**: instance method of [<code>Executor</code>](#Executor)  

| Param | Type |
| --- | --- |
| listener | <code>Listener</code> | 
| guildConfig | <code>GuildConfig</code> | 
| ...args | <code>any</code> | 

<a name="Executor+command"></a>

### executor.command(command, env)
**Kind**: instance method of [<code>Executor</code>](#Executor)  

| Param | Type |
| --- | --- |
| command | <code>Command</code> | 
| env | <code>CommandEnvironment</code> | 

<a name="Executor+help"></a>

### executor.help(command, env)
**Kind**: instance method of [<code>Executor</code>](#Executor)  

| Param | Type |
| --- | --- |
| command | <code>Command</code> | 
| env | <code>CommandEnvironment</code> | 

<a name="Executor.Executor"></a>

### Executor.Executor
**Kind**: static class of [<code>Executor</code>](#Executor)  
<a name="new_Executor.Executor_new"></a>

#### new Executor(axonClient)
Creates an instance of Executor.


| Param | Type |
| --- | --- |
| axonClient | <code>AxonClient</code> | 

