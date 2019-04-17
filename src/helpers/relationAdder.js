const multiAdder = (model, values, type) => {
  values.forEach((value) => {
    model[`add${type}`](value);
  });
};

const multiAdderWithValue = (model, values, type) => {
  values.forEach((value) => {
    model[`add${type}`](value.id, { through: { quantity: value.qty } });
  });
};
const singleAdder = (model, value, type) => model[`add${type}`](value);


export { multiAdder, singleAdder, multiAdderWithValue };
