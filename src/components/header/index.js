import React from 'react';

// Importa um ícone do react-icons font-awesome:
import { FaHome } from 'react-icons/fa';
// Importa o uso de links pelo react-router-dom:
import { Link } from 'react-router-dom';
// Importa os estilos do header:
import { Navbar } from './styled';

export default function Header() {
  // DICA: o elemento <Link to> é, na verdade, um elemento HTML <a>
  return (
    <Navbar>
      <Link to="/">
        <FaHome />
      </Link>
      <Link to="/login">Login</Link>
      <Link to="/Register">Registre-se</Link>
      <Link to="/Aluno">Novo Aluno</Link>
      <Link to="/Alunos">Lista de Alunos</Link>
    </Navbar>
  );
}
