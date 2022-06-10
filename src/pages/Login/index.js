// Necessário sempre que se cria um componente:
import React from 'react';
// importa o styled component específico para os...
// ...parágrafos desta página:
import { LoginPage } from './styled';
// Cria o componente "página de Login":
export default function Login() {
  return (
    <LoginPage>
      <h1> Você está na página de login!</h1>
      <button type="button">Enviar</button>
    </LoginPage>
  );
}
