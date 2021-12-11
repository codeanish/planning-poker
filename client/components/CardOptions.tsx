import Card from "./Card";
import styled from "styled-components"

const StyledList = styled.div`
    display: flex;
`;

const CardOptions = () => {
    return (
        <StyledList>
            <Card value={0.5}></Card>
            <Card value={1}></Card>
            <Card value={2}></Card>
            <Card value={4}></Card>
            <Card value={8}></Card>
            <Card value={16}></Card>
        </StyledList>
    )
}

export default CardOptions;