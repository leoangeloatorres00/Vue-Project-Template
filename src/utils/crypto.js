import CryptoJS from "crypto-js";
import jsrsasign from "jsrsasign";

const PLAIN_SECRET_KEY = "";
const SECRET_KEY = PLAIN_SECRET_KEY.replace(/"/g, "");

const publicKey = `-----BEGIN PUBLIC KEY-----
      -----END PUBLIC KEY-----`;

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
      -----END RSA PRIVATE KEY-----`;

const base64url = (source) => {
  let encodedSource = CryptoJS.enc.Base64.stringify(source);

  encodedSource = encodedSource.replace(/=+$/, "");

  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");

  return encodedSource;
};

export default {
  encrypt(data) {
    const stringify = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(stringify, SECRET_KEY);
    const encoded = btoa(encrypted);
    return encoded;
  },
  decrypt(data) {
    const decoded = atob(data);
    const decrypted = CryptoJS.AES.decrypt(decoded, SECRET_KEY).toString(
      CryptoJS.enc.Utf8
    );
    const parseText = JSON.parse(decrypted);
    return parseText;
  },
  encode(payload, type = "RSA") {
    if (type == "HMAC") {
      return this.signHMAC(payload);
    }

    return this.signRSA(payload);
  },
  decode(encoded) {
    let base64Url = encoded.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let payload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(payload);
  },
  signRSA(payload) {
    const header = {
      alg: "RS256",
      typ: "JWT",
    };

    const stringifyHeader = JSON.stringify(header);
    const stringifyPayload = JSON.stringify(payload);

    return jsrsasign.KJUR.jws.JWS.sign(
      "RS256",
      stringifyHeader,
      stringifyPayload,
      privateKey,
      publicKey
    );
  },
  signHMAC(payload) {
    let header = {
      alg: "HS256",
      typ: "JWT",
    };

    let stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    let encodedHeader = base64url(stringifiedHeader);

    let stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
    let encodedData = base64url(stringifiedData);

    let token = encodedHeader + "." + encodedData;
    let signature = CryptoJS.HmacSHA256(token, SECRET_KEY);

    signature = base64url(signature);

    return token + "." + signature;
  },
  verify(encoded) {
    return jsrsasign.KJUR.jws.JWS.verify(encoded, publicKey);
  },
};
