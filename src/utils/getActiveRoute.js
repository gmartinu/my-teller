import mainRoutes from 'routes.js';

export const getActiveRoute = (_routes) => {
  let routes = _routes ? _routes : mainRoutes;
  let activeRoute = 'Default Brand Text';
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].collapse) {
      let collapseActiveRoute = getActiveRoute(routes[i].views);
      if (collapseActiveRoute !== activeRoute) {
        return collapseActiveRoute;
      }
    } else {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i];
      }
    }
  }
  return activeRoute;
};
