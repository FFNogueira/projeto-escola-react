// importa o armazenador de estados (createStore) e o gerenciador de...
// ...middlewares (applyMiddleware) do redux:
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
// importa o gerenciador de middleware do saga:
import createSagaMiddleware from 'redux-saga';
// Importa o reducer combinado (rootReducer):
import rootReducer from './modules/rootReducer';
// importa o rootSaga:
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export default store;
