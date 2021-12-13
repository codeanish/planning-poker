import { Server, Socket } from 'socket.io';
import logger from './utils/logger';
import { nanoid } from 'nanoid';
import { SocketAddress } from 'net';

const EVENTS = {
    CONNECTION: "connection",
    SERVER: {
        ROOMS: "rooms",
        JOINED_ROOM: "joined_room",
        PLAYED_CARD: "played_card",
        NEW_PLAYER_JOINED: "new_player_joined",
        ERROR: "error"
    },
    CLIENT: {
        CREATE_ROOM: "create_room",
        PLAY_CARD: "play_card",
        LOGIN: "login"
    }
}

const rooms: Record<string, { name: string }> = {}
const users: Record<string, string> = {}

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

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName, user }) => {
            logger.info({ roomName });
            logger.info({ user });
            const roomIdFromRoomName = getRoomIdFromRoomName(roomName);
            if (roomIdFromRoomName) {
                logger.info(`Room ${roomName} already exists with ID ${roomIdFromRoomName}. Joining.`);
                socket.join(roomIdFromRoomName)
                socket.emit(EVENTS.SERVER.JOINED_ROOM, { roomIdFromRoomName, user, roomName });
                socket.to(roomIdFromRoomName).emit(EVENTS.SERVER.NEW_PLAYER_JOINED, users[socket.id])
                return;
            }

            const roomId = nanoid()
            logger.info(`Creating Room with ID: ${roomId}. Joining.`);
            rooms[roomId] = {
                name: roomName
            }
            socket.join(roomId)
            socket.emit(EVENTS.SERVER.JOINED_ROOM, { roomId, user, roomName })
        })

        socket.on(EVENTS.CLIENT.PLAY_CARD, ({ username, roomId, score }) => {
            logger.info(`UserID: ${username}, RoomID: ${roomId}, Score: ${score}`)
            io.in(roomId).emit(EVENTS.SERVER.PLAYED_CARD, { username, score })
        })

        socket.on(EVENTS.CLIENT.LOGIN, (value) => {
            logger.info(`User ${value} logged in`)
            users[socket.id] = value
        })
    })

};

export default socket;