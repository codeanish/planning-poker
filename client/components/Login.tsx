import { useContext, useEffect, useRef } from "react";
import EVENTS from "../config/events";
import gameContext from "../context/gameContext";
import socketService from "../services/socketService";
import styled from "styled-components"

const Login = () => {
    const {
        username,
        setUsername
    } = useContext(gameContext)

    const usernameRef = useRef(null);

    const StyledContainer = styled.div`
        display: flex;
        flex-direction: column;
    `;

    const StyledInput = styled.input`
        width: 200px;
        padding: 10px;
        margin: 10px 0;
        border: 0;
        border-bottom: 1px solid #eee;
        border-radius: 5px;
        box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    `;

    const StyledButton = styled.button`
        border: 0;
        border-radius: 5px;
        padding: 10px;
    `

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
                <StyledContainer>
                    <StyledInput placeholder="Username" ref={usernameRef} />
                    <StyledButton onClick={handleSetUsername}>START</StyledButton>
                </StyledContainer>
            )}
        </div>
    )
}

export default Login;