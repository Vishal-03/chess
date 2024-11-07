import { WebSocketServer } from 'ws';
import { GameManager } from './GameChangeClass';

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
    console.log("Server connected");

    gameManager.addUser(ws);

    ws.on("disconnect", () => gameManager.removeUser(ws))
});