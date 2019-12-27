import fs from './fs';

export default class FState {

  static getInitialState () {
    let tree = new fs();
    FState.injectMockData(tree);
    return tree.serialize();
  }

  static injectMockData ($) {
    $.mkdir('apps', 'system');
    $.mkdir('songs', 'system');
    $.mkdir('pictures', 'system');
    $.mkdir('documents', 'system');
    $.mkdir('videos', 'system');
    $.touch('a.pdf', 'gnsp', 20);
    $.touch('b.jpg', 'gnsp', 20);
    $.cd('songs');
    $.touch('1.mp3', 'gnsp', 20);
    $.touch('2.mp3', 'gnsp', 130);
    $.touch('3.mp3', 'gnsp', 50);
    $.cd('..');
    $.cd('documents');
    $.mkdir('work', 'gnsp');
    $.touch('c.pdf', 'gnsp', 100);
    $.touch('d.docx', 'gnsp', 30);
    $.cd('work');
    $.touch('e.pdf', 'gnsp', 10);
    $.touch('f.ts', 'gnsp', 10);
    $.jump(['root']);
  }

  static mkdir (state, name, creator, date=new Date(Date.now())) {
    let tree = fs.fromState(state);
    tree.mkdir(name, creator, date);
    console.log(tree);
    return tree.serialize();
  }

  static touch (state, name, creator, size, date=new Date(Date.now())) {
    let tree = fs.fromState(state);
    tree.touch(name, creator, size, date);
    return tree.serialize();
  }

  static cd (state, name) {
    let tree = fs.fromState(state);
    tree.cd(name);
    return tree.serialize();
  }

  static jump (state, path) {
    let tree = fs.fromState(state);
    tree.jump(path.split('/').filter(Boolean));
    return tree.serialize();
  }

  static exists (state, path) {
    let tree = fs.fromState(state);
    return tree.exists(path.split('/').filter(Boolean));
  }

  static deleteNode (state, path) {
    let tree = fs.fromState(state);
    tree.rm(path.split('/').filter(Boolean));
    return tree.serialize();
  }
}
