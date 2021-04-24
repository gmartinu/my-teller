export * from './getRoutes';
export * from './getCollapseStates';
export * from './getActiveRoute';
export * from './getForms';

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
