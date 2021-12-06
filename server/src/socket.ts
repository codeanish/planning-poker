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
        JOIN_ROOM: "join_room",
        CREATE_ROOM: "create_room"
    }
}

const rooms: Record<string, { name: string }> = {}

const socket = ({ io }: { io: Server }) => {
    logger.info(`Sockets enabled`);
    io.on(EVENTS.CONNECTION, (socket: Socket) => {
        logger.info(`User connected: ${socket.id}`)
        // Send connected user list of rooms
        socket.emit(EVENTS.SERVER.ROOMS, rooms);

        socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
            socket.join(roomId)
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        })

        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
            console.log({ roomName });

            const roomId = nanoid()

            rooms[roomId] = {
                name: roomName
            }

            socket.join(roomId)

            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

            socket.emit(EVENTS.SERVER.ROOMS, rooms)

            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId)
        })
    })

};

export default socket;