import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
   }

   body{
     font-family: 'Quicksand',sans-serif;
     background-color: #264653;
   }

   html, body, #root{
     height: 100%;
   }

   button {
     cursor: pointer;
     border: none;
     background-color: #E76F51;
     color: antiquewhite;
     padding: 10px 15px;
     border-radius: 4px;
     transition: background-color 200ms ease-in-out;
     font-weight: 700;
     margin: 10px auto;
   }

   button:hover{
    background-color: #fb5127;
   }

   svg {
     pointer-events: none;
   }

   a {
     text-decoration: none;
   }
`;
