import { createContext, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/events";

interface Context {
    socket: Socket,
    roomId?: string,
    username?: string,
    setUsername: Function
}

const socket = io(SOCKET_URL)

const SocketContext = createContext<Context>({
    socket,
    setUsername: () => false
})

const SocketsProvider = (props: any) => {
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");

    socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
        setRoomId(value);
    })

    return (
        <SocketContext.Provider value={{ socket, roomId, username, setUsername }} {...props} />
    )
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;