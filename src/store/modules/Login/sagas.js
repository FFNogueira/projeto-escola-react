// Importando as funções necessárias do redux-saga:
import { call, put, all, takeLatest } from 'redux-saga/effects';
// importa as actions da página de login:
import * as loginActions from './actions';
import * as types from '../types';

const requisicao = () =>
  // eslint-disable-next-line no-unused-vars
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

function* exampleRequest() {
  try {
    yield call(requisicao);
    yield put(loginActions.acaoNaoImplementada1());
  } catch (e) {
    yield put(loginActions.acaoNaoImplementada2());
  }
}

// Exporta as requisições que serão escutadas pelo saga:
// cada elemento do array dentro de "all" deve estar na forma...
// ...takeLatest(string do sinal de requisição, função a ser chamada).
export default all([takeLatest(types.DUMMY, exampleRequest)]);
