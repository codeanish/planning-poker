import { useEffect, useRef } from "react";
import { useSockets } from "../context/socket.context";

const Login = () => {
    const { username, setUsername } = useSockets()

    const usernameRef = useRef(null);

    const handleSetUsername = () => {
        const value = usernameRef.current.value;
        if (!value) {
            return
        }

        setUsername(value);

        localStorage.setItem("username", value)
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