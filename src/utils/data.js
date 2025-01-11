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
  let unformattedAmount = amount;
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
