import { useContext, useRef } from "react";
import socketService from "../services/SocketService";
import gameContext from "../context/gameContext";
import gameService from "../services/GameService";
import { StyledColumnContainer, StyledInput, StyledButton, StyledRowContainer } from "../styles/shared-components";
import styled from "styled-components"

const StyledRoomsContainer = styled.div`
    width: 400px;
    height: 250px;
`;

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
            .createGameRoom(socketService.socket, roomName, username)
            .catch((err) => {
                alert(err);
            });
        if (roomUser) {
            setRoomId(roomUser.roomId)
            setUsers([...users, roomUser.user])
            setRoomName(roomUser.roomName)
            setIsInRoom(true);
        }
    }

    const handleJoinRoom = async () => {
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
            setRoomId(roomUser.roomId)
            setUsers([...users, roomUser.user])
            setRoomName(roomUser.roomName)
            setIsInRoom(true);
        }
    }

    return (
        <StyledRoomsContainer>
            <StyledColumnContainer>
                <StyledInput ref={newRoomRef} placeholder="Room Name" />
                <StyledRowContainer>
                    <StyledButton onClick={handleCreateRoom}>CREATE ROOM</StyledButton>
                    <StyledButton onClick={handleJoinRoom}>JOIN ROOM</StyledButton>
                </StyledRowContainer>
            </StyledColumnContainer>
        </StyledRoomsContainer>
    )
}

export default Rooms;