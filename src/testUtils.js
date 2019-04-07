import checkPropTypes from 'check-prop-types';

export const findByClassAttr = (wrapper, val) => {
  return wrapper.find(`[className="${val}"]`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );
  expect(propError).toBeUndefined();
};
