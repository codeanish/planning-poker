import { Server, Socket } from 'socket.io';
import logger from './utils/logger';
import { nanoid } from 'nanoid';
import { SocketAddress } from 'net';

const EVENTS = {
    CONNECTION: "connection",
    SERVER: {
        ROOMS: "rooms",
        JOINED_ROOM: "joined_room",
    },
    CLIENT: {
        CREATE_ROOM: "create_room",
        PLAY_CARD: "play_card"
    }
}

const rooms: Record<string, { name: string }> = {}

const getRoomIdFromRoomName = (roomName: string) => {
    if (!rooms) return;

    return Object.keys(rooms).find(key => rooms[key].name === roomName);
}

const socket = ({ io }: { io: Server }) => {
    logger.info(`Sockets enabled`);
    io.on(EVENTS.CONNECTION, (socket: Socket) => {
        logger.info(`User connected: ${socket.id}`)
        // Send connected user list of rooms
        socket.emit(EVENTS.SERVER.ROOMS, rooms);

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
            logger.info({ roomName });
            const roomIdFromRoomName = getRoomIdFromRoomName(roomName);
            if (roomIdFromRoomName) {
                logger.info(`Room ${roomName} already exists with ID ${roomIdFromRoomName}. Joining.`);
                socket.join(roomIdFromRoomName)
                socket.emit(EVENTS.SERVER.JOINED_ROOM, roomIdFromRoomName);
                return;
            }

            const roomId = nanoid()
            logger.info(`Creating Room with ID: ${roomId}. Joining.`);
            rooms[roomId] = {
                name: roomName
            }
            socket.join(roomId)
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId)
        })

        socket.on(EVENTS.CLIENT.PLAY_CARD, ({ username, score }) => {
            logger.info(`UserID: ${username}, Score: ${score}`)
        })
    })

};

export default socket;