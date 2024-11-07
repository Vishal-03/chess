import { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Chessboard } from "../components/Chessboard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from 'chess.js';

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
    const socket = useSocket(); // Always call this hook
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (socket) {
            setIsLoading(false); // Once socket is available, stop loading
            const handleMessage = (event: { data: string; }) => {
                const message = JSON.parse(event.data);
                console.log(message);
                switch (message.type) {
                    case INIT_GAME:
                        setBoard(chess.board());
                        console.log("Game initialized");
                        setStarted(true);
                        break;
                    case MOVE:
                        const move = message.payload;
                        chess.move(move);
                        // setChess(newChess);
                        setBoard(chess.board());
                        console.log("Move made");
                        break;
                    case GAME_OVER:
                        console.log("Game Over");
                        alert("Game Over!"); // Notify the user
                        break;
                    default:
                        console.log("Unknown message type");
                }
            };

            socket.addEventListener('message', handleMessage);

            // Cleanup on component unmount
            return () => {
                socket.removeEventListener('message', handleMessage);
            };
        } else {
            // If socket is not available, still keep the loading state active
            setIsLoading(true);
        }
    }, [socket]); // include socket and chess in the dependency array

    // Render a loading state if socket is not connected yet
    if (isLoading) {
        return <div>Connecting...</div>;
    }

    return (
        <div className="justify-center flex">
            <div className="pt-8 max-w-screen-lg ">
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-4 bg-red-200 w-full flex justify-center">
                        <Chessboard chess={chess} setBoard={setBoard} socket={socket}  board={board} />
                    </div>
                    <div className="col-span-2 bg-slate-800 w-full flex items-center">
                        <div className="px-12">
                            {!started && <Button onClick ={() => {
                                if(socket) {
                                    socket.send(JSON.stringify({
                                        type: INIT_GAME,
                                    }));
                                }
                            }}>
                                Play
                            </Button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
