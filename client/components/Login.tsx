import { useContext, useEffect, useRef } from "react";
import EVENTS from "../config/events";
import gameContext from "../context/gameContext";
import socketService from "../services/socketService";
import {StyledButton, StyledColumnContainer, StyledInput} from "../styles/shared-components"

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
                <StyledColumnContainer>
                    <StyledInput placeholder="Username" ref={usernameRef} />
                    <StyledButton onClick={handleSetUsername}>START</StyledButton>
                </StyledColumnContainer>
            )}
        </div>
    )
}

export default Login;