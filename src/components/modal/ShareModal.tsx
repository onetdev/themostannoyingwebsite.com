import ActionModal from './ActionModal';

type Props = {
  show: boolean;
  handleClose: () => void;
};

const ShareModal = ({ show, handleClose }: Props) => {
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
