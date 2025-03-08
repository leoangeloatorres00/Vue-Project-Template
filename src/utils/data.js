export const formatAmount = (amount) => {
  amount = amount.toString();

  const options = {
    style: "decimal",
  };

  // add comma in amount
  let formattedNumber = parseFloat(amount).toLocaleString(undefined, options);

  if (formattedNumber.indexOf(".") > -1) {
    let decimal = amount.split(".")[1];
    let integer = formattedNumber.split(".")[0];

    // add 0 when decimal length is 1
    if (decimal.length == 1) {
      decimal += "0";
    }

    formattedNumber = `${integer}.${decimal}`;
  }

  // add .00 when amount is whole amount
  if (formattedNumber.indexOf(".") == -1) {
    formattedNumber += ".00";
  }

  return formattedNumber;
};

export const unformatAmount = (amount) => {
  let unformattedAmount = amount.toString();
  let formattedAmount = unformattedAmount.split(".");

  // remove the .00 in amount in whole number
  if (formattedAmount[1] == "00") {
    unformattedAmount = formattedAmount[0];
  }

  // remove comma in amount
  if (unformattedAmount % 1 != 0) {
    unformattedAmount = unformattedAmount.replaceAll(",", "");
  }

  return unformattedAmount;
};

export const truncateText = (text, maxLength = 30) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const sortList = (lists, key) => {
  return lists.sort((a, b) => {
    return a[key].localeCompare(b[key]);
  });
};

export const maskedText = (text, maxLength = 5) => {
  let start = text.length - maxLength;
  let end = text.length;

  let prefix = "";
  if (start < 0) {
    start = maxLength;
  }

  for (let index = 0; index < start; index++) {
    prefix += "*";
  }

  text = text.substring(start, end);

  return prefix + text;
};

export const copyText = (text) => {
  navigator.clipboard.writeText(text);
};

export const getTime = (dateTime) => {
  const date = new Date(dateTime);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleTimeString("en-US", options);
};

export const getDate = (dateTime) => {
  const date = new Date(dateTime);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

export const getDateTime = (dateTime) => {
  const date = new Date(dateTime);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleDateString("en-US", options);
};
