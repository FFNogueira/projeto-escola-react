// Necessário sempre que se cria um componente:
import React from 'react';
// importa o styled component específico para os...
// ...parágrafos desta página:
import { Homepage } from './styled';

// Cria o componente "página 404":
export default function Home() {
  return (
    <Homepage>
      <h1>Bem vindo à página inicial!</h1>
    </Homepage>
  );
}
