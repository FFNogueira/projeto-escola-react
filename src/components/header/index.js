import React from 'react';
// Importa ícones do react-icons:
import {
  FaHome,
  FaSignInAlt,
  FaUniversity,
  FaUserEdit,
  FaUserPlus,
} from 'react-icons/fa';
import { IoIosSchool } from 'react-icons/io';
import { ImExit } from 'react-icons/im';
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
    // mostra link de login e esconde botão de logout:
    setUserLogged(false);
    // redireciona para a página de login:
    history.push('/login');
  };

  // DICA: o elemento <Link to> é, na verdade, um elemento HTML <a>
  return (
    <Navbar>
      <div>
        <Link to="/">
          <FaHome />
        </Link>
        <p>Página inicial</p>
      </div>
      <div>
        {userLogged ? (
          <>
            <Link to="/Aluno">
              <IoIosSchool />
            </Link>
            <p>Novo aluno</p>
          </>
        ) : (
          <>
            <Link to="/login">
              <FaSignInAlt />
            </Link>
            <p>Fazer login</p>
          </>
        )}
      </div>
      <div>
        <Link to="/Alunos">
          <FaUniversity />
        </Link>
        <p>Todos os alunos</p>
      </div>
      <div>
        {userLogged ? (
          <>
            <Link to="/User">
              <FaUserEdit />
            </Link>
            <p>Editar usuário</p>
          </>
        ) : (
          <>
            <Link to="/Register">
              <FaUserPlus />
            </Link>
            <p>Registrar usuário</p>
          </>
        )}
      </div>
      <div>
        {userLogged ? (
          <>
            <button type="button" onClick={handleLogout}>
              <ImExit />
            </button>
            <p>Encerrar sessão</p>
          </>
        ) : (
          ''
        )}
      </div>
    </Navbar>
  );
}
