// Necessário sempre que se cria um componente:
import React from 'react';
// importa o browser-router:
import { BrowserRouter } from 'react-router-dom';
// Importa os estilos globais:
import GlobalStyle from './styles/GlobalStyle';
// Importa o componente de Cabeçalho:
import Header from './components/Header';
// Importa o gerenciador de rotas da aplicação:
import Router from './routes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
