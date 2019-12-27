import React from 'react';
import { connect } from 'react-redux';
import CreateNewDialogue from './create-new';
import ContextMenu from './context-menu';
import NodeInfo from 'components/node-info';
import FSItem from 'components/fs-item';
import ImageButton from 'components/image-button';
import Modal from 'components/modal';
import Toast from 'components/toast';
import { deleteNode } from 'store/actions/fs';
import { matches } from 'utils';

import addImage from 'static/add.png';

function Explorer ({ nodes, found, query, error, deleteNode }) {
  const EMPTY_CONTEXT_MENU = { active: false, item: null, x: 0, y: 0 };
  const EMPTY_INFO_MODAL = { active: false, item: null };

  const [showModal, setShowModal] = React.useState(false);
  const [infoModal, setInfoModal] = React.useState(EMPTY_INFO_MODAL);
  const [contextMenu, setContextMenu] = React.useState(EMPTY_CONTEXT_MENU);

  React.useEffect(() => {
    setShowModal(false);
    setContextMenu(EMPTY_CONTEXT_MENU);
    setInfoModal(EMPTY_INFO_MODAL);
  }, [nodes]);

  function addNode () {
    setShowModal(true);
  }

  function closeCreateModal () {
    setShowModal(false);
  }

  function onRightClick (item, x, y) {
    setContextMenu({ active: true, item, x, y });
  }

  function closeContextMenu () {
    setContextMenu(EMPTY_CONTEXT_MENU);
  }

  function onNodeInfo (item) {
    setInfoModal({ active: true, item });
  }

  function closeInfoModal () {
    setInfoModal(EMPTY_INFO_MODAL);
  }

  function onNodeDelete (node) {
    deleteNode(node.path);
  }

  return (
    <React.Fragment>
      <div className='file-explorer-container'>
        {
          nodes.filter(node => !node.key.startsWith('.')).map((node, index) => <FSItem key={index} item={node} onRightClick={onRightClick}/>)
        }
        <div key={'add-new'} className='file-item'>
          <ImageButton image={addImage} onClick={addNode} />
        </div>
      </div>
      {
        found &&
        <div className='fw mt-lg'>
          <h3 className='normal-weight'> Search results for "{query}" </h3>
          <div className='file-explorer-container'>
            {
              found.filter(node => !node.key.startsWith('.')).map((node, index) => <FSItem key={index} item={node} onRightClick={onRightClick}/>)
            }
          </div>
        </div>
      }
      {
        showModal &&
        <Modal>
          <CreateNewDialogue onClose={closeCreateModal} />
        </Modal>
      }
      {
        infoModal.active &&
        <Modal>
          <NodeInfo item={infoModal.item} onClose={closeInfoModal} />
        </Modal>
      }
      {
        error && <Toast error message={error} />
      }
      {
        contextMenu.active &&
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            item={contextMenu.item}
            onClose={closeContextMenu}
            onInfo={onNodeInfo}
            onDelete={onNodeDelete}
          />
      }
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  nodes: state.ui.search ? state.view.current.filter(node => matches(node.key, state.ui.search)) : state.view.current,
  found: state.ui.search ? state.view.all.filter(node => matches(node.key, state.ui.search)) : null,
  error: state.view.error,
  query: state.ui.search,
});

export default connect (mapStateToProps, { deleteNode }) (Explorer);
