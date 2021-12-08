import { useContext, useEffect, useRef } from "react";
import EVENTS from "../config/events";
import gameContext from "../context/gameContext";
import socketService from "../services/socketService";

const Login = () => {
    const { 
        username,
        setUsername
    } = useContext(gameContext)

    const usernameRef = useRef(null);

    const handleSetUsername = () => {
        const value = usernameRef.current.value;
        if (!value) {
            return
        }

        setUsername(value);
        
        localStorage.setItem("username", value)

        socketService.socket.emit(EVENTS.CLIENT.LOGIN, value)
    }

    useEffect(() => {
        if (usernameRef) {
            usernameRef.current.value = localStorage.getItem("username") || ''
        }
    }, [])

    return (
        <div>
            {!username && (
                <div>
                    <input placeholder="Username" ref={usernameRef} />
                    <button onClick={handleSetUsername}>START</button>
                </div>
            )}
        </div>
    )
}

export default Login;