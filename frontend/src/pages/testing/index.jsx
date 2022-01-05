import React, { useCallback, useState } from 'react';
import AuthModal from './AuthModal';

function Testing() {
  const [Dialog, setDialog] = useState(false);

  const openModal = useCallback(() => {
    setDialog(true);
  }, []);

  const closeModal = useCallback(() => {
    setDialog(false);
  }, []);

  const handleClick = useCallback(() => {
    openModal();
  }, []);

  return (
    <div>
      <button type="button" onClick={handleClick}>
        로그인
      </button>
      <AuthModal closeModal={closeModal} visible={Dialog} />
    </div>
  );
}

export default Testing;
