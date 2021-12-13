import { useContext, useRef } from "react";
import socketService from "../services/socketService";
import gameContext from "../context/gameContext";
import gameService from "../services/gameService";
import { StyledColumnContainer, StyledInput, StyledButton } from "../styles/shared-components";

const Rooms = () => {
    const {
        setIsInRoom,
        setRoomId,
        users,
        setUsers,
        username
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