import { useContext, useRef } from "react";
import socketService from "../services/SocketService";
import gameContext from "../context/gameContext";
import gameService from "../services/GameService";
import { StyledColumnContainer, StyledInput, StyledButton } from "../styles/shared-components";

const Rooms = () => {
    const {
        setIsInRoom,
        setRoomId,
        users,
        setUsers,
        username,
        setRoomName
    } = useContext(gameContext)

    const newRoomRef = useRef(null);

    const handleCreateRoom = async () => {
        const roomName = newRoomRef.current.value || ''
        if (!String(roomName).trim()) {
            return;
        }
        const roomUser = await gameService
            .joinGameRoom(socketService.socket, roomName, username)
            .catch((err) => {
                alert(err);
            });
        if (roomUser) {
            console.log(roomUser)
            setRoomId(roomUser.roomId)
            setUsers([...users, roomUser.user])
            setRoomName(roomUser.roomName)
            setIsInRoom(true);
        }
    }

    return (
        <StyledColumnContainer>
            <StyledInput ref={newRoomRef} placeholder="Room Name" />
            <StyledButton onClick={handleCreateRoom}>CREATE OR JOIN ROOM</StyledButton>
        </StyledColumnContainer>
    )
}

export default Rooms;