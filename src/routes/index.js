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
// Importa a página do Aluno:
import Aluno from '../pages/Aluno';
// Importa a página da lista de Alunos:
import Alunos from '../pages/Alunos';
// Importa a página de registro:
import Register from '../pages/Register';
// Importa a página de uploads:
import Uploads from '../pages/Uploads';
// Importa a página de edição de dados do usuário:
import User from '../pages/User';

// Esta função funcionará como roteador das páginas:
export default function PagesRouter() {
  // Ao abrir a homepage (path="/"), será renderizada a página de login:
  // Ao tentar-se abrir uma página que não existe (path="*"), será renderizada uma página 404:
  return (
    <Switch>
      <MyRoute exact path="/" component={Home} isClosed={false} />
      <MyRoute exact path="/login" component={Login} isClosed={false} />
      <MyRoute exact path="/User" component={User} isClosed />
      <MyRoute exact path="/Aluno" component={Aluno} isClosed />
      <MyRoute exact path="/Alunos" component={Alunos} isClosed={false} />
      <MyRoute exact path="/Register" component={Register} isClosed={false} />
      <MyRoute exact path="/Uploads:/id" component={Uploads} isClosed />
      <MyRoute path="*" component={Error404} />
    </Switch>
  );
}
