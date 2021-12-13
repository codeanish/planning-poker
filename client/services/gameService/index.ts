import { Socket } from "socket.io-client";
import EVENTS from "../../config/events";

export interface IRoomUser {
    roomId: string,
    user: string,
    roomName: string
}

class GameService {
    public async joinGameRoom(socket: Socket, roomName: string, user: string): Promise<IRoomUser> {
        return new Promise((resolve, reject) => {
            socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName, user });
            socket.on(EVENTS.SERVER.JOINED_ROOM, ({ roomId, user, roomName }) => {
                console.log(roomId)
                console.log(user)
                console.log(roomName)
                resolve({ roomId, user, roomName })
            })
            socket.on(EVENTS.SERVER.ERROR, ({ error }) => reject(error))
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
}

export default new GameService();