// Necessário sempre que se cria um componente:
import React from 'react';
// Importa os estilos globais:
import GlobalStyle from './styles/GlobalStyle';
// Importa o componente de login:
import Login from './pages/Login';

function App() {
  return (
    <>
      <h1>Olá, React!</h1>
      <Login />
      <GlobalStyle />
    </>
  );
}

export default App;
