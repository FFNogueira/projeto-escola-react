import * as types from '../types';

export function loginState(token, username, id, email) {
  return { type: types.LOGIN_STATE_UPDATE, token, username, id, email };
}

export function acaoNaoImplementada1() {
  return {};
}

export function acaoNaoImplementada2() {
  return {};
}
