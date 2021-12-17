import { Socket } from "socket.io-client";
import EVENTS from "../config/events"
import { IRoom } from "../context/gameContext";

export interface IRoomUser {
    roomId: string,
    user: string,
    roomName: string
}

class GameService {
    public async joinGameRoom(socket: Socket, roomName: string, user: string): Promise<IRoomUser> {
        return new Promise((resolve, reject) => {
            socket.emit(EVENTS.CLIENT.JOIN_ROOM, { roomName, user });
            socket.on(EVENTS.SERVER.JOINED_ROOM, ({ roomId, user, roomName }) => {
                console.log(`User ${user} Joined ${roomName} with ID ${roomId}`)
                resolve({ roomId, user, roomName })
            })
            socket.on(EVENTS.SERVER.ERROR, (error) => reject(error))
        })
    }

    public async getRooms(socket: Socket): Promise<IRoom[]> {
        return new Promise((resolve, reject) => {
            socket.emit(EVENTS.CLIENT.GET_ROOMS)
            socket.on(EVENTS.SERVER.ROOMS, (rooms: Object) => {
                console.log(`Rooms: ${rooms}`)
                const availableRooms: IRoom[] = []
                Object.keys(rooms).map((key, index) => {
                    console.log(`RoomID: ${key}, RoomName: ${rooms[key].name}`)
                    const roomId = key
                    const roomName = rooms[key].name
                    availableRooms.push({ roomId, roomName })
                })
                resolve(availableRooms)
            })
            socket.on(EVENTS.SERVER.ERROR, (error) => reject(error))
        })
    }

    public async createGameRoom(socket: Socket, roomName: string, user: string): Promise<IRoomUser> {
        return new Promise((resolve, reject) => {
            socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName, user });
            socket.on(EVENTS.SERVER.JOINED_ROOM, ({ roomId, user, roomName }) => {
                console.log(`User ${user} created ${roomName} with ID ${roomId}`)
                resolve({ roomId, user, roomName })
            })
            socket.on(EVENTS.SERVER.ERROR, (error) => reject(error))
        })
    }

    public playCard(socket: Socket, username: string, roomId: string, score: number) {
        socket.emit(EVENTS.CLIENT.PLAY_CARD, { username, roomId, score })
    }

    public async onScoreUpdate(socket: Socket, listener: (newScore: { username: string, score: number }) => void) {
        socket.on(EVENTS.SERVER.PLAYED_CARD, ({ username, score }) => {
            listener({ username, score })
        })
    }

    public async onNewPlayerJoined(socket: Socket, listener: (username: string) => void) {
        socket.on(EVENTS.SERVER.NEW_PLAYER_JOINED, (username) => {
            listener(username)
        })
    }

    public async onPlayerLeft(socket: Socket, listener: (username: string) => void) {
        socket.on(EVENTS.SERVER.PLAYER_LEFT_ROOM, (username) => {
            listener(username);
        })
    }
}

export default new GameService();