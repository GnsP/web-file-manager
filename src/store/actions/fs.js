import { fs } from './names';

export function jumpDir (path) {
  return {
    type: fs.JUMP_DIR,
    payload: path,
  };
}

export function createNode (obj) {
  if (obj.nodeType === 'file') return {
    type: fs.CREATE_FILE,
    payload: obj,
  };
  else return {
    type: fs.CREATE_FOLDER,
    payload: obj,
  };
}

export function deleteNode (path) {
  return {
    type: fs.DELETE_NODE,
    payload: path,
  };
}
