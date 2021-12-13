import { useContext, useEffect, useRef } from "react";
import Login from "../components/Login";
import PokerTable from "../components/PokerTable";
import Rooms from "../components/Rooms"
import gameContext from "../context/gameContext";
import socketService from "../services/socketService";
import styled from "styled-components"

const StyledContainer = styled.div`
display: flex;
justify-content: center;
min-height: 100vh;
align-items: center;
text-align: center;
`;

export default function Home() {

  const { username, isInRoom } = useContext(gameContext)

  return (
    <StyledContainer>
      {!username && (
        <Login />
      )}
      {username && (
        <div>
          {!isInRoom && (
            <Rooms />
          )}
          {isInRoom && (
            <PokerTable />
          )}
        </div>
      )}

    </StyledContainer>
  )
}
