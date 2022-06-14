// Necessário sempre que se cria um componente:
import React from 'react';
// importa o styled component específico para esta página:
import { Homepage } from './styled';

export default function Aluno() {
  return (
    <Homepage>
      <h1>Bem vindo à página de uploads do Aluno!</h1>
    </Homepage>
  );
}
