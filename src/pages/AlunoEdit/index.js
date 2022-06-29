/* eslint-disable no-restricted-globals */
// Necessário sempre que se cria um componente:
import React from 'react';
// ícones do react:
import { FaUser, FaHashtag, FaHourglassHalf } from 'react-icons/fa';
import { BiAt } from 'react-icons/bi';
import { GiWeight, GiBodyHeight } from 'react-icons/gi';
// importa o disparadorde ações:
import { useDispatch, useSelector } from 'react-redux';
// importa o leitor de parâmetros de URL e o redirecionador de páginas:
import { useParams, useHistory } from 'react-router-dom';
// importa as ações da página de login:
import * as loginActions from '../../store/modules/Login/actions';
// importa meu mensageiro do toastify:
import sendToast from '../../modules/sendToast';
// importa o styled component específico para esta página:
import { Page } from './styled';
// importando axios para fazer requisições HTTP:
import axios from '../../services/axios';

export default function AlunoEdit() {
  const history = useHistory();
  const dispatch = useDispatch();
  // variáveis de estado global da página de login:
  const globalState = useSelector((state) => state.loginReducer);
  // capturnando os parâmetros de URL:
  const { id, email, name, surname, age, weight, height } = useParams();
  // variáveis de estado local:
  const [nome, setNome] = React.useState(name);
  const [sobrenome, setSobrenome] = React.useState(surname);
  const [mail, setMail] = React.useState(email);
  const [idade, setIdade] = React.useState(age);
  const [peso, setPeso] = React.useState(weight);
  const [altura, setAltura] = React.useState(height);
  const [clickEvents, setClickEvents] = React.useState('all');

  async function handleAlunoEdit(e) {
    try {
      e.preventDefault();
      // Desabilita clicks do mouse sobre o botão:
      setClickEvents('none');
      // Tenta criar o novo aluno:
      sendToast('loading', 'Salvando...');
      // Filtrando dados numérico:
      const [_peso, _altura, _idade] = [
        Number(peso.replace(/,/g, '.')),
        Number(altura.replace(/,/g, '.')),
        Number(idade),
      ];
      // Tenta fazer a atualização de dados do aluno:
      await axios({
        method: 'put',
        url: `/alunos/${id}`,
        timeout: 10000,
        headers: {
          Authorization: `Bearer ${globalState.token}`,
        },
        data: {
          nome,
          sobrenome,
          peso: isNaN(_peso) ? '' : _peso,
          altura: isNaN(_altura) ? '' : _altura,
          idade: isNaN(_idade) ? '' : _idade,
          email: mail,
        },
      });
      // Dados Salvos com sucesso:
      sendToast('success', 'Salvo!');
      setClickEvents('all');
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
    <Page>
      <h1>Editar aluno</h1>
      <form action="#" method="" onSubmit={handleAlunoEdit}>
        <label htmlFor="name">
          <FaUser />
          <input
            id="name"
            defaultValue={name}
            onChange={(e) => {
              setNome(e.target.value);
            }}
            type="text"
            placeholder="Nome"
          />
        </label>
        <label htmlFor="surname">
          <FaHashtag />
          <input
            defaultValue={surname === ' ' ? '' : surname}
            id="surname"
            onChange={(e) => {
              setSobrenome(e.target.value);
            }}
            type="text"
            placeholder="Sobrenome"
          />
        </label>
        <label htmlFor="email">
          <BiAt />
          <input
            defaultValue={email}
            type="email"
            id="email"
            onChange={(e) => {
              setMail(e.target.value);
            }}
            placeholder="E-mail"
          />
        </label>
        <label htmlFor="weight">
          <GiWeight />
          <input
            defaultValue={weight === ' ' ? '' : weight}
            type="text"
            id="weight"
            onChange={(e) => {
              setPeso(e.target.value);
            }}
            placeholder="Peso"
          />
        </label>
        <label htmlFor="height">
          <GiBodyHeight />
          <input
            defaultValue={height === ' ' ? '' : height}
            type="text"
            id="height"
            onChange={(e) => {
              setAltura(e.target.value);
            }}
            placeholder="Altura"
          />
        </label>
        <label htmlFor="age">
          <FaHourglassHalf />
          <input
            defaultValue={age === ' ' ? '' : age}
            type="text"
            id="age"
            onChange={(e) => {
              setIdade(e.target.value);
            }}
            placeholder="Idade"
          />
        </label>
        <button
          type="submit"
          style={{ pointerEvents: clickEvents }}
          tabIndex={clickEvents === 'all' ? 0 : -1}
        >
          Salvar alterações
        </button>
      </form>
    </Page>
  );
}
