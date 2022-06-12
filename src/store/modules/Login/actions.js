import * as types from '../types';

export function botaoClicadoRequest() {
  return { type: types.BOTAO_ENVIAR_REQUEST };
}

export function botaoClicadoSuccess() {
  return { type: types.BOTAO_ENVIAR_SUCCESS };
}

export function botaoClicadoFail() {
  return { type: types.BOTAO_ENVIAR_FAIL };
}
