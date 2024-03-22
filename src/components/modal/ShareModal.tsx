import { FunctionComponent } from 'react';

import ActionModal from './ActionModal';

type Props = {
  show: boolean;
  handleClose: () => void;
};

const ShareModal: FunctionComponent<Props> = ({ show, handleClose }) => {
  const actions = (
    <>
      <button onClick={() => {}}>Facebook</button>
      <button onClick={() => {}}>Twitter</button>
    </>
  );

  return (
    <ActionModal
      title="Share"
      actions={actions}
      show={show}
      onClose={handleClose}>
      Sharing is caring, please show this awefully anoying website to your
      friends.
    </ActionModal>
  );
};

export default ShareModal;
