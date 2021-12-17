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
        ERROR: "error",
        PLAYER_LEFT_ROOM: "player_left_room"
    },
    CLIENT: {
        CREATE_ROOM: "create_room",
        JOIN_ROOM: "join_room",
        PLAY_CARD: "play_card",
        LOGIN: "login",
        GET_ROOMS: "get_rooms",
        DISCONNECT: "disconnect",
        DISCONNECTING: "disconnecting"
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

        socket.on(EVENTS.CLIENT.DISCONNECT, () => {
            logger.info(`Socket disconnect ${socket.id}`)
            const user = users[socket.id]
            logger.info(`Player ${user} leaving rooms`)
            delete users[socket.id];
            socket.broadcast.emit(EVENTS.SERVER.PLAYER_LEFT_ROOM, user)
        })

        socket.on(EVENTS.CLIENT.DISCONNECTING, () => {
            logger.info(`Socket disconnecting ${socket.id}`)
        })
        // Send connected user list of rooms

        socket.emit(EVENTS.SERVER.ROOMS, rooms);

        socket.on(EVENTS.CLIENT.GET_ROOMS, () => {
            socket.emit(EVENTS.SERVER.ROOMS, rooms);
        })

        socket.on(EVENTS.CLIENT.JOIN_ROOM, ({ roomName, user }) => {
            logger.info(`Attempting to join ${roomName}`);
            const roomId = getRoomIdFromRoomName(roomName);
            if (roomId) {
                logger.info(`Room ${roomName} already exists with ID ${roomId}. Joining.`);
                socket.join(roomId)
                socket.emit(EVENTS.SERVER.JOINED_ROOM, { roomIdFromRoomName: roomId, user, roomName });
                socket.to(roomId).emit(EVENTS.SERVER.NEW_PLAYER_JOINED, users[socket.id])
                return;
            }
        })

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName, user }) => {
            const roomIdFromRoomName = getRoomIdFromRoomName(roomName);
            if (roomIdFromRoomName) {
                socket.emit(EVENTS.SERVER.ERROR, `Room ${roomName} already exists`);
                return;
            }
            const roomId = nanoid()
            logger.info(`Creating Room with ID: ${roomId} and Name: ${roomName}.`);
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