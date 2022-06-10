// Necessário sempre que se cria um componente:
import React from 'react';
// importa o styled component específico para os...
// ...parágrafos desta página:
import { Error404, ErrorMessage } from './styled';
// Cria o componente "página de Login":
export default function NotFound() {
  return (
    <>
      <Error404>404: NOT FOUND</Error404>
      <ErrorMessage>this content is not available!</ErrorMessage>
    </>
  );
}
