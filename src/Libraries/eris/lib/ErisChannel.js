import Channel from '../../definitions/Channel';

class ErisChannel extends Channel {
    // **** GETTERS / SETTERS **** //
    
    hasPermission(channel, user, perm) {
        return channel.permissionsOf(user.id).has(perm);
        // djs: channel.permissionsFor(user.id).has(perm)
    }
    // **** METHODS **** //
    
    sendMessage(channel, content) {
        if (typeof content === 'object') {
            const file  = content.file || {};
            return channel.send(content, file);
        }
        return channel.createMessage(content);
    }
}

export default ErisChannel;
