import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default function persistance(reducers) {
  const persistReducers = persistReducer(
    {
      // 'key' é uma string com o nome da aplicação:
      key: 'NOME-DO-APP',
      storage,
      // dentro do array 'whitelist' devem ser colocados os nomes...
      // ...das funções-reducers que estão dentro de 'rootReducer.js'...
      // ...e que se deseje persistir as variáveis de estado:
      whitelist: ['loginReducer'],
    },
    reducers
  );

  return persistReducers;
}
