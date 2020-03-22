import Client from '../../definitions/Client';

class DetritusClient extends Client {
    get client() {
        return this.lib.botClient;
    }

    getAvatar() {
        return this.getUser() ? this.getUser().avatarUrl : null;
    }

    getMember(guild) {
        return guild.members.get(this.client.user.id);
    }

    // **** METHODS **** //

    connect() {
        return this.client.run();
    }

    setPresence(status, game) {
        return this.client.gateway.setPresence( { status, game } );
    }

    triggerWebhook(id, token, data) {
        return this.client
            ? this.client.executeWebhook(id, token, data)
            : super.triggerWebhook(id, token, data);
    }
}

export default DetritusClient;
