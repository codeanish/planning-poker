import EVENTS from "../config/events";
import { useContext, useRef } from "react";
import socketService from "../services/socketService";
import gameContext from "../context/gameContext";
import gameService from "../services/gameService";

const Rooms = () => {
    const {
        setIsInRoom,
        setRoomId
    } = useContext(gameContext)

    const newRoomRef = useRef(null);

    const handleCreateRoom = async () => {
        const roomName = newRoomRef.current.value || ''
        if (!String(roomName).trim()) {
            return;
        }
        const roomId = await gameService
            .joinGameRoom(socketService.socket, roomName)
            .catch((err) => {
                alert(err);
            });
        console.log(roomId)
        if (roomId) {
            setRoomId(roomId)
            setIsInRoom(true);
        }
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