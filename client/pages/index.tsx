import { useEffect, useRef } from "react";
import Login from "../components/Login";
import PokerTable from "../components/PokerTable";
import Rooms from "../components/Rooms"
import { useSockets } from "../context/socket.context"

export default function Home() {

  const { socket, username, roomId } = useSockets()


  return (
    <div>
      {!username && (
        <Login />
      )}
      {username && (
        <div>
          <h1>Hello World</h1>
          <h2>{socket.id}</h2>
          <Rooms />
          {roomId && (
            <PokerTable />
          )}
        </div>
      )}

    </div>
  )
}
