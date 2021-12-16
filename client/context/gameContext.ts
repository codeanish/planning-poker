import { createContext } from "react"

export interface IRoom {
    roomId: string,
    roomName: string
}

export interface IGameContext {
    isInRoom: boolean,
    setIsInRoom: (inRoom: boolean) => void,
    username: string,
    setUsername: (name: string) => void,
    scores: object,
    setScores: (scores: object) => void,
    roomId: string,
    setRoomId: (roomId: string) => void,
    users: string[],
    setUsers: (users: string[]) => void,
    roomName: string,
    setRoomName: (roomName: string) => void,
    rooms: IRoom[],
    setRooms: (rooms: IRoom[]) => void
}

const defaultState: IGameContext = {
    isInRoom: false,
    setIsInRoom: () => { },
    username: "",
    setUsername: () => { },
    scores: {},
    setScores: () => { },
    roomId: "",
    setRoomId: () => { },
    users: [],
    setUsers: () => [],
    roomName: "",
    setRoomName: () => [],
    rooms: [],
    setRooms: () => []
}

export default createContext(defaultState);
