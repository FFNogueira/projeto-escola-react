// Necessário sempre que se cria um componente:
import React from 'react';
// importa o Router e BrowserRouter do react-router-dom:
import { Router, BrowserRouter } from 'react-router-dom';
// importa o histórico do browser:
import history from './services/history';
// Importa os estilos globais:
import GlobalStyle from './styles/GlobalStyle';
// Importa o componente de Cabeçalho:
import Header from './components/Header';
// Importa o gerenciador de rotas da aplicação:
import PagesRouter from './routes';

function App() {
  return (
    <Router history={history}>
      <BrowserRouter>
        <Header />
        <PagesRouter />
        <GlobalStyle />
      </BrowserRouter>
    </Router>
  );
}

export default App;
