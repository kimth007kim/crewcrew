import React, { useCallback, useState } from 'react';

function useModal() {
  const [visible, setVisible] = useState(false);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  return [visible, open, close];
}

export default useModal;
