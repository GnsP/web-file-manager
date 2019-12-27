import FSNode from './fs-node';

export default class Directory extends FSNode{
  constructor (name, creator, date, par) {
    super (name, creator, 0, date, par);
    this.contents = Object.create(null);
    this.contents['.'] = this;
    this.contents['..'] = this.par;
  }

  serialize () {
    let obj = super.serialize();
    obj.type = 'directory';
    obj.contents = Object.keys(this.contents).reduce((acc, key) => {
      if (key === '.' || key === '..') return acc;
      acc[key] = this.contents[key].serialize();
      return acc;
    }, Object.create(null));
    return obj;
  }
}
