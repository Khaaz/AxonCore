npm install (no optional)

You need to extends axonCore.AxonClient - link.
axonOptions {
    what is inside, what it looks like
}
configs - options/what it does
axonClient take all modules.

Auto listeners
Auto webhooks
Auto DB connection
Auto creation Eris client...

Details in [link to structure main]
(Structures file? or here?)
To create a module you need to extend axonCore.Module - link
module take all commands/events/schemas
export all modules like [example]

To create a command you need to extend axonCore.Command - link
export all commands like [example]

Extends resolver? - link | pass your own
extends Utils - link | pass you own (extended)
extends AxonUtils but not touching - link
Logger - pass a custom one (has all methods)
