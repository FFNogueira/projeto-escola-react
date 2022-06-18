// Necessário sempre que se cria um componente:
import React from 'react';
// Importa o mensageio do react-toatify:
import { toast } from 'react-toastify';
// Importa alguns ícones do font-awesome do React:
import { FaUser, FaLock } from 'react-icons/fa';
import { BiAt } from 'react-icons/bi';
// Importando meu axios customizado:
import axios from '../../services/axios';
// importa o styled component específico para esta página:
import { Signup } from './styled';

export default function Register() {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleForm = (e) => {
    async function registerUser() {
      try {
        // tenta fazer uma requisição POST à API na rota "/users":
        const res = await axios({
          method: 'post',
          url: '/users',
          data: {
            email,
            password,
            nome: username,
          },
          timeout: 7000,
        });

        // se não houve erros na resposta da API:
        // Remove todas as mensagens do toastify:
        toast.clearWaitingQueue();
        toast.dismiss();
        toast.success('Registro efetuado com sucesso!');
        // Apaga os campos de email, senha, e usuário:
        setEmail('');
        document.querySelector('#password').value = '';
        setPassword('');
        setUsername('');
        console.log(res.data); // DEBUG
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
            value={username}
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
        <button type="submit">registrar</button>
      </form>
    </Signup>
  );
}
