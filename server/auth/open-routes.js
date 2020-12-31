const IGNORE_ROUTES = []
module.exports = (path, method) => {
  return IGNORE_ROUTES.some(route => route.method.test(method) && route.path.test(path))
}
