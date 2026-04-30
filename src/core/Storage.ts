import { LOCAL_STORAGE_KEY } from "./Constants";

const get = () => {
  let value = null;
  const keyStorage = LOCAL_STORAGE_KEY;
  const temp = localStorage.getItem(keyStorage);
  if (temp) {
    value = JSON.parse(temp);
  }
  return value;
};

const set = ({ value }: { value: unknown }) => {
  const keyStorage = LOCAL_STORAGE_KEY;
  localStorage.setItem(keyStorage, JSON.stringify(value));
};

const clear = () => {
  localStorage.clear();
};

export const Storage = {
  get,
  set,
  clear,
};
