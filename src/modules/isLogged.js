// importa o decodificador de jwt:
import { useJwt as JWT } from 'react-jwt';

export default function isLogged(globalState) {
  // TENTA DECODIFICAR O TOKEN:
  const { decodedToken, isExpired } = JWT(globalState.token);
  // Verifica se o usuário está "supostamente" logado:
  const isLoggedIn =
    globalState.id &&
    globalState.email &&
    globalState.token &&
    decodedToken?.id === globalState.id &&
    decodedToken?.email === globalState.email &&
    !isExpired;

  return isLoggedIn;
}
