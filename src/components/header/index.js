import React from 'react';
// Importa um ícone do react-icons font-awesome:
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
// Importa o uso de links pelo react-router-dom:
import { Link, useHistory } from 'react-router-dom';
// importa o gerenciador de variáveis de estado globais:
import { useSelector, useDispatch } from 'react-redux';
// Importa os estilos do header:
import { Navbar } from './styled';
// importa meus módulos reutilizáveis:
import isLogged from '../../modules/isLogged';
// importa as ações da página de login:
import * as loginActions from '../../store/modules/Login/actions';

export default function Header() {
  // estado local informando ao header se o usuário está logado ou não:
  const [userLogged, setUserLogged] = React.useState(false);
  // Auxiliar com as variáveis de estado global de login:
  const globalState = useSelector((state) => state.loginReducer);
  // Auxiliar a ser observado (contém o estado de login):
  const isLoggedIn = isLogged({ ...globalState });
  // Redirecionador de página:
  const history = useHistory();
  // cria um sinalizador de ações do redux:
  const dispatch = useDispatch();

  React.useEffect(() => {
    setUserLogged(isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    // apaga todos os dados de login:
    dispatch(loginActions.loginState(null, null, null, null));
    // redireciona para a página de login:
    history.push('/login');
  };

  // DICA: o elemento <Link to> é, na verdade, um elemento HTML <a>
  return (
    <Navbar>
      <Link to="/">
        <FaHome />
      </Link>
      {userLogged ? '' : <Link to="/login">Login</Link>}
      <Link to="/Register">Registre-se</Link>
      <Link to="/Aluno">Novo Aluno</Link>
      <Link to="/Alunos">Lista de Alunos</Link>
      {userLogged ? (
        <button type="button" onClick={handleLogout}>
          <FaSignOutAlt />
        </button>
      ) : (
        ''
      )}
    </Navbar>
  );
}
