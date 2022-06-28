/* eslint-disable no-restricted-globals */
// Necessário sempre que se cria um componente:
import React from 'react';
// ícones do react:
import { FaUser, FaHashtag, FaHourglassHalf } from 'react-icons/fa';
import { BiAt } from 'react-icons/bi';
import { GiWeight, GiBodyHeight } from 'react-icons/gi';
// importa o disparadorde ações:
import { useDispatch, useSelector } from 'react-redux';
// importa o redirecionador de páginas:
import { useHistory } from 'react-router-dom';
// importa as ações da página de login:
import * as loginActions from '../../store/modules/Login/actions';
// importa o styled component específico para esta página:
import { NovoAluno } from './styled';
// importa meu axios customizado:
import axios from '../../services/axios';
// importa meu mensageiro do toastify:
import sendToast from '../../modules/sendToast';

export default function Aluno() {
  const history = useHistory();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.loginReducer);
  // =========================================
  // ========== VARIÁVEIS DE ESTADO ==========
  // =========================================
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [clickEvents, setClickEvents] = React.useState('all');
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [age, setAge] = React.useState('');
  const [email, setEmail] = React.useState('');
  // =========================================
  // ========== ENVIO DO FORMULÁRIO ==========
  // =========================================
  async function handleNewAluno(e) {
    try {
      // impede que o formulário seja enviado:
      e.preventDefault();
      // Desabilita clicks do mouse sobre o botão:
      setClickEvents('none');
      // Tenta criar o novo aluno:
      sendToast('loading', 'Registrando aluno...');
      // Filtrando dados numérico:
      const [peso, altura, idade] = [
        Number(weight.replace(/,/g, '.')),
        Number(height.replace(/,/g, '.')),
        Number(age),
      ];
      // Tenta criar o novo aluno:
      await axios({
        method: 'post',
        url: '/alunos',
        timeout: 10000, // only wait for 10s
        data: {
          nome: name,
          sobrenome: surname,
          peso: isNaN(peso) ? '' : peso,
          altura: isNaN(altura) ? '' : altura,
          idade: isNaN(idade) ? '' : idade,
          email,
        },
        headers: {
          Authorization: `Bearer ${globalState.token}`,
        },
      });
      // Aluno criado com sucesso:
      sendToast('success', 'Aluno registrado com sucesso!');
      setClickEvents('all');
      // limpa os campos de dados:
      setName('');
      setWeight('');
      setHeight('');
      setAge('');
      setSurname('');
      setEmail('');
    } catch (err) {
      // Reativa clicks do mouse sobre o botão:
      setClickEvents('all');
      console.log(err);
      // Token inválido/expirado:
      if (err.response?.status === 401) {
        sendToast('info', 'Sessão expirada, faça login!');
        dispatch(loginActions.loginState(null, null, null, null));
        history.push('/login');
      }
      // Mensagens de erro enviadas pela API:
      else if (err.response?.data?.errors) {
        const errorMessage = err.response.data.errors.map((elem) => {
          return <p key={elem}>{`*${elem}`}</p>;
        });
        sendToast('error', <div>{errorMessage}</div>);
      }
      // Se houve erro de conexão:
      else {
        sendToast('error', 'Não foi possível conectar-se à API!');
      }
    }
  }

  return (
    <NovoAluno>
      <h1>Novo aluno</h1>
      <form action="#" method="" onSubmit={handleNewAluno}>
        <label htmlFor="name">
          <FaUser />
          <input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Nome"
          />
        </label>
        <label htmlFor="surname">
          <FaHashtag />
          <input
            value={surname}
            id="surname"
            onChange={(e) => {
              setSurname(e.target.value);
            }}
            type="text"
            placeholder="Sobrenome"
          />
        </label>
        <label htmlFor="email">
          <BiAt />
          <input
            value={email}
            type="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="E-mail"
          />
        </label>
        <label htmlFor="weight">
          <GiWeight />
          <input
            value={weight}
            type="text"
            id="weight"
            onChange={(e) => {
              setWeight(e.target.value);
            }}
            placeholder="Peso"
          />
        </label>
        <label htmlFor="height">
          <GiBodyHeight />
          <input
            value={height}
            type="text"
            id="height"
            onChange={(e) => {
              setHeight(e.target.value);
            }}
            placeholder="Altura"
          />
        </label>
        <label htmlFor="age">
          <FaHourglassHalf />
          <input
            value={age}
            type="text"
            id="age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
            placeholder="Idade"
          />
        </label>
        <button
          type="submit"
          style={{ pointerEvents: clickEvents }}
          tabIndex={clickEvents === 'all' ? 0 : -1}
        >
          Criar aluno
        </button>
      </form>
    </NovoAluno>
  );
}
