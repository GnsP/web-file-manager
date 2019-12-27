import { ui } from 'store/actions/names';

export default function uiReducer (state={ search: '' }, action) {
  switch (action.type) {
    case ui.SET_SEARCH:
      return { search: action.payload };
    default:
      return state;
  }
}
