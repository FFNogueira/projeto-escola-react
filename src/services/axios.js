import axios from 'axios';

export default axios.create({
  // "baseURL" contêm o endereço do servidor...
  // ...e a porta onde este está funcionando:
  baseURL: 'http://192.168.0.9:3001',
});
