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
- A Discord Bot framework that handles custom Client, Commands, and Events.  
- Built on top of [Eris library](https://github.com/abalabahaha/eris), it allows you to easily create a customizable bot with its easy to use options.  
- This framework will be simple to setup, simple to use, and allows high customizability and efficiency.  
- This framework is built to use a DataBase for utilizing all of its functionality. It natively supports MongoDB, but it is possible to use an alternate JSON DataBase if necessary.

## Features:

  - **Client**: Separates the Eris client and the main client that caches Modules, guildConfigs, DB schemas, etc...
  - **Modular**: A module that could host its own commands and events.
  - **Command Handler**: Creates a command easily with a lot of options and customization.
  - **Event Handler**: Listens to events sent by Discord API easily, splits / allows events per module.
  - **GuildConfig**: Natively supports guildConfigs (prefix, moderators, enabling / disabling modules / comands / events).
  - **Utility**: Useful shortcuts and utility functions.
  - **Resolver**: Built-in Resolver that can be replaced if needed.
  - **Error Handling**: Clean and feature rich error handling.
  - **Logging**: Colorful custom logging.
  - **Customizable**: Customize error messages easily, help command, bot staff, etc... 

## Notes:

This framework supports a custom logger. You can take full benefits of this by installing [Chalk](https://www.npmjs.com/package/chalk) or [Signale](https://www.npmjs.com/package/signale) and choosing the one you want to use in the config file.  
[PM2](https://www.npmjs.com/package/pm2) is also recommended as a process manager solution.  
This framework is designed to work with [Moongose](https://www.npmjs.com/package/mongoose) which you can install and use directly without any modification (just by selecting it in the config file).  
If you don't want to use MongoDB, you can use the default version which is a JSON Database.
In the future more database clients could be added. In the meantime you are able to use whatever Database you want by simply extending AxonCore.DBService, adaptating as you want and passing the Class as an option in the constructor.   

[Eris](https://www.npmjs.com/package/eris) is necessary to use this framework. However you can use any fork. [KhaaZ's fork](https://github.com/Khaazz/eris) is recommended as it only remove selfbot property from `Eris.Client` and prefix token as `_token`.  
You need to pass an instance of Eris Client when you contruct the AxonClient. Therefore you can use any Eris version you wish.   

[ESM](https://www.npmjs.com/package/esm) is used to run this framework. It allows to take full benefits of ES6 modules by making possible to use it.  
See [here](https://www.npmjs.com/package/esm#getting-started) on how to use ESM.  
However you don't need ESM to use this framework as you can simply use require and it will be fully compatible.  

## Documentation:

All the documentation and instructions on how to set it up can be found [here](https://khaazz.github.io/#/).  
We also have a discord server where we provide eventual support or discuss about development. Join [here](https://discord.gg/QZ6B5US).

## Examples
AxonCore is being used in these cool projects:  
  - [E.A.S.E.](https://github.com/AxonTeam/Ease) Enhance A Server Easily - A all in one modular bot that you can build and selfhost.
  - [WebSPELL](https://github.com/Khaazz/webSPELL) - A custom RSS bot made for a french community.


### Contributions
Feel free to contribute to this project by opening Pull-Request or Issues. Contributions are always welcome.  
To know more about contributions or discuss about development you can join the discord server [here](https://discord.gg/QZ6B5US).

### Honorable mentions
- [Jack](https://github.com/InATrance) for support and interesting talk when starting this.
- [Santhosh-Annamalai](https://github.com/Santhosh-Annamalai) for helping me in building documentation.
- Contributors for participating and helping in this project.
