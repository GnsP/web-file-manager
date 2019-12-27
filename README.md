# Web File Manager Demo (React + Redux)

This is an UI only demo of a web file manager, written using React and Redux.

It is a web UI which allows a user to navigate through a folder structure (dummy) just
like a normal desktop file system (Explorer in Windows and Finder in OSX).

## Features

1. The webapp mounts to the root route i.e. “/” . This would list all subdirectories to root.
2. The app will also display the “current path” in the navbar
3. Double clicking a directory should update the “current path” as well as change the view with all the files & folders present inside this new directory.
4. There will be a Up button which will lead you one step above in the directory structure.
5. On right click of a file/folder, secondary menu popups with 3 options
  + Open - navigate into the folder, open info popup
  + Get Info - Opens info popup for both file & folder.
  + Delete - remove file/folder from the system
6. Each folder would have an Create/Add button, which would trigger a popup to create a new file/folder with associated meta fields - name(with extension for files), creator, size and date

## Bonus Features

1. Local search
2. Global search

## Todo

- Refactor SASS
- Optimize store/model (using immutable.js)
- Write tests
- Write flowtypes
