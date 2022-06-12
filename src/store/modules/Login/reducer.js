// Estado inicial (default) das variáveis de estado da aplicação:
const initialState = {
  botaoClicado: false,
};

// A arrow function "reducer" escuta cada ação gerada pelos...
// ...comandos de 'dispatch()', que estão dentro dos handlers...
// ...de certos componentes.
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'BOTAO_ENVIAR': {
      // copiando o estado antigo da aplicação...
      // ...visando criar um novo estado:
      const newState = { ...state };
      // modificando a variável de estado 'botaoClicado':
      newState.botaoClicado = !newState.botaoClicado;
      // retornando o novo estado:
      return newState;
    }
    default:
      return state;
  }
}
