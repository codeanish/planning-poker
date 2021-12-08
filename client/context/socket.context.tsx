import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/events";

interface Context {
    socket: Socket,
    roomId?: string,
    username?: string,
    setUsername: Function,
    scores?: Object,
    setScores: Function
}

const socket = io(SOCKET_URL)

const SocketContext = createContext<Context>({
    socket,
    setUsername: () => false,
    setScores: () => false
})

const SocketsProvider = (props: any) => {
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");
    const [scores, setScores] = useState({});

    socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
        setRoomId(value);
    })

    socket.on(EVENTS.SERVER.PLAYED_CARD, ({ username, score }) => {
        setScores({ ...scores, [username]: score });
    })

    socket.on(EVENTS.SERVER.NEW_PLAYER_JOINED, (value) => {
        console.log(value)
        setScores({ ...scores, [value]: null })
    })

    return (
        <SocketContext.Provider value={{ socket, roomId, username, setUsername, scores, setScores }} {...props} />
    )
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;