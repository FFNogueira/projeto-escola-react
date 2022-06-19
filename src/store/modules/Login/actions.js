import * as types from '../types';

export function loginRequest(token, username, id, email) {
  return { type: types.LOGIN_SUCCESS, token, username, id, email };
}

export function acaoNaoImplementada1() {
  return {};
}

export function acaoNaoImplementada2() {
  return {};
}
