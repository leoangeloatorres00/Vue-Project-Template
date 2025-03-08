import { watch } from "vue";

export const setLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
  window.dispatchEvent(
    new CustomEvent(name, {
      detail: localStorage.getItem(name),
    })
  );
};

export const getLocalStorage = (name) => {
  let data = localStorage.getItem(name);
  return JSON.parse(data);
};

export const removeLocalStorage = (name) => {
  localStorage.removeItem(name);
};

export const lazyLoad = (view) => {
  return () => import(`@/views/${view}.vue`);
};

export const lazyLoadImage = (image) => {
  return require(`@/assets/images/${image}`);
};

export const observeInput = (element, callback) => {
  watch(
    () => element.value,
    () => {
      return callback();
    }
  );
};
