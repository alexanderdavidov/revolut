export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  };
};

export const saveResult = (res, actionType) => {
  return {
    type: actionType,
    result: res
  };
};
