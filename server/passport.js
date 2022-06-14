const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
// var FacebookStrategy = require("passport-facebook").Strategy;

const GOOGLE_CLIENT_ID =
  "435069988332-562an7uq5jco55571r7i6d0svt73a7nn.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_APP_ID = "";
const FACEBOOK_APP_SECRET = "";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
