// Importa o combinador de reducers:
import { combineReducers } from 'redux';
// importa o reducer da página de login:
import loginReducer from './Login/reducer';
// Exporta os reducers já combinados:
// Cada novo reducer deve ser inserido dentro do objeto abaixo:
export default combineReducers({
  loginReducer,
});
