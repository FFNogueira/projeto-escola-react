// Necessário sempre que se cria um componente:
import React from 'react';
// importa o styled component específico para esta página:
import { Homepage } from './styled';

export default function Alunos() {
  return (
    <Homepage>
      <h1>Bem vindo à lista de todos os Alunos!</h1>
    </Homepage>
  );
}
