import { all } from 'redux-saga/effects';
// Importa a saga da página de login:
import loginSaga from './Login/sagas';

export default function* rootSaga() {
  // cada nova saga deve ser colocada dentro do array interno a "all":
  return yield all([loginSaga]);
}
