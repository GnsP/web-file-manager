import { ui } from './names';

export function setSearch (str) {
  return {
    type: ui.SET_SEARCH,
    payload: str,
  };
}
