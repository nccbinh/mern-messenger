/**
 * Authentication Middleware
 * @author Binh Nguyen
 * @since 0.0.1
 */
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;

const secret = process.env.JWT_SECRET;

/**
 * @name cookieExtractor
 * @description Extracts JWT token from cookies
 * @returns JWT token if any, otherwise null
 */
const cookieExtractor = (req) => {
  return req && req.cookies ? req.cookies[process.env.JWT_PARAM] : null;
};

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: secret,
    },
    (jwtPayload, done) => {
      const { expiration } = jwtPayload;
      if (Date.now() > expiration) {
        done("Unauthorized", false);
      }

      done(null, jwtPayload);
    }
  )
);

const Auth = passport.authenticate("jwt", { session: false });

module.exports = Auth;
