"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameChangeClass_1 = require("./GameChangeClass");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new GameChangeClass_1.GameManager();
wss.on('connection', function connection(ws) {
    console.log("Server connected");
    gameManager.addUser(ws);
    ws.on("disconnect", () => gameManager.removeUser(ws));
});
