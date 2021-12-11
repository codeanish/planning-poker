import { useContext, useEffect, useRef } from "react";
import gameContext from "../context/gameContext";
import gameService from "../services/gameService";
import socketService from "../services/socketService";
import CardOptions from "./CardOptions";

const PokerTable = () => {

    const { username, setScores, scores } = useContext(gameContext)
    const scoresRef = useRef({});

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
            <CardOptions />
        </div>
    )
}

export default PokerTable;