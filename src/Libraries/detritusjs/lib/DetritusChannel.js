import Channel from '../../definitions/Channel';

class DetritusChannel extends Channel {
    hasPermission(channel, user, perm) {
        return channel.can(perm, user);
    }
    
    
    sendMessage(channel, content) {
        return channel.createMessage(content);
    }
}

export default DetritusChannel;
