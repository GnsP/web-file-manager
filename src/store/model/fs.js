import File from './file';
import Directory from './directory';
import FSError from './error';

export default class FS {
  constructor () {
    this.root = new Directory('root', 'system', new Date(Date.now()), null);
    this.cwd = this.root;
  }

  static fromState (state) {
    let tree = new FS();
    tree.root = FS.makeNode (state.root, null);
    tree.cwd = FS.findNode(tree.root, state.cwd);
    return tree;
  }

  static makeNode (state, par) {
    if (state.type === 'file')
      return new File (state.name, state.creator, state.size, new Date(state.created), par);

    let node = new Directory (state.name, state.creator, new Date(state.created), par);
    node.size = state.size;
    for (let key of Object.keys(state.contents)) {
      node.contents[key] = FS.makeNode(state.contents[key], node);
    }
    return node;
  }

  static findNode (root, path) {
    if (path[0] !== 'root')
      throw new FSError(`path ${path.join('/')} does not begin with root`);
    let res = root;
    for (let key of path.slice(1)) {
      if (res.contents[key] === undefined)
        throw new FSError(`path ${path.join('/')} does not exist in ${root.path.join('/')}`);
      res = res.contents[key];
    }
    return res;
  }

  mkdir (name, creator, date=new Date(Date.now())) {
    if (this.cwd.contents[name] !== undefined)
      throw new FSError(`directory ${name} already exists`);

    let newDir = new Directory (name, creator, date, this.cwd);
    this.cwd.contents[name] = newDir;
    return true;
  }

  cd (name) {
    if (this.cwd.contents[name] === undefined)
      throw new FSError(`directory ${name} does not exist`);
    if (this.cwd.contents[name] instanceof File)
      throw new FSError(`${name} is a file, not a directory`);

    this.cwd = this.cwd.contents[name];
  }

  jump (path) {
    this.cwd = FS.findNode (this.root, path);
  }

  exists (path) {
    try {
      FS.findNode(this.root, path);
      return true;
    } catch (err) {
      return false;
    }
  }

  touch (name, creator, size, date=new Date(Date.now())) {
    if (this.cwd.contents[name] !== undefined) {
      throw new FSError(`file ${name} already exists`);
    }

    this.cwd.contents[name] = new File (name, creator, size, date, this.cwd);
    let par = this.cwd;
    while (par) {
      par.size += size;
      par = par.par;
    }
  }

  rm (path) {
    let node = FS.findNode(this.root, path);
    node.par.size -= node.size;
    delete node.par.contents[node.name];
  }

  ls () {
    const { contents } = this.cwd;
    let list = Object.keys(contents).map(key => contents[key] ? {
      key,
      type: contents[key] instanceof File ? 'file' : 'directory',
      size: contents[key].size,
      creator: contents[key].creator,
      created: contents[key].created,
      path: contents[key].path.join('/'),
      par: contents[key].par ? contents[key].par.path.join('/') : 'root',
    } : null).filter(Boolean);

    return list.filter(x => x.type === 'directory').concat(list.filter(x => x.type === 'file'));
  }

  all () {
    let res = [];
    let q = [this.root];

    while (q.length) {
      let node = q.shift();
      res.push(node);
      if (node instanceof Directory) {
        for (let key of Object.keys(node.contents)) {
          if (key === '.' || key === '..') continue;
          q.push(node.contents[key]);
        }
      }
    }

    return res.map(node => ({
      type: node instanceof File ? 'file' : 'directory',
      key: node.name,
      size: node.size,
      creator: node.creator,
      created: node.created,
      path: node.path.join('/'),
      par: node.par ? node.par.path.join('/') : 'root',
    }));
  }

  serialize () {
    let self = this;
    return {
      cwd: self.cwd.path,
      root: self.root.serialize(),
      current: self.ls(),
      all: self.all(),
    };
  }
}

