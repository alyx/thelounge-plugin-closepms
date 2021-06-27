"use strict";

const _ = require("lodash");
const Chan = require("thelounge/src/models/chan");

const closePMsCommand = {
    input: function (client, target, command, args) {
        let network = target.network;
        network.channels.forEach((chan) => {
            if (chan.type == Chan.Type.QUERY) {
                network.channels = _.without(network.channels, chan);
                chan.destroy();
                client.client.emit("part", {
                    chan: chan.id,
                });
                client.client.save();
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