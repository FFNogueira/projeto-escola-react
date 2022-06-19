// Necessário sempre que se cria um componente:
import React from 'react';
// Importa o sinalizador de ações do redux (useDispatch):
// Importa o gerenciador de variáveis de estado global (useSelector):
import { useDispatch, useSelector } from 'react-redux';
// importa o styled component específico para os...
// ...parágrafos desta página:
import { LoginPage } from './styled';
// importa as ações da página de login:
import * as loginActions from '../../store/modules/Login/actions';
// Cria o componente "página de Login":
export default function Login() {
  // "globalState" será um objeto onde cada propriedade...
  // ...corresponde a uma variável de estado global:
  // DICA: "state.loginReducer" libera apenas as...
  // ...variáveis de estado global da página de login:
  const globalState = useSelector((state) => state.loginReducer);
  // cria um sinalizador de ações do redux:
  const dispatch = useDispatch();
  // Trata eventos de clique no botão 'enviar':
  // eslint-disable-next-line no-unused-vars
  const handleClick = (event) => {
    dispatch(loginActions.botaoClicadoRequest());
  };

  return (
    <LoginPage>
      {`${globalState.botaoClicado}`}
      <h1> Você está na página de login!</h1>
      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </LoginPage>
  );
}
