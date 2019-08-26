import Channel from '../../definitions/Channel';

class DjsChannel extends Channel {
    // **** GETTERS / SETTERS **** //
    
    hasPermission(channel, user, perm) {
        return channel.permissionsFor(user.id).has(perm);
    }
    // **** METHODS **** //
    
    sendMessage(channel, content) {
        return channel.send(content);
    }
}

export default DjsChannel;
