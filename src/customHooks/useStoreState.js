import { useEffect, useState } from "react";

export function useStoreState(key) {
  const [value, setValue] = useState(() => {
    const storedVariable = JSON.parse(localStorage.getItem(key));
    if (storedVariable === null) return [];
    return storedVariable;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
