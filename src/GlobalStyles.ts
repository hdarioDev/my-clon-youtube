import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Roboto', sans-serif; 
        
    }
    #root{
        margin:0;
    }
    :root {
        --main-color: #0b0b0b;
    }
`