const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy
const Users = require('../modles/User');

const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies["access_token"]
    }
    return token;
}

// authorization Middleware
passport.use(new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: `${process.env.SECRET}`
}, (payload, done) => {
    Users.findById(payload.sub, (err, user) => {
        if (err) {
            return done(err, false)
        }
        if (user) {
            return done(null, user)
        }
        else
            done(null, false)
    })
}))