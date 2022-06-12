import * as types from '../types';

// Estado inicial (default) das variáveis de estado da aplicação:
const initialState = {
  botaoClicado: false,
};

// A arrow function "reducer" escuta cada ação gerada pelos...
// ...comandos de 'dispatch()', que estão dentro dos handlers...
// ...de certos componentes.
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_ENVIAR_SUCCESS: {
      console.log('Requisição concluída com sucesso!');
      // copiando o estado antigo da aplicação...
      // ...visando criar um novo estado:
      const newState = { ...state };
      // modificando a variável de estado 'botaoClicado':
      newState.botaoClicado = !newState.botaoClicado;
      // retornando o novo estado:
      return newState;
    }

    case types.BOTAO_ENVIAR_FAIL: {
      console.log('A requisição falhou :(');
      return state;
    }

    case types.BOTAO_ENVIAR_REQUEST: {
      console.log('Fazendo a requisição...');
      return state;
    }

    default:
      return state;
  }
}
