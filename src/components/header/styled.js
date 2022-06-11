// importa o pacote "styled-components":
import styled from 'styled-components';

// Estilizando o header:
// A constante exportada deve começar com letra maiúscula:
export const Navbar = styled.header`
  padding: 13px 80px;
  display: flex;
  background-color: #2a9d8f;

  a {
    background: none;
    color: antiquewhite;
    transition: color 200ms ease-in-out;
  }

  a:first-child {
    margin: 0 auto 0 0;
  }

  a:not(:first-child) {
    margin-left: 20px;
  }

  a:hover {
    color: orangered;
  }

  svg {
    font-size: large;
  }

  @media (max-width: 640px) {
    padding: 13px 20px;
  }
`;