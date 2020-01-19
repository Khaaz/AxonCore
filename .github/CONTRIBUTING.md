# Contributing

**The issue tracker is only for bug reports and enhancement suggestions. If you have a question, please ask it in the [Discord server](https://discord.gg/QZ6B5US) instead of opening an issue – you will get redirected there anyway.**

If you wish to contribute to AxonCore codebase or documentation, feel free to fork the repository and submit a
pull request.

## Tools

We use ESLint to enforce a consistent coding style.  
We also use yarn as dependency manager. A `package-lock.json` should never be commited.

## Setup

To get ready to work on the codebase, please do the following:

1. Fork & clone the repository, and make sure you're on the **dev** branch
2. Run `yarn` to install dependencies
3. Add your features, bug fix, documentatin change etc...!
4. Make sure your code pass the tests: run `yarn test` and make sure it does not errors out
5. [Submit a pull request](https://github.com/Khaazz/AxonCore/compare)

## Semantic commit messages

A better commit structure help navigate through commit history and build patch-note by easily identifying the level of change of said commit.  
Here the commit types used in this project:

- fix(file): fix, **PATCH**
- refactor(file): improvement, implementation change without API change, **PATCH**
- perf(file): performance improvement (same as refactor) **PATCH**, **MINOR**
- feat(file): change, addition (new feature), minor API change, **MINOR**
- BREAKING(file): big API change **MAJOR**
- docs(file): documentation only change
- chore: CI and internal / dev tool changes
- typings: typings improvement or change **PATCH / MINOR**
- style: code formatting only change

Adding `(file)` is optional and is used to specify the file changed.

*Example*:
feat(Command): Add Command.useless that does nothing.
