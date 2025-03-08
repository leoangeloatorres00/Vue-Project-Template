import axios from "axios";
import crypto from "@/utils/crypto";

import router from "@/router";
import { isDevelopment } from "@/config";

const baseURL = () => {
  if (isDevelopment) {
    return process.env.VUE_APP_TEST_API_ENDPOINT;
  }
  return process.env.VUE_APP_PROD_API_ENDPOINT;
};

const urlDecodeExemption = ["/faqs"];

const service = axios.create({
  timeout: 60000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

service.interceptors.request.use(
  (config) => {
    config.baseURL = baseURL();

    const payload = { ...config.data };
    const encoded = crypto.encode(payload, "HMAC");
    const data = { data: encoded };
    config.data = data;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (config) => {
    const url = config.config.url;

    if (!urlDecodeExemption.includes(url)) {
      const payload = config.data;
      config.data = crypto.decode(payload.data);
    }

    const { errorCode } = config.data;

    if (errorCode != null && errorCode != "") {
      const errorPage = getErrorPage(errorCode);

      const payload = {
        page: errorPage,
        errorCode: errorCode,
      };

      const path = "/error";
      const query = payload;

      router.options.methods.go(path, query);
      return config;
    }

    return config;
  },
  (error) => {
    const { code, message } = error;

    if (code != null && code != "") {
      const errorPage = getErrorPage(code);

      const payload = {
        page: errorPage,
        errorCode: `${code}-${message}`,
      };

      const path = "/error";
      const query = payload;

      router.options.methods.go(path, query);
    }
  }
);

const getErrorPage = (errorCode) => {
  let page;
  switch (errorCode) {
    case "ECONNABORTED":
      page = "network";
      break;
    default:
      page = "";
  }

  return page;
};

export default service;
