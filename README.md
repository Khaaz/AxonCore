<div align="center">
  <br />
  <p>
    <a href="https://khaazz.github.io/AxonCore"><img src="_images/banner.png" width="546" alt="AxonCore" /></a>
  </p>
  <p>
    <a href="https://github.com/Khaazz/AxonCore/releases"><img src="https://img.shields.io/github/release/Khaazz/AxonCore.svg?style=flat-square" alt="Release" /></a>
    <a href="https://www.npmjs.com/package/axoncore"><img src="https://img.shields.io/npm/v/axoncore.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://travis-ci.org/Khaazz/AxonCore"><img src="https://travis-ci.com/Khaazz/AxonCore.svg?branch=master" alt="Build status" /></a>
    <a href="https://discord.gg/QZ6B5US"><img src="https://discordapp.com/api/guilds/365236789855649814/embed.png" alt="Discord server" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/axoncore/"><img src="https://nodei.co/npm/axoncore.png?downloads=true&stars=true" alt="npm installinfo" /></a>
  </p>
</div>

# AxonCore

AxonCore is an all in one framework built to make bot deveopment fast and easy. Focus only on what matters: creating commands foryour users. AxonCore handles all the hard and annoying job for you. Take advantage of its stability and robustness to fasten your development.
AxonCore is opiniated to enforce good code practice and allow to access all features you could possibly want in a framework.
AxonCore is lib agnostic, which mean you can use it indifferently with [Eris](https://github.com/abalabahaha/eris), [Discord.js](https://github.com/discordjs/discord.js) or [Detritusjs](https://github.com/detritusjs/client).

AxonCore embeds a lot of features from a complete command, event handler to a full Database support allowing you to easily setup per-guild settings. Main features are detailed below.

**When to use AxonCore:**

- If you want to use the power and stability of a framework to create your bot.
- Learn once, create anything
- Creating one server bots fast and easy with all the customisation you want.

**When not to use AxonCore:**

- If you prefer to create your own client for your specific needs
- If you prefer an unopiniated solution or won't use the features AxonCore offers
- If you don't want a Database at all or prefer an other way to interact with the DB.

## Main Features

- **Client** - Extendable custom Client with an advanced permission and options system.
- **Command Handler** - Easy and fast to create commands.
- **Event Handler** - Easy to create specific event handler.
- **Library agnostic** - Works the same way with Eris or Discord.js.
- **Modular** - Separate your bot in several modules to entirely encapsulate your application.
- **Extendable** - Extend anything that you want and reinject directly in the framework.
- **Controlable execution flow** - Control every step from Client initialisation to Command execution.
- **Database** - Built in database support (extendable to any database type - SQL, NoSQL).
- **Advanced error management** - Advanced context management and error tracking to easily identify possible bug.
- **Hooks** - Execute functions and actions on events (inhibitor hooks, pre/post-runhooks, finalizers hooks). [TODO]
- **Translaions** - Built in support for a translation system.
- **Logging** - Built in beautiful custom logging.
- **Statistic** - Easily track commands and events usage and errors with custom events emitted by AxonCore.

## Philosophy

This framework was built with specific aims.  
For started, it's specifically designed to support and power EASE. That means that most of its basic features are features used in production by EASE.  
This framework is made to make developing a bot fast and easy. It's in particular aimed to developer that want to create small and specific bot for community (singe server, small set of servers).  
AxonCore is designed to scale, built for fast development and ease of use.

Primary designed to work with the [Eris](https://github.com/abalabahaha/eris) library, all the library implementation was abstracted to make the framework library agnostic. Which mean you can use it with any of the existing JS library ([discord.js](https://github.com/discordjs/discord.js), [eris](https://github.com/abalabahaha/eris), [detritusjs](https://github.com/detritusjs/client)).

AxonCore was built with an OOP approach. It uses predictable abstraction while keeping the power and speed of javascript prototypal nature. Separation of concerns makes sure everything is correctly encapsulated, maintainable and extendable.  
The framework is also fully modular. A bot written with AxonCore is created from a set of modules. Each Module handle itself, has a set of commands etc...
AxonCore is a feature rich framework. It comes with a lot of features for all possible usage and needs. As it is a framework and not a library, AxonCore will handle everything for you leaving only one job to you: creating the actual commands. However AxonCore still allows you to edit and customise anything as you want with a full extendable approach and a total controlover the initialisation and execution flow.  
AxonCore is fully flexible allowing you to change and edit almost anything.

## Features Overview

Because it is built with the correct level abstraction, using AxonCore feels natural and is really powerful. Everything is easily accessible and still extendable and customisable.  
AxonCore take full benefits of promises while having a strong and complete error management system. Events are emitted on command execution (on success / failure / error) with a full context information.
AxonCore take full advantages of lastest ECMAScript and Node features (Node12, ECMAScript 2019...). It also uses [ESM](https://github.com/standard-things/esm) to fully profit of ES6 modules (import / export syntax).

Guild configs are abstracted in a specific cache. That allows to easily access and manage the data and makes it easy to switch to another type of cache later on (eg: LRUCache, redis...).  
There is a built in help command that you can easily override if you want to.

### Command

You create a Command by extending [Command](src/Structures/Command/Command.js).  
[CommandPermissions](src/Structures/Command/CommandPermissions.js) and [CommandOptions](src/Structures/Command/CommandOptions.js).

### Listener

You create a Listener by extending [Listener](src/Structures/Listener.js).  
A **Listener** is a function that is run when a Discord Event occurs. Many listeners can be bound to one Discord Event.
A **Handler** is an object responsible of running all listeners for a specific Discord Event.  

### Database support

All database interaction done by AxonCore is done via a [DBProvider](src/Database/DBProvider.js).  
There is specific providers for each type of Database such as:

- JSON
- MongoDB ([mongoose](https://github.com/Automattic/mongoose))
- SQL ([sequelize](https://github.com/sequelize/sequelize)) [TODO]
- SQLite () [TODO]

In the framework, the only thing you will handler is [GuildConfig](src/Structures/DataStructure/GuildConfig.js) object and an [AxonConfig](src/Structures/DataStructure/AxonConfig.js) object. Thoses are stored in the [GuildConfigCache](src/Structures/GuildConfigCache.js).  

### Translation support

TODO

### Logging support

- Default
- [Chalk](https://github.com/chalk/chalk)
- [Winston](https://github.com/winstonjs/winston)

### Client lifecycle

Schema
TODO

### Command lifecycle - Hooks

Schema
TODO

### Execution context, error management, usage tracking

A command should return a Promise. It should either be a [CommandResponse](src/Structures/Command/CommandResponse.js) instance or the promise returned by [`sendMessage`](a), [`sendSuccess`](a), [`sendError`](a).

The framework will build a [CommandContext](src/Structures/Command/CommandContext.js) object after each command execution.
Three type of events will then be emitted depending the scenario.

- The command was executed entirely and successfully. A **commandSuccess** event is emitted by AxonClient.
- The command was called but something blocked the execution and it was not successfully executed. This can be due to a missing permission, invalid usage, or even a condition in the `command.execute` method (via the `sendError` method for instance). In this case a **commandFailure** event is emitted.
- The command was executed but an error occured in the execution (API error, code error...). A **commandError** event is then emitted.

You can listen to these events according to the following example.

```js
axonClient.on('commandSuccess', ({ msg: Message, guildConfig: GuildConfig, context: CommandContext }) => {} );
axonClient.on('commandFailure', ({ msg: Message, guildConfig: GuildConfig, context: CommandContext }) => {} );
axonClient.on('commandError', ({ msg: Message, guildConfig: GuildConfig, err: AxonCommandError }) => {} ); // err.context = CommandContext
```

For listener execution, **eventSuccess** and **eventError** events are also emitted by the AxonClient.

```js
axonClient.on('eventSuccess', { event: String, listener: Listener, guildConfig: GuildConfig } ); // event: the event name, listener: the Listener object
axonClient.on('eventError', { event: String, listener: Listener, guildConfig: GuildConfig, err: Error } );
```

### Utilities

- [Embed](src/Utility/External/Embed.js)
- Resolver
- [Utility](src/Utility/Utils.js)
- Message Collector [TODO-outdated]
- Reaction collector [TODO-outdated]

- [LRUCache](src/Utility/External/LRUCache.js)
- [Queue](src/Utility/External/Queue.js)
- [AsyncQueue](src/Utility/External/AsyncQueue.js)
- [AutoQueue](src/Utility/External/AutoQueue.js)

## Notes

### Dependency

[ESM](https://www.npmjs.com/package/esm) is used to run this framework. It allows to take full benefits of ES6 modules by making possible to use it.  
See [here](https://www.npmjs.com/package/esm#getting-started) on how to use ESM.  
However you don't need ESM to use this framework as you can simply use require and it will be fully compatible.  

You can use any Database you want. If support for this Database isn't built in, you can create your own Provider by extending [DBProvider](src/Database/DBProvider.js) and passing it in [AxonOptions](src/AxonOptions.js).  
There is currently support for: [Mongoose](https://github.com/Automattic/mongoose).
You can also use the JSON Database if you don't need a real DB solution.  

### Dev-tools

This project strongly uses eslint to enforce style rules and catch bugs. The eslint config uses can be found [here](https://github.com/AxonTeam/eslint-config).  
Docs are built with a custom solution that can be found [here](https://github.com/AxonTeam/doc-gen).  
Github actions used in this project can be found here:

- [Auto lint]() on PR.
- [Doc building]() on commit ton master.
- [Auto publish]() on npm and github packages on releases. 

## Documentation

All documentation can be found [here](https://khaazz.github.io/AxonCore/#/)!

## Examples

AxonCore is being used in these cool projects:  

- [Ease](https://github.com/AxonTeam/Ease) Enhance A Server Easily - A all in one modular bot that you can build and selfhost.
- [WebSPELL](https://github.com/Khaazz/webSPELL) - A custom RSS bot made for a french community.

## Contributions

Feel free to contribute to this project by opening Pull-Request or Issues. Contributions are always welcome.  
To know more about contributions or discuss about development you can join the discord server [here](https://discord.gg/QZ6B5US).
