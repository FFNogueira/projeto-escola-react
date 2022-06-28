// Necessário sempre que se cria um componente:
import React from 'react';
// Importa alguns ícones do font-awesome do React:
import { FaUser, FaLock } from 'react-icons/fa';
import { BiAt } from 'react-icons/bi';
// Importa o hook redirecionar de páginas:
import { useHistory } from 'react-router-dom';
// Importando meu axios customizado:
import axios from '../../services/axios';
// importa o styled component específico para esta página:
import { Signup } from './styled';
// importa meu mensageiro do toastify:
import sendToast from '../../modules/sendToast';

export default function Register() {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [buttonEvents, setButtonEvents] = React.useState('all');
  const history = useHistory();

  React.useEffect(() => {
    sendToast();
  }, []);

  // Tenta registrar novos usuários:
  const handleForm = (e) => {
    async function registerUser() {
      try {
        setButtonEvents('none');
        sendToast('loading', 'registrando usuário...');
        // tenta fazer uma requisição POST à API na rota "/users":
        const res = await axios({
          method: 'post',
          url: '/users',
          data: {
            email,
            password,
            nome: username,
          },
          timeout: 10000,
        });

        // se não houve erros na resposta da API:
        sendToast('success', 'Registro efetuado com sucesso!');
        setButtonEvents('all');
        console.log(res.data); // DEBUG
        history.push('/login');
      } catch (err) {
        setButtonEvents('all');

        if (err.response?.data?.errors) {
          const errorMessage = err.response.data.errors.map((elem) => {
            return <p key={elem}>{`*${elem}`}</p>;
          });
          sendToast('error', <div>{errorMessage}</div>);
        } else {
          sendToast('error', 'Não foi possível conectar-se à API!');
        }
        console.log(err);
      }
    }
    e.preventDefault();
    registerUser();
  };

  return (
    <Signup>
      <h1>Registro de novos usuários!</h1>

      <form action="#" method="" onSubmit={handleForm}>
        <label htmlFor="username">
          <FaUser />
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
          <BiAt />
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
        <button type="submit" style={{ pointerEvents: buttonEvents }}>
          registrar
        </button>
      </form>
    </Signup>
  );
}
