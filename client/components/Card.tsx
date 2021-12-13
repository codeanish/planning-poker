import React, { useContext } from 'react'
import styled from "styled-components"
import gameContext from '../context/gameContext';
import gameService from '../services/GameService';
import socketService from '../services/SocketService';

const StyledCard = styled.button`
    height: 150px;
    width: 100px;
    padding: 20px;
    margin: 20px;
    border-radius: 5px;
    border: 0;
`;

interface ICard {
    value: number;
}

const Card = (props: ICard) => {

    const {
        username,
        roomId
    } = useContext(gameContext);

    const handleSubmitScore = () => {
        gameService.playCard(socketService.socket, username, roomId, props.value);
    }

    return (
        <StyledCard onClick={handleSubmitScore}>
            {props.value}
        </StyledCard>
    )
}

export default Card;