import { isDevelopment } from "@/config";

import { api as DEV_API } from "@/services/dev_api";
import { api as PROD_API } from "@/services/prod_api";

import request from "@/utils/service";

const post = (path, payload) => {
  const url = getURL(path);
  return request.post(url, payload).then((response) => {
    if (response != undefined) {
      const { data } = response;
      return data;
    }
  });
};

const get = (path, payload) => {
  const url = getURL(path);
  return request.get(url, payload).then((response) => {
    if (response != undefined) {
      const { data } = response;
      return data;
    }
  });
};

const getURL = (path) => {
  const api = isDevelopment ? DEV_API : PROD_API;
  return api[path];
};

export const api = {
  post: post,
  get: get,
};
