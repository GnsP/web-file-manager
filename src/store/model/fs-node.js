export default class FSNode {
  constructor (name, creator, size, date, par) {
    this.name = name;
    this.creator = creator;
    this.size = size;
    this.created = date;
    this.par = par;
    this.path = par === null ? [name] : par.path.concat(name);
    this.isRoot = this.par === null;
  }

  serialize () {
    let self = this;

    return {
      name: self.name,
      creator: self.creator,
      size: self.size,
      created: self.created.getTime(),
      par: self.par ? self.par.path : [],
      path: self.path,
      isRoot: self.isRoot,
    };
  }
}
