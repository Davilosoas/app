import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
    --primary: #062759;
    --blue: #396FED;
    --green: #67D8BE
    --marine: #0BC2D2;
    --black: #000000;
    --white: #FFFFFF;
    --gray: #dcdcdc;
}
    body {
        margin: 0;
        padding: 0;
        background: var(--black);
        font-family: Montserrat, Sans-Serif;
    }

    h1, h2, h3, h4, h5, legend {
        color: var(--white);
    }

    fieldset {
        margin: 15px;
    }

    input {
        margin: 5px 0px 20px 0px;
        width: 300px;
        height: 30px;
        border-radius: 4px;
        padding-left: 10px;
    }
    
    button {
        width: 140px;
        height: 30px;
        background-color: #e2aa2b;
        color: var(--white);
        cursor: pointer;
    }
    span {
        color: var(--white);
        margin-left: 5px;
    }
`;
const primary = "#062759";
const blue = "#396FED";
const green = "#67D8BE";
const marine = "#0BC2D2";
const black = "#000000";
const gold = "#e2aa2b";
const white = "#FFFFFF";
const fontText = "1em";
const fontSpan = "0.61em";

export const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;    
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    align-items: center;
    border: 2px solid ${white};
    padding: 10px 30px 30px 30px;
`;

export const CardBot = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    align-items: center;
    border: 2px solid ${white};
    padding: 10px 30px 30px 30px;
`;

export const Button = styled.button`
    width: 200px;
    height: 30px;
    font-size: 1.125em;
    background-color: ${gold};
    color: ${white};
    border: 5px;
    font-weight: bolder;
    margin: 10px;   
    cursor: pointer;
    
    :hover {
        background-color: ${blue};
        transition: 0.7s;
    }
`;

export const H3 = styled.h3`  
    color: ${white};
`;

export const P1 = styled.span`
    font-size: ${fontSpan};
    color: ${white};
    margin: 10px;
`;

export const Input = styled.input`
    width: 200px;
    height: 30px;
    border: 1px solid ${gold};
    border-radius: 5px;
    padding-left: 10px;
    :focus {
        outline-color: transparent;
    }
`;

export const List = styled.li`
  display: grid;
  grid-template-columns: 20% 10% 10% 10% 10% 10% 25% ;
  grid-gap: 10px;
  border-bottom: 1px solid gold;
  text-align: center;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
}
`;

export const MainCards = styled.div`
display: flex;
flex-direction: row;
width: 100vw;
justify-content: space-around; 

@media only screen and (max-width: 1000px) {
    flex-direction:column;
}
`;

export const Text = styled.span`
    font-size: 1rem;
    color: #FFF;
    padding: 7px;
    
`;

export const MiniDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1000px) {
    flex-direction: row;
}
`;

export default GlobalStyle;