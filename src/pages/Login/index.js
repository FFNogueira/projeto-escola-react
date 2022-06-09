// Necessário sempre que se cria um componente:
import React from 'react';
// importa o styled component específico para os...
// ...parágrafos desta página:
import { Title } from './styled';
// Cria o componente "página de Login":
export default function Login() {
  return (
    <>
      <Title> Você está na página de login!</Title>
      <button type="button">Enviar</button>
    </>
  );
}
