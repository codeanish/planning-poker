import { useContext, useEffect, useRef } from "react";
import Login from "../components/Login";
import PokerTable from "../components/PokerTable";
import Rooms from "../components/Rooms"
import gameContext from "../context/gameContext";
import socketService from "../services/socketService";


export default function Home() {

  // const { socket, username, roomId } = useSockets()
  const{ username, isInRoom } = useContext(gameContext)

  return (
    <div>
      {!username && (
        <Login />
      )}
      {username && (
        <div>
          <h1>Hello World</h1>
          <h2>{socketService.socket.id}</h2>
          <Rooms />
          {isInRoom && (
            <PokerTable />
          )}
        </div>
      )}

    </div>
  )
}
