const express = require('express');
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;

const app = express();

// Konfiguracja sesji
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));

// Inicjalizacja Passport
app.use(passport.initialize());
app.use(passport.session());

// Konfiguracja strategii OAuth 2.0 (np. dla GitHub OAuth)
passport.use(new OAuth2Strategy({
  authorizationURL: 'https://github.com/login/oauth/authorize',
  tokenURL: 'https://github.com/login/oauth/access_token',
  clientID: YOUR_CLIENT_ID,
  clientSecret: YOUR_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Przetwarzanie profilu użytkownika (opcjonalne)
  return done(null, profile);
}));

// Definicja endpointów aplikacji
app.get('/', (req, res) => {
  res.send('Strona główna aplikacji');
});

// Endpoint autoryzacji
app.get('/auth/github', passport.authenticate('oauth2'));

// Callback po autoryzacji
app.get('/auth/callback', passport.authenticate('oauth2', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// Endpoint do wylogowania
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Uruchomienie serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
