import { useSockets } from "../context/socket.context";
import EVENTS from "../config/events";
import { useRef } from "react";

const Rooms = () => {
    const { socket, roomId } = useSockets()
    const newRoomRef = useRef(null);

    const handleCreateRoom = () => {
        const roomName = newRoomRef.current.value || ''
        if (!String(roomName).trim()) {
            return;
        }
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });
        newRoomRef.current.value = "";
    }

    return (
        <div>
            <h1>Rooms</h1>
            <input ref={newRoomRef} placeholder="Room Name" />
            <button onClick={handleCreateRoom}>CREATE OR JOIN ROOM</button>
        </div >
    )
}

export default Rooms;