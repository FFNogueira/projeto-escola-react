// importa o pacote "styled-components":
import styled from 'styled-components';

// Estilizando o header:
// A constante exportada deve começar com letra maiúscula:
export const Navbar = styled.header`
  padding: 10px 80px;
  display: flex;
  background-color: #2a9d8f;

  p {
    position: absolute;
    margin-left: -45px;
    margin-top: 8px;
    background-color: #61616196;
    border-radius: 3px;
    padding: 5px;
    color: antiquewhite;
    text-align: center;
    transition: all 200ms ease-in-out;
  }

  a,
  button {
    background: none;
    color: antiquewhite;
    transition: visibility 200ms ease-in-out;
    &:not(:hover) + p {
      visibility: hidden;
      opacity: 0;
    }
  }

  button {
    margin: 0 0 0 25px;
    padding: 0;
  }

  div:nth-of-type(1) {
    margin: 0 auto 0 0;
  }

  div:not(:nth-of-type(1)) {
    margin-left: 25px;
  }

  a:hover,
  button:hover {
    color: orangered;

    & + p {
      visibility: visible;
      opacity: 100;
    }
  }

  svg {
    font-size: x-large;
  }

  @media (max-width: 640px) {
    padding: 10px 20px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;
