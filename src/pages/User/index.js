// Necessário sempre que se cria um componente:
import React from 'react';
// Importa o sinalizador de ações do redux (useDispatch):
import { useDispatch, useSelector } from 'react-redux';
// importa o redirecionador de páginas:
import { useHistory } from 'react-router-dom';
// importa o styled component específico para esta página:
import { Edit } from './styled';
// importa meus módulos/funções:
// import isLogged from '../../modules/isLogged';
// importa as ações da página de login:
import * as loginActions from '../../store/modules/Login/actions';
// importa meu axios customizado:
import axios from '../../services/axios';
// importa meu mensageiro do toastify:
import sendToast from '../../modules/sendToast';

export default function User() {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [buttonEvents, setButtonEvents] = React.useState('all');
  const [buttonDelete, setButtonDelete] = React.useState(false);
  const [buttonEdit, setButtonEdit] = React.useState(false);
  // variáveis de estado global da página de login:
  const globalState = useSelector((state) => state.loginReducer);
  // Sinalizador de ações:
  const dispatch = useDispatch();
  // auxiliar para saber se usuário está logado:
  // const isLoggedIn = isLogged(globalState);
  // Redirecionador de páginas:
  const history = useHistory();
  // Efeitos a serem executados caso botão de salvar seja pressionado
  React.useEffect(() => {
    async function updateUser() {
      try {
        // if (!isLoggedIn) throw new Error('usuário não logado');
        // tenta atualizar o usuário:
        await axios({
          method: 'put',
          url: '/users',
          data: {
            email,
            password,
            nome: username,
          },
          headers: {
            Authorization: `Bearer ${globalState.token}`,
          },
          timeout: 10000,
        });

        // Cria um novo token
        const res = await axios({
          method: 'post',
          url: '/tokens',
          data: { email, password },
          timeout: 10000,
        });

        dispatch(
          loginActions.loginState(
            res.data.token,
            res.data.nome,
            res.data.id,
            res.data.email
          )
        );

        sendToast('success', 'Usuário atualizado com sucesso! ');
        setButtonEvents('all');
        setButtonEdit(false);
      } catch (err) {
        console.log(err);
        setButtonEvents('all');
        setButtonEdit(false);

        // se as informações de login do usuário não forem coerentes:
        // if (!isLoggedIn) {
        //   sendToast('error', 'Operação proibida! Você não está logado! ');
        //   dispatch(loginActions.loginState(null, null, null, null));
        //   history.push('/login');
        // }

        // Token inválido/expirado:
        if (err.response?.status === 401) {
          sendToast('info', 'Sessão expirada, faça login!');
          dispatch(loginActions.loginState(null, null, null, null));
          history.push('/login');
        }
        // Mensagens de erro enviadas pela API:
        else if (err.response?.data?.errors) {
          const errorMessage = err.response.data.errors.reduce((acc, elem) => {
            return `${acc}${elem} *** `;
          }, '');
          sendToast('error', errorMessage);
        }
        // Se houve erro de conexão:
        else {
          sendToast('error', 'Não foi possível conectar-se à API!');
        }
      }
    }

    if (buttonEdit) {
      // Desabilita os eventos de clique nos botões
      setButtonEvents('none');
      updateUser();
    }
  }, [buttonEdit]);

  // Efeitos a serem executados caso botão de deletar seja pressionado
  React.useEffect(() => {
    async function deleteUser() {
      try {
        // if (!isLoggedIn) throw new Error('usuário não logado');

        // tenta atualizar o usuário:
        await axios({
          method: 'delete',
          url: '/users',
          headers: {
            Authorization: `Bearer ${globalState.token}`,
          },
          timeout: 10000,
        });

        sendToast('success', 'Usuário deletado com sucesso! ');
        dispatch(loginActions.loginState(null, null, null, null));
        history.push('/login');

        setButtonEvents('all');
        setButtonDelete(false);
      } catch (err) {
        console.log(err);
        setButtonEvents('all');
        setButtonDelete(false);

        // se as informações de login do usuário não forem coerentes:
        // if (!isLoggedIn) {
        //   sendToast('error', 'Operação proibida! Você não está logado! ');
        //   dispatch(loginActions.loginState(null, null, null, null));
        //   history.push('/login');
        // }

        // Token inválido/expirado:
        if (err.response?.status === 401) {
          sendToast('info', 'Sessão expirada, faça login!');
          dispatch(loginActions.loginState(null, null, null, null));
          history.push('/login');
        }
        // Mensagens de erro enviadas pela API:
        else if (err.response?.data?.errors) {
          const errorMessage = err.response.data.errors.reduce((acc, elem) => {
            return `${acc}${elem} *** `;
          }, '');
          sendToast('error', errorMessage);
        }
        // Se houve erro de conexão:
        else {
          sendToast('error', 'Não foi possível conectar-se à API!');
        }
      }
    }

    if (buttonDelete) {
      // Desabilita os eventos de clique nos botões
      setButtonEvents('none');
      deleteUser();
    }
  }, [buttonDelete]);

  return (
    <Edit>
      <h1>Edição de dados da conta</h1>

      <form action="#" method="">
        <label htmlFor="username">
          <input
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Nome de usuário"
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="E-mail"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            placeholder="Senha"
          />
        </label>
        <button
          type="button"
          style={{ pointerEvents: buttonEvents }}
          onClick={() => {
            setButtonEdit(true);
          }}
        >
          salvar
        </button>
        <button
          type="button"
          style={{ pointerEvents: buttonEvents }}
          onClick={() => {
            setButtonDelete(true);
          }}
        >
          deletar conta
        </button>
      </form>
    </Edit>
  );
}
