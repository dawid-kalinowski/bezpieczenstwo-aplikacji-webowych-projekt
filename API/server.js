const express = require('express');
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;

const app = express();

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://github.com/login/oauth/authorize',
  tokenURL: 'https://github.com/login/oauth/access_token',
  clientID: 'Ov23li3w4wOWD4GL0Dsb',
  clientSecret: '2c7ee70f41b4d9041e62303af1209463736dd7b0',
  callbackURL: 'http://localhost:3000/auth/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

app.get('/', (req, res) => {
  res.send(`
    <form action="/auth/github" method="get">
      <button type="submit">ŚCIŚLE TAJNE!</button>
    </form>
  `);
});

app.get('/auth/github', passport.authenticate('oauth2'));

app.get('/auth/callback', passport.authenticate('oauth2', {
  successRedirect: '/api/protected',
  failureRedirect: '/'
}));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.get('/api/protected', ensureAuthenticated, (req, res) => {
  res.send('Oto ściśle tajna treść!');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
