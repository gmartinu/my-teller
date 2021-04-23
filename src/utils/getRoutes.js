import { Route } from 'react-router-dom';
import mainRoute from 'routes.js';

export const getRoutes = (layout, _routes) => {
  let routes = _routes ? _routes : mainRoute;
  return routes.map((prop, key) => {
    if (prop.collapse) {
      return getRoutes(layout, prop.views);
    }
    if (prop.layout === layout) {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
          exact
        />
      );
    }
    return null;
  });
};
