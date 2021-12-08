import EVENTS from "../config/events";
import { useContext, useRef } from "react";
import socketService from "../services/socketService";
import gameContext from "../context/gameContext";

const Rooms = () => {
    const {
        setIsInRoom
    } = useContext(gameContext)
    
    const newRoomRef = useRef(null);

    const handleCreateRoom = () => {
        const roomName = newRoomRef.current.value || ''
        if (!String(roomName).trim()) {
            return;
        }
        socketService.socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });
        setIsInRoom(true);
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