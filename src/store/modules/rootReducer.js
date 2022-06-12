// Importa o combinador de reducers:
import { combineReducers } from 'redux';
// importa o reducer da página de login:
import loginReducer from './Login/reducer';
// Exporta os reducers já combinados:
export default combineReducers({
  loginReducer,
});
