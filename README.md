<div align="center">
  <br />
  <p>
    <a href="https://khaazz.github.io/AxonCore"> <img src="_images/banner.png" width="546" alt="AxonCore" /> </a>
  </p>
  <p>
    <a href="https://github.com/Khaazz/AxonCore/releases"> <img src="https://img.shields.io/github/release/Khaazz/AxonCore.svg?style=flat" alt="Release" /> </a>
    <a href="https://www.npmjs.com/package/axoncore"> <img src="https://img.shields.io/npm/v/axoncore.svg?maxAge=3600" alt="NPM version" /> </a>
    <a href="https://www.npmjs.com/package/axoncore"><img src="https://img.shields.io/npm/dt/axoncore.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://discord.gg/QZ6B5US"> <img src="https://discordapp.com/api/guilds/365236789855649814/embed.png" alt="Discord server" /> </a>
  </p>
  <p>
    <a href="https://github.com/Khaazz/AxonCore/actions"> <img src="https://github.com/Khaazz/AxonCore/workflows/Test/badge.svg" alt="Test status" /> </a>
    <a href="https://github.com/Khaazz/AxonCore/actions"> <img src="https://github.com/Khaazz/AxonCore/workflows/Docgen/badge.svg" alt="Docgen status" /> </a>
    <a href="https://github.com/Khaazz/AxonCore/deployments"> <img alt="GitHub deployments" src="https://img.shields.io/github/deployments/khaazz/axoncore/github-pages?label=gh-pages" /> </a>
    <a href="https://www.codefactor.io/repository/github/khaazz/axoncore"><img src="https://www.codefactor.io/repository/github/khaazz/axoncore/badge" alt="CodeFactor" /></a>
    <a href="https://david-dm.org/khaazz/khaazz"><img src="https://img.shields.io/david/khaazz/axoncore.svg?maxAge=3600" alt="Dependencies" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/axoncore/"> <img src="https://nodei.co/npm/axoncore.png?downloads=true&stars=true" alt="NPM info" /> </a>
  </p>
</div>

# **AxonCore**

>__**Complete, Stable, Fast, Universal**__  
> The best all-in-one framework for discord bots. The power of a fully featured framework, the simplicity of a predictable API.

AxonCore is an all in one framework, built to make bot deveopment fast and easy. Focus only on what matters: creating commands for your users. AxonCore handles all the hard and annoying work for you. Take advantage of its stability and robustness to fasten your development.  
AxonCore is opiniated to enforce good code practice and has all features you could possibly want in a framework, from command and event handlers, to full Database support, more details further down.  
AxonCore is lib agnostic, which mean you can use it indifferently with [Eris](https://github.com/abalabahaha/eris), [Discord.js](https://github.com/discordjs/discord.js) or [Detritusjs](https://github.com/detritusjs/client).

**When to use AxonCore:**

- If you want power and stability in your bots.
- Creating simple bots fast and easy with many customisation options.
- Creating large stable bots designed to scale.

**When not to use AxonCore:**

- If you prefer to create your own client for your specific needs.
- If you prefer an unopiniated solution or don't want to use the features AxonCore offers.
- If you don't want a Database at all or prefer other ways to interact with a DB.

## Main Features

- **Client** - Extendable custom client with an advanced permission system.
- **Command Handler** - Easy and fast fully customisable command creation with advanced permission and options system, command throttling and subcommands.
- **Event Handler** - Setup and react to discord events.
- **Library agnostic** - Work with any javascript discord library (eris, discordjs, detritusjs).
- **Modular** - Separate your bot into several modules to entirely encapsulate your application.
- **Extendable** - Extend anything that you want on top of the framework.
- **Controlable execution flow** - Control every step from client initialisation to command execution.
- **Database** - Built in database support (extendable to any database type - SQL, NoSQL).
- **Advanced error management** - Advanced context management and error tracking for easy bug-hunting.
- **Hooks** - Execute functions and actions on events (inhibitor hooks, pre/post-execute hooks, finalizers hooks). [TODO]
- **Translations** - Built-in support for translation and message management system.
- **Logging** - Built-in custom logging.
- **Tracking** - Easily track and debug command usage, events and errors with custom events emitted by AxonCore.

## Philosophy

AxonCore was built with specific aims. At it's core, it makes developing a bot fast and easy, particularly for developers that want to create small and specific bots for communities (singe server, small set of servers). However, this framewok is also designed for scaling, and creating a big public bot is super easy and fast thanks to all features embeded in the framework and its stability.

Primarily designed to work with [Eris](https://github.com/abalabahaha/eris), all the library implementation was abstracted to make the framework library agnostic, which means you can use it with other existing JS libraries, like [Discord.js](https://github.com/discordjs/discord.js), [Eris](https://github.com/abalabahaha/eris) or [Detritusjs](https://github.com/detritusjs/client)).

It was built with an OOP approach and uses predictable abstraction while keeping the power and speed of javascript prototypal nature. Separation of concerns makes sure everything is correctly encapsulated, maintainable and extendable. The framework is fully modular (AxonCore uses Modules that holds set of commands, events, etc...).
It also comes with a lot of features for all possible usages and needs. AxonCore will handle everything, leaving only one job to you: creating the bot. It does however still allow you to edit and customise anything you want with a full extendable approach and total control over the initialisation and execution flow.

## Setup

[Examples](./examples)  
To get your application started easily, you can use the create-app boilerplate: **[create-axoncore-app](https://github.com/Khaazz/create-axoncore-app)**.  
Here's how to use it:  
`yarn create axoncore-app -lib <library> --type <module management type> <destination>`  
`npm init axoncore-app -lib <library> --type <module management type> <destination>`

- Available libraries: `eris`, `discordjs`.  
- Available module types: `commonjs`, `esm`.

## Features Overview

Because it is built with the correct level abstraction, using AxonCore feels natural and powerful. Everything is easily accessible, extendable and customisable.
AxonCore takes full benefits of promises while having a strong and complete error management system. Events are emitted on command execution (on success / failure / error) with a full context information.  
It also takes advantage of the lastest ECMAScript and Node features (Node12, ECMAScript 2019...). It also uses [ESM](https://github.com/standard-things/esm) to fully profit of ES6 modules (import / export syntax).

Guild configs are abstracted in a specific cache, which allows easy access and data management and switching to other types of caches later on (eg: LRUCache, redis...).

There's also a built-in help command that you can easily override if you want to.

### Commands

You can create commands by extending [Command](src/Structures/Command/Command.js), [CommandPermissions](src/Structures/Command/CommandPermissions.js) and [CommandOptions](src/Structures/Command/CommandOptions.js).

### Listeners

You can also create listeners by extending [Listener](src/Structures/Listener.js).  
A **Listener** is a function that is run when a Discord-specific event occurs. Many listeners can be bound to one Discord event.  
A **Handler** is an object responsible of running all listeners for a specific Discord event.

### Databases support

All database interactions are done by AxonCore via a [DBProvider](src/Database/DBProvider.js).  
There are specific providers for each type of Database, such as:

- JSON
- MongoDB ([mongoose](https://github.com/Automattic/mongoose))
- SQL ([sequelize](https://github.com/sequelize/sequelize)) [TODO]
- SQLite () [TODO]

The only thing you will handle is a [GuildConfig](src/Structures/DataStructure/GuildConfig.js) and an [AxonConfig](src/Structures/DataStructure/AxonConfig.js) object. Those are stored in the [GuildConfigCache](src/Structures/GuildConfigCache.js).

### Translation support

TODO

### Logging support

- Default
- [Chalk](https://github.com/chalk/chalk)
- [Signale](https://github.com/klaussinani/signale)
- [Winston](https://github.com/winstonjs/winston)

### Client lifecycle

Schema
TODO

### Command lifecycle - Hooks

Schema
TODO

### Execution context, error management, usage tracking

A Command always should returns a Promise wrapping a [CommandResponse](src/Structures/Command/CommandResponse.js). Either explicitely by creating a CommandResponse and wrapping it in a Promise (`CommandResponse.resolve()`), or implicitely via [`sendMessage`](a), [`sendSuccess`](a) or [`sendError`](a). CommandResponse in these last cases is filled with appropriate information regarding command execution.  

The framework will then build a [CommandContext](src/Structures/Command/CommandContext.js) object after each command execution.  
Two types of events will then be emitted, depending on the scenario:

- The command was executed entirely and successfully. A **commandExecution** event is emitted by AxonClient with `status = true`.
- The command was called but something blocked the execution and it was not successfully executed. This can be due to a missing permission, invalid usage, or even a condition in the `command.execute` method (via the `sendError` method for instance). In this case a **commandExecution** event is emitted with `status = false`.
- The command was executed but an error occured in the execution (API error, code error...). A **commandError** event is then emitted.

You can listen to these events according to the following example.

```js
axonClient.on('commandExecution', (status: Boolean, commandLabel: String, { msg: Message, command: Command, guildConfig: GuildConfig, context: CommandContext }) => {} );
axonClient.on('commandError', (commandLabel: String, { msg: Message, command: Command, guildConfig: GuildConfig, err: AxonCommandError }) => {} ); // err.context = CommandContext
```

For listener execution, **listenerExecution** and **listenerError** events are also emitted by AxonClient.

```js
axonClient.on('listenerExecution', (status: Boolean, eventName: String, listenerName: String, { listener: Listener, guildConfig: GuildConfig }) => {} ); // event: the event name, listener: the Listener object
axonClient.on('listenerError', (eventName: String, listenerName: String, { listener: Listener, guildConfig: GuildConfig, err: Error }) => {} );
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

### Dependencies

[ESM](https://www.npmjs.com/package/esm) is used to run this framework. It makes using ES6 modules possible, of which AxonCore takes full advantage of.  
See [here](https://www.npmjs.com/package/esm#getting-started) on how to use ESM.  
You don't however need ESM to use this framework, using require is also compatible.

You can use any Database you want. If support for this Database isn't built-in, you can create your own by extending [DBProvider](src/Database/DBProvider.js) and passing it in [AxonOptions](src/AxonOptions.js).  
There is currently support for: [Mongoose](https://github.com/Automattic/mongoose).  
You can also use the available JSON variant, if you don't need a DB solution.

### Dev-tools

This project strongly uses eslint to enforce style rules and to avoid bugs. The eslint config used can be found [here](https://github.com/AxonTeam/eslint-config).
Docs are built with a custom solution that can be found [here](https://github.com/AxonTeam/doc-gen).  
Github actions used in this project can be found here:

- [Auto lint](.github/workflows/test.yaml) on PR.
- [Doc building](https://github.com/AxonTeam/action-docgen) on commit ton master.
- [Auto publish](.github/workflows/publish.yaml) on npm and github packages on releases.

## Documentation

All documentation can be found [here](https://khaazz.github.io/AxonCore/#/)!

## Examples

AxonCore is being used in these cool projects:

- [Ease](https://github.com/AxonTeam/Ease) Enhance A Server Easily - A all in one modular bot that you can build and selfhost.
- [WebSPELL](https://github.com/Khaazz/webSPELL) - A custom RSS bot made for a french community.

## Contributions

Feel free to contribute to this project by opening PRs or Issues. Contributions are always welcome.  
To know more about contributions, discuss the development of AxonCore or get help, you can join our discord server [here](https://discord.gg/QZ6B5US).
