import { useContext, useEffect, useRef } from "react";
import EVENTS from "../config/events";
import gameContext from "../context/gameContext";
import gameService from "../services/gameService";
import socketService from "../services/socketService";

const PokerTable = () => {

    const { username, roomId, setScores, scores } = useContext(gameContext)
    const scoreRef = useRef(null);

    const handleSubmitScore = () => {
        const score = scoreRef.current.value || null
        if (score !== null) {
            gameService.playCard(socketService.socket, username, roomId, score);
        }
    }

    const handleGameUpdate = () => {
        gameService.onScoreUpdate(socketService.socket, ({ username, score }) => {
            if (username in scores) {
                console.log(`User ${username} already exists in scores. Updating`)
            }
            if (Object.keys(scores).length) {
                console.log("Setting Scores")
                setScores({ username: score })
            } else {
                console.log("Setting scores")
                setScores({ ...scores, [username]: score })
            }
            console.log(scores)
        })
    }

    useEffect(() => {
        handleGameUpdate();
    }, [])

    return (
        <div>
            <h1>Poker Table</h1>
            <p>Username: {username}</p>
            <input placeholder="Score" ref={scoreRef} />
            <button onClick={handleSubmitScore}>Submit Score</button>
        </div>
    )
}

export default PokerTable;