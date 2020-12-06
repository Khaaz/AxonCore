import Channel from '../../definitions/Channel';

class DetritusChannel extends Channel {
    hasPermission(channel, user, perm) {
        if (!user.permissions && channel.guild) {
            user = channel.guild.members.get(user.id);
        } else {
            return true;
        }

        return channel.can(perm, user);
    }
    
    
    sendMessage(channel, content) {
        return channel.createMessage(content);
    }
}

export default DetritusChannel;
