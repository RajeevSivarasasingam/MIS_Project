// middleware/auth.js

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.session && req.session.user) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/login');
  },

  ensureRole: function (role) {
    return function (req, res, next) {
      if (req.session && req.session.user && req.session.user.role === role) {
        return next();
      }
      req.flash('error_msg', 'Access denied');
      res.redirect('/');
    };
  }
};
