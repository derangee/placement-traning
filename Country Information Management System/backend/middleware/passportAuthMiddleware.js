const passport = require("passport");

const passportAuthMiddleware = passport.authenticate("jwt", {
    session: false,
});

module.exports = passportAuthMiddleware;