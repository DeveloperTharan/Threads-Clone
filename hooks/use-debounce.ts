'use client'

import React, { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeOut);
  }, [value, delay]);

  return debounceValue;
};
