import { useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

const PokerTable = () => {

    const { socket, username, roomId } = useSockets()
    const scoreRef = useRef(null);

    const handleSubmitScore = () => {
        const score = scoreRef.current.value || null
        console.log(score)
        if (score !== null) {
            console.log("Emitting score event")
            socket.emit(EVENTS.CLIENT.PLAY_CARD, { username, score })
        }
    }
    return (
        <div>
            <h1>Poker Table</h1>
            <p>Username: {username}</p>
            <p>RoomId: {roomId}</p>
            <input placeholder="Score" ref={scoreRef} />
            <button onClick={handleSubmitScore}>Submit Score</button>
        </div>
    )
}

export default PokerTable;