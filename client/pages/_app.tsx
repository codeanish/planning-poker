import { useEffect, useState } from 'react';
import socketService from '../services/SocketService';
import GameContext, { IGameContext } from '../context/gameContext';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const [isInRoom, setIsInRoom] = useState(false);
  const [username, setUsername] = useState("");
  const [scores, setScores] = useState({});
  const [roomId, setRoomId] = useState("");
  const [users, setUsers] = useState([]);
  const [roomName, setRoomName] = useState("");

  const connectSocket = async () => {
    const socket = await socketService
      .connect("http://localhost:4000")
      .catch((err) => {
        console.log("Error: ", err);
      });
    console.log(socket)
  };

  // Use useEffect to only do a connectSocket on startup, not on every render
  useEffect(() => {
    connectSocket();
  }, []);

  const gameContextValue: IGameContext = {
    isInRoom,
    setIsInRoom,
    username,
    setUsername,
    scores,
    setScores,
    roomId,
    setRoomId,
    users,
    setUsers,
    roomName,
    setRoomName
  }

  return <GameContext.Provider value={gameContextValue}><Component {...pageProps} /></GameContext.Provider>
}

export default MyApp
