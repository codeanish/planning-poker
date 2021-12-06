import Rooms from "../components/Rooms"
import { useSockets } from "../context/socket.context"

export default function Home() {

  const { socket } = useSockets()
  return (
    <div>
      <h1>Hello World</h1>
      <h2>{socket.id}</h2>
      <Rooms />
    </div>
  )
}
