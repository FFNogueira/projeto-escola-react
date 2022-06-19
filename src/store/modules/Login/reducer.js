import * as types from '../types';

// Estado inicial (default) das variáveis de estado da aplicação:
const initialState = {
  token: null,
  username: null,
  id: null,
  email: null,
};

// A arrow function "reducer" escuta cada ação gerada pelos...
// ...comandos de 'dispatch()', que estão dentro dos handlers...
// ...de certos componentes.
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      console.log('login concluído com sucesso!');
      // copiando o estado antigo da aplicação...
      // ...visando criar um novo estado:
      const newState = { ...state };
      // modificando a variável de estado 'token':
      newState.token = action.token;
      // modificando a variável de estado 'username':
      newState.username = action.username;
      // modificando a variável de estado 'id':
      newState.id = action.id;
      // modificando a variável de estado 'email':
      newState.email = action.email;
      // retornando o novo estado:
      return newState;
    }

    default:
      return state;
  }
}
