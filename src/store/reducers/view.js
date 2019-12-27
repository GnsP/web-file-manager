import fstate from 'store/model';
import { fs } from 'store/actions/names'

export default function uiReducer (state=fstate.getInitialState(), {type, payload}) {
  switch (type) {
    case fs.JUMP_DIR:
      try {
        return fstate.jump(state, payload);
      } catch (e) {
        return { ...state, error: e.what };
      }

    case fs.CREATE_FILE:
      try {
        return fstate.touch(state, payload.name, payload.creator, payload.size, payload.date);
      } catch (e) {
        return { ...state, error: e.what };
      }

    case fs.CREATE_FOLDER:
      try {
        return fstate.mkdir(state, payload.name, payload.creator, payload.date);
      } catch (e) {
        return { ...state, error: e.what };
      }

    case fs.DELETE_NODE:
      try {
        return fstate.deleteNode(state, payload);
      } catch (e) {
        return { ...state, error: e.what };
      }

    default:
      return state;
  }
}
