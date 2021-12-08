import { useEffect, useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

const Login = () => {
    const { socket, username, setUsername } = useSockets()

    const usernameRef = useRef(null);

    const handleSetUsername = () => {
        const value = usernameRef.current.value;
        if (!value) {
            return
        }

        setUsername(value);

        localStorage.setItem("username", value)

        socket.emit(EVENTS.CLIENT.LOGIN, value)
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