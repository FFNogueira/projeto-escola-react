// Necessário ser importado sempre:
import React from 'react';
// Importando os pacotes necessários ao roteamento:
import { Routes, Route } from 'react-router-dom';
// importa a página de login:
import Login from '../pages/Login';
// Importa a página de erro 404:
import Error404 from '../pages/404';

export default function Router() {
  // Ao abrir a homepage (path="/"), será renderizada a página de login:
  // Ao tentar-se abrir uma página que não existe (path="*"), será renderizada uma página 404:
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
