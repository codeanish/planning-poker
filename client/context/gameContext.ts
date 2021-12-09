import { createContext } from "react"

export interface IGameContext {
    isInRoom: boolean,
    setIsInRoom: (inRoom: boolean) => void,
    username: string,
    setUsername: (name: string) => void,
    scores: object,
    setScores: (scores: object) => void,
    roomId: string,
    setRoomId: (roomId: string) => void
}

const defaultState: IGameContext = {
    isInRoom: false,
    setIsInRoom: () => { },
    username: "",
    setUsername: () => { },
    scores: {},
    setScores: () => { },
    roomId: "",
    setRoomId: () => { }
}

export default createContext(defaultState);
