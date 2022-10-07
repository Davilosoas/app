import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
    --primary: #062759;
    --blue: #396FED;
    --green: #67D8BE
    --marine: #0BC2D2;
    --black: #000000;
    --white: #FFFFFF;
}
    body {
        margin: 0;
        padding: 0;
        background: var(--primary);
        font-family: Montserrat, Sans-Serif;
    }

    h1,h4 {
        color: var(--white);
    }
`;
const primary = "#062759";
const blue = "#396FED";
const green = "#67D8BE";
const marine = "#0BC2D2";
const black = "#000000";
const white = "#FFFFFF";
const fontText = "1em";
const fontSpan = "0.61em";

export const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;    
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    align-items: center;
    border: 2px solid ${green};
    padding: 10px 30px 30px 30px;
`;

export const CardBot = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    align-items: center;
    border: 2px solid ${green};
    padding: 10px 30px 30px 30px;
`;

export const Button = styled.button`
    width: 200px;
    height: 30px;
    font-size: 1.125em;
    background-color: ${marine};
    color: ${primary};
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
    border: 1px solid ${marine};
    border-radius: 5px;
    padding-left: 10px;
    :focus {
        outline-color: transparent;
    }
`;

export default GlobalStyle;