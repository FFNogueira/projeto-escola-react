// Sempre necessário aose criar um componente:
import React from 'react';
// Importa o roteador 'Route' e o redirecionador 'Redirect':
import { Route, Redirect } from 'react-router-dom';
// Importa o prop-types
import PropTypes from 'prop-types';

export default function MyRoute({ component: Component, isClosed, ...rest }) {
  const isLoggedIn = false;

  // Se a rota for fechada e usuário não estiver logado:
  if (isClosed && !isLoggedIn) {
    // redirecione-o para a página de login:
    return (
      <Redirect
        to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
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
