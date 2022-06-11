// Necessário ser importado sempre:
import React from 'react';
// Importando os pacotes necessários ao roteamento:
import { Switch } from 'react-router-dom';
// Importando minha rota customizada:
// "MyRoute" funciona como um middleware global...
// ...que é executado antes de cada roteamento!
import MyRoute from './MyRoute';
// importa a página de login:
import Login from '../pages/Login';
// Importa a página de erro 404:
import Error404 from '../pages/404';
// Importa a Home Page:
import Home from '../pages/Home';

// Esta função funcionará como roteador das páginas:
export default function PagesRouter() {
  // Ao abrir a homepage (path="/"), será renderizada a página de login:
  // Ao tentar-se abrir uma página que não existe (path="*"), será renderizada uma página 404:
  return (
    <Switch>
      <MyRoute exact path="/" component={Home} />
      <MyRoute exact path="/login" component={Login} />
      <MyRoute path="*" component={Error404} />
    </Switch>
  );
}
