import { useCallback, useState } from 'react';

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((value) => !value), []);
  return [value, toggle, setValue] as const;
};

export default useToggle;
