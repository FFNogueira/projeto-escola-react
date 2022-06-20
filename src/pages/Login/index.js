// Necessário sempre que se cria um componente:
import React from 'react';
// Importa alguns ícones do font-awesome do React:
import { FaLock } from 'react-icons/fa';
import { BiAt } from 'react-icons/bi';
// Importa o sinalizador de ações do redux (useDispatch):
import { useDispatch } from 'react-redux';
// importa o mensageiro do toastify:
import { toast } from 'react-toastify';
// importa o redirecionador de páginas:
import { useHistory } from 'react-router-dom';
// importa o 'get' do lodash (evita a necessidade de validar props):
import { get } from 'lodash';
// importa as ações da página de login:
import * as loginActions from '../../store/modules/Login/actions';
// importa o styled component específico esta página:
import { LoginPage } from './styled';
// importa meu axios customizado:
import axios from '../../services/axios';

// Cria o componente "página de Login":
export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();
  // cria um sinalizador de ações do redux:
  const dispatch = useDispatch();
  // variável contendo a página que o usuário...
  // ...estava antes de ver a página de login:
  const prevPath = get(props, 'location.state.prevPath', '/');
  // Trata a ação de tentar login:
  const handleForm = (e) => {
    async function getToken() {
      try {
        const res = await axios({
          method: 'post',
          url: '/tokens',
          data: { email, password },
          timeout: 10000,
        });

        // Se o token for obtido com sucesso:
        // console.log(res.data); // DEBUG
        // guarda o token e username (como variáveis de estado global):
        dispatch(
          loginActions.loginState(
            res.data.token,
            res.data.nome,
            res.data.id,
            res.data.email
          )
        );
        // Redireciona para a página anterior:
        history.push(prevPath);
      } catch (err) {
        // Remove todas as mensagens do toastify:
        toast.clearWaitingQueue();
        toast.dismiss();
        if (err.response?.data?.errors) {
          const errorMessage = err.response.data.errors.reduce((acc, elem) => {
            return `${acc}${elem} *** `;
          }, '');
          toast.error(errorMessage);
        } else {
          toast.error('Não foi possível conectar-se à API!');
        }
        console.log(err);
      }
    }

    e.preventDefault();
    getToken();
  };

  return (
    <LoginPage>
      <h1>Loge-se para acessar todas as opções!</h1>
      <form action="#" method="" onSubmit={handleForm}>
        <label htmlFor="email">
          <BiAt />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="E-mail"
          />
        </label>
        <label htmlFor="password">
          <FaLock />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            placeholder="Senha"
          />
        </label>
        <button type="submit">entrar</button>
      </form>
    </LoginPage>
  );
}
