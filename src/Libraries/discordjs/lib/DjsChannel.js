import Channel from '../../definitions/Channel';

class DjsChannel extends Channel {
    // **** GETTERS / SETTERS **** //
    
    hasPermission(channel, user, perm) {
        return channel.permissionsFor(user.id).has(perm);
    }
    // **** METHODS **** //
    
    sendMessage(channel, content) {
        if (typeof content === 'object') {
            const message = content.content || '';
            return channel.send(message, content);
        }
        return channel.send(content);
    }
}

export default DjsChannel;
