// Necessário sempre que se cria um componente:
import React from 'react';
// importando o gerenciador de links do react-router:
import { Link } from 'react-router-dom';
// importando ícones de edição e deleção:
import { FaWindowClose, FaEdit } from 'react-icons/fa';
// importanto o mensageiro toast:
import { toast } from 'react-toastify';
// importa o styled component específico para esta página:
import { Page } from './styled';
// importando axios para fazer requisições HTTP:
import axios from '../../services/axios';

export default function Alunos() {
  // Remove todas as mensagens do toastify:
  toast.clearWaitingQueue();
  toast.dismiss();
  toast.loading('Carregando dados do servidor...');
  // Cria uma variável de estado (alunoData) para os dados dos alunos...
  // Cria uma função (setAlunoData) que será invocada para alterar essa variável...
  // Utilizando o hooks "React.useState":
  const [alunoData, setAlunoData] = React.useState([]);
  // Executa o hook "React.useEffect" sempre que o componente é renderizado na tela:
  React.useEffect(() => {
    async function getAlunos() {
      try {
        // faz uma requisição GET à API na rota "/alunos":
        const res = await axios({
          method: 'get',
          url: '/alunos',
          timeout: 10000, // only wait for 10s
        });
        // usando "setAlunoData" para setar a variável de estado "alunoData":
        // "res.data" contém os dados propriamente ditos:
        setAlunoData(res.data);
      } catch (err) {
        toast.clearWaitingQueue();
        toast.dismiss();
        toast.error('Não foi possível carregar a lista de alunos');
        console.log(err); // DEBUG
      }
    }
    getAlunos();
  }, []);
  return (
    <Page>
      <h1>Bem vindo à lista de todos os Alunos!</h1>
      <div className="lista">
        {alunoData.map((elem) => {
          return (
            <div key={elem.email} className="aluno">
              <div className="options">
                <Link to={`/Aluno/${elem.id}/edit`}>
                  <FaEdit />
                </Link>
                <Link to={`/Aluno/${elem.id}/delete`}>
                  <FaWindowClose />
                </Link>
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
