let n = 0;
let nn = name => `__web_file_manager_action_${n++}_${name || 'unnamed'}__`;

const genActionNames = namesArray => namesArray.reduce((acc, name) => {
  acc[name] = nn(name);
  return acc;
}, {});

const ui = genActionNames ([
  'SET_SEARCH',
]);

const fs = genActionNames ([
  'JUMP_DIR',
  'CREATE_FILE',
  'CREATE_FOLDER',
  'DELETE_NODE',
]);

export {
  fs,
  ui,
};
