import { useContext, useEffect, useRef, useState } from "react";
import EVENTS from "../config/events";
import gameContext from "../context/gameContext";
import gameService from "../services/gameService";
import socketService from "../services/socketService";

const PokerTable = () => {

    const { username, roomId, setScores, scores } = useContext(gameContext)
    const scoreRef = useRef(null);
    const scoresRef = useRef({});

    const handleSubmitScore = () => {
        const score = scoreRef.current.value || null
        if (score !== null) {
            gameService.playCard(socketService.socket, username, roomId, score);
        }
    }

    // Using a reference to current scores here as the initial state passed in here is updated over time
    const handleGameUpdate = () => {
        gameService.onScoreUpdate(socketService.socket, ({ username, score }) => {
            setScores({ ...scoresRef.current, [username]: score })
        })
    }

    useEffect(() => {
        scoresRef.current = scores
        handleGameUpdate();
    }, [])

    // When score update is triggered, update the scoresRef to the new scores object
    useEffect(() => {
        scoresRef.current = scores
    }, [scores])

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