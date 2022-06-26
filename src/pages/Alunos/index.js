// Necessário sempre que se cria um componente:
import React from 'react';
// Importa o sinalizador de ações do redux (useDispatch):
import { useDispatch, useSelector } from 'react-redux';
// importando o gerenciador de links e redirecionador do react-router:
import { Link, useHistory } from 'react-router-dom';
// importando ícones de edição e deleção:
import { FaWindowClose, FaEdit } from 'react-icons/fa';
// importa as ações da página de login:
import * as loginActions from '../../store/modules/Login/actions';
// importa meu mensageiro do toastify:
import sendToast from '../../modules/sendToast';
// importa o styled component específico para esta página:
import { Page } from './styled';
// importando axios para fazer requisições HTTP:
import axios from '../../services/axios';

export default function Alunos() {
  const dispatch = useDispatch();
  const history = useHistory();
  // variáveis de estado global da página de login:
  const globalState = useSelector((state) => state.loginReducer);
  // Cria uma variável de estado (alunoData) para os dados dos alunos...
  // Cria uma função (setAlunoData) que será invocada para alterar essa variável...
  // Utilizando o hooks "React.useState":
  const [alunoData, setAlunoData] = React.useState([]);
  // estado dos eventos de click com o mouse sobre links/botões:
  const [clickEvents, setClickEvents] = React.useState('all');
  // Executa o hook "React.useEffect" uma única vez...
  // ...imediatamente após o componente ser renderizado na tela:
  React.useEffect(() => {
    async function getAlunos() {
      try {
        sendToast('loading', 'Carregando dados...');
        // faz uma requisição GET à API na rota "/alunos":
        const res = await axios({
          method: 'get',
          url: '/alunos',
          timeout: 10000, // only wait for 10s
        });
        // usando "setAlunoData" para setar a variável de estado "alunoData":
        // "res.data" contém os dados propriamente ditos:
        setAlunoData(res.data);
        // Remove todas as mensagens do toastify:
        sendToast();
      } catch (err) {
        sendToast('error', 'Não foi possível carregar a lista de alunos');
        console.log(err); // DEBUG
      }
    }
    getAlunos();
  }, []);

  // trata a deleção de alunos:
  async function handleDeleteAluno(e) {
    try {
      // Desabilita clicks do mouse:
      setClickEvents('none');
      // captura o id do aluno que se deseja deletar:
      const alunoId = e.target.id;
      sendToast('loading', 'Deletando...');
      // tenta deletar o aluno:
      await axios({
        method: 'delete',
        url: `/alunos/${alunoId}`,
        timeout: 10000, // only wait for 10s
        headers: {
          Authorization: `Bearer ${globalState.token}`,
        },
      });

      // reativa clicks do mouse:
      setClickEvents('all');
      // atualiza os dados mostrados:
      setAlunoData(
        alunoData.filter((elem) => {
          return String(elem.id) !== String(alunoId);
        })
      );
      sendToast('success', 'Operação concluída!');
    } catch (err) {
      // libera os eventos por clique do mouse:
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

  return (
    <Page>
      <h1>Lista de todos os alunos</h1>
      <div className="lista">
        {alunoData.map((elem) => {
          return (
            <div key={elem.email} className="aluno">
              <div className="options">
                <Link
                  to={`/Aluno/${elem.id}/edit`}
                  style={{ pointerEvents: clickEvents }}
                  tabIndex={clickEvents === 'all' ? 0 : -1}
                >
                  <FaEdit />
                </Link>
                <button
                  type="button"
                  id={`${elem.id}`}
                  style={{ pointerEvents: clickEvents }}
                  tabIndex={clickEvents === 'all' ? 0 : -1}
                  onClick={handleDeleteAluno}
                >
                  <FaWindowClose />
                </button>
              </div>
              <div className="profile">
                <img
                  src={
                    elem.Uploads[0]?.url
                      ? elem.Uploads[0].url
                      : 'http://192.168.0.9/images/userProfile.png'
                  }
                  alt="foto do aluno"
                  crossOrigin="anonymous"
                />
                <div className="dados">
                  <p>
                    <span>Nome: </span>
                    {elem.nome}
                  </p>
                  <p>
                    <span>Sobrenome: </span>
                    {elem.sobrenome}
                  </p>
                  <p>
                    <span>E-mail: </span>
                    {elem.email}
                  </p>
                  <p>
                    <span>Altura: </span>
                    {elem.altura}
                  </p>
                  <p>
                    <span>Peso: </span>
                    {elem.peso}
                  </p>
                  <p>
                    <span>Idade: </span>
                    {elem.idade}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
}
