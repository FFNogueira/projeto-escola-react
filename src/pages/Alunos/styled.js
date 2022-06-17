// importa o pacote "styled-components":
import styled from 'styled-components';

// Estilizando um parágrafo:
// A constante exportada deve começar com letra miúscula:
export const Page = styled.section`
  margin: 30px auto;

  h1 {
    text-align: center;
    font-size: 32px;
    padding: 0 10px;
    color: antiquewhite;
  }

  .lista {
    margin: 0 auto;
    max-width: 500px;
    padding: 20px;
  }

  .aluno {
    border-radius: 5px;
    background-color: lavender;
    padding: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
  }

  .options {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .options a {
    color: #3498db;
    margin-right: 5px;
  }

  .options a:nth-of-type(2) {
    color: #e74c3c;
  }

  .options a:hover {
    color: #264653;
  }

  .profile {
    display: flex;
    align-items: center;
  }

  .profile img {
    max-width: 100px;
    height: auto;
    border-radius: 5px;
  }

  .profile .dados {
    margin-left: 5%;
  }

  p span {
    font-weight: bold;
    color: firebrick;
  }
`;
