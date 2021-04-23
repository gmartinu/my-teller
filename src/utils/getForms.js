import { Route } from 'react-router-dom';
import mainRoute from 'routes.js';

export const getForms = (layout, _routes) => {
  let routes = _routes ? _routes : mainRoute;
  return routes.map((prop, key) => {
    if (prop.collapse) {
      return getForms(layout, prop.views);
    }
    if (prop.layout === layout) {
      return (
        <Route
          path={prop.layout + prop.path + '/:id'}
          component={prop.form}
          key={key}
          exact
        />
      );
    }
    return null;
  });
};
