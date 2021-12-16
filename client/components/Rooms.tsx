import { useContext, useEffect, useRef } from "react";
import socketService from "../services/SocketService";
import gameContext from "../context/gameContext";
import gameService from "../services/GameService";
import { StyledColumnContainer, StyledInput, StyledButton, StyledRowContainer } from "../styles/shared-components";
import styled from "styled-components"

const StyledRoomsContainer = styled.div`
    width: 400px;
    height: 250px;
`;

const StyledRoomList = styled.div`
    display: flex;
`

const StyledRoomButton = styled.button`
    height: 150px;
    width: 100px;
    padding: 20px;
    margin: 20px;
    border-radius: 5px;
    border: 0;
`;

const Rooms = () => {
    const {
        setIsInRoom,
        setRoomId,
        users,
        setUsers,
        username,
        setRoomName,
        rooms,
        setRooms
    } = useContext(gameContext)

    const newRoomRef = useRef(null);

    useEffect(() => {
        getAvailableRooms()
    }, [])

    const getAvailableRooms = async () => {
        const availableRooms = await gameService.getRooms(socketService.socket)
            .catch((err) => {
                alert(err);
            });

        if (availableRooms) {
            console.log(availableRooms)
            setRooms(availableRooms);
        }
    }

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

    const handleJoinRoom = async (e) => {
        // The room name on the button
        const roomName = e.target.innerText;

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
                <StyledButton onClick={handleCreateRoom}>CREATE ROOM</StyledButton>
                <StyledRoomList>
                    {rooms.map(room => (<StyledRoomButton key={room.roomId} onClick={handleJoinRoom}>{room.roomName}</StyledRoomButton>))}
                </StyledRoomList>
            </StyledColumnContainer>
        </StyledRoomsContainer>
    )
}

export default Rooms;