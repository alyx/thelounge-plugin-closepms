"use strict";

const Chan = require("thelounge/src/models/chan");

const closePMsCommand = {
    input: function (client, target, command, args) {
        let network = target.network;
        network.channels.forEach((chan) => {
            if (chan.type == Chan.Type.QUERY) {
                client.runAsUser("/part " + chan.name, target.chan.id);
            }
        });
    },
    allowDisconnected: true
};

module.exports = {
    onServerStart: api => {
        api.Commands.add("closepms", closePMsCommand);
    },
};