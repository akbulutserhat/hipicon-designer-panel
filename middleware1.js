module.exports = function (req, res, next) {
    if (req.method === 'POST' && req.originalUrl === '/user/login') {
      return res.jsonp({ token: "foo" })
    }
    next()
  }