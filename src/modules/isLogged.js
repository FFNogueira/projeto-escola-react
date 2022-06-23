// importa o decodificador de jwt:
import { isExpired, decodeToken } from 'react-jwt';

export default function isLogged(globalState) {
  // TENTA DECODIFICAR O TOKEN:
  const decodedToken = decodeToken(globalState.token);
  const tokenExpired = isExpired(globalState.token);
  // Verifica se o usuário está "supostamente" logado:
  const isLoggedIn =
    globalState.id &&
    globalState.email &&
    globalState.token &&
    decodedToken?.id === globalState.id &&
    decodedToken?.email === globalState.email &&
    !tokenExpired;

  return isLoggedIn;
}
