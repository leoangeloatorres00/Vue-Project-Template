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

export const lazyLoad = (name, type = "view") => {
  if (type == "view") return loadView(name);
  if (type == "image") return loadImage(name);
  if (type == "layout") return loadLayout(name);
  if (type == "component") return loadComponent(name);
};

export const observeInput = (element, callback) => {
  watch(
    () => element.value,
    () => {
      return callback();
    }
  );
};

const loadView = (name) => {
  return () => import(`@/views/${name}.vue`);
};

const loadLayout = (name) => {
  return () => import(`@/layouts/${name}.vue`);
};

const loadImage = (name) => {
  return () => import(`@/assets/images/${name}`);
};

const loadComponent = (name) => {
  return () => import(`@/components/elements/${name}.vue`);
};
