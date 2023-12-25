"use client";
import { useEffect, useState } from "react";

//https://stackoverflow.com/a/68847097
const useSessionStorage = (name: string) => {
  const [value, setValue] = useState<string | null>("");

  useEffect(() => {
    setValue(sessionStorage.getItem(name));
  }, []);

  return value;
};

export default useSessionStorage;
