import Client from '../../definitions/Client';

class ErisClient extends Client {
    get client() {
        return this.lib.botClient;
    }

    getAvatar() {
        return this.getUser() ? this.getUser().avatarURL : null;
    }

    getMember(guild) {
        return guild.members.get(this.client.user.id);
    }

    // **** METHODS **** //

    connect() {
        return this.client.connect();
    }

    setPresence(status, game) {
        return this.client.editStatus(status, game);
    }

    triggerWebhook(id, token, data) {
        return this.client.executeWebhook(id, token, data);
    }
}

export default ErisClient;
