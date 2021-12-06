import { createContext, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/events";

interface Context {
    socket: Socket,
    rooms: object,
    roomId?: string
}

const socket = io(SOCKET_URL)

const SocketContext = createContext<Context>({
    socket,
    rooms: {}
})

const SocketsProvider = (props: any) => {
    const [rooms, setRooms] = useState({});
    const [roomId, setRoomId] = useState("");

    // Set rooms when receiving message from server
    socket.on(EVENTS.SERVER.ROOMS, (value) => setRooms(value))

    socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
        setRoomId(value);
    })

    return (
        <SocketContext.Provider value={{ socket, rooms, roomId }} {...props} />
    )
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;