// Necessário sempre que se cria um componente:
import React from 'react';
// Importa o mensageiro do React-toastify:
import { toast } from 'react-toastify';
// importa o styled component específico para esta página:
import { Homepage } from './styled';

// Cria o componente "página 404":
export default function Home() {
  // imprime uma mensagem de boas vindas usando o toastify:
  toast.info('Homepage diz: Bem vindo!');

  return (
    <Homepage>
      <h1>Bem vindo à página inicial!</h1>
    </Homepage>
  );
}
