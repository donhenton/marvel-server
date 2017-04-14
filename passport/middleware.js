function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
        res.render('index', {
            title: 'Login'
        });
  }
}

module.exports = authenticationMiddleware;

 