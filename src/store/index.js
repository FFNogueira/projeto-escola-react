// Importa o criador de persistor para a store:
import { persistStore } from 'redux-persist';
// importa o armazenador de estados (createStore) e o gerenciador de...
// ...middlewares (applyMiddleware) do redux:
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
// importa o gerenciador de middleware do saga:
import createSagaMiddleware from 'redux-saga';
// Importa o gerenciador de variáveis de estado persistentes:
import persistance from './modules/reduxPersist';
// Importa o reducer combinado (rootReducer):
import rootReducer from './modules/rootReducer';
// importa o rootSaga:
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistance(rootReducer),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;
