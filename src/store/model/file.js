import FSNode from './fs-node';

export default class File extends FSNode {
  serialize () {
    let obj = super.serialize();
    obj.type = 'file';
    return obj;
  }
}
