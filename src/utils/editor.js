export const onCheck = (payload) => {
  if (payload.isCheck) {
    addAttributes(payload);
    return;
  }
  removeAttributes(payload);
};

export const addAttributes = (payload) => {
  payload.attributes += ` ${payload.attribute}`;
};

export const removeAttributes = (payload) => {
  const array = payload.attributes.split(" ");

  const index = array.indexOf(payload.attribute);

  if (index > -1) {
    array.splice(index, 1);
  }

  payload.attributes = array.join(" ");
};
