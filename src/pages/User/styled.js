// importa o pacote "styled-components":
import styled from 'styled-components';

// Estilizando um parágrafo:
// A constante exportada deve começar com letra miúscula:
export const Edit = styled.section`
  margin: 30px auto;

  h1 {
    text-align: center;
    font-size: 32px;
    padding: 0 10px;
    color: antiquewhite;
  }

  form {
    display: flex;
    flex-direction: column;
    max-width: 320px;
    margin: 20px auto;
    background-color: lavender;
    padding: 20px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  }

  input {
    margin: 5px 0;
    height: 30px;
    font-size: large;
    padding: 3px;
    border-radius: 4px;
    border: 2px solid #ddd;

    &::placeholder {
      font-family: Quicksand, sans-serif;
      font-style: italic;
      font-size: large;
    }

    &:focus {
      border: 2px solid #2a9d8f;
    }
  }

  svg {
    margin-right: 7px;
  }
`;
