// Sempre necessário aose criar um componente:
import React from 'react';
// Importa o roteador 'Route' e o redirecionador 'Redirect':
import { Route, Redirect } from 'react-router-dom';
// Importa o prop-types
import PropTypes from 'prop-types';
// Importa o gerenciador de variáveis de estado global (useSelector):
import { useSelector } from 'react-redux';
// importa meus módulos/funções:
import isLogged from '../modules/isLogged';
// "MyRoute" funciona como um middleware global...
// ...que é executado antes de cada roteamento!
export default function MyRoute({ component: Component, isClosed, ...rest }) {
  // "globalState" será um objeto onde cada propriedade...
  // ...corresponde a uma variável de estado global:
  // DICA: "state.loginReducer" libera apenas as...
  // ...variáveis de estado global da página de login:
  const globalState = useSelector((state) => state.loginReducer);
  // verifica se o usuário está logado:
  const isLoggedIn = isLogged(globalState);
  // Se a rota for fechada e usuário não estiver logado:
  if (isClosed && !isLoggedIn) {
    // redirecione-o para a página de login:
    return (
      <Redirect
        to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  // Se usuário já estiver logado, mas...
  // estiver tentando acessar a página de login:
  if (rest.location.pathname === '/login' && isLoggedIn) {
    // redirecione-o para a homepage:
    return (
      <Redirect
        to={{ pathname: '/', state: { prevPath: rest.location.pathname } }}
      />
    );
  }
  // Se tudo estiver correto prossiga com o roteamento normal:
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
}

// ========== CONFIGURANDO PROPTYPES ===========
MyRoute.defaultProps = {
  isClosed: false,
};

MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool,
};
// ==============================================
