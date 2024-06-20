const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const User = require('./models/User');
const connectDB = require('./config/db');
const posts = require('./routes/api/posts');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());

// Define routes
app.use('/api/posts', posts);

app.get('/', (req, res) => res.send('API Running'));

// Passport configuration
passport.use(new OAuth2Strategy({
    authorizationURL: 'https://github.com/login/oauth/authorize',
    tokenURL: 'https://github.com/login/oauth/access_token',
    clientID: 'Ov23liznxb1NK2jEzi3k',
    clientSecret: '317f53075dc162a04fc4eb034275e801b325ffcf',
    callbackURL: 'http://localhost:5000/auth/callback'
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      // Find or create user
      let user = await User.findOne({ oauthID: profile.id });
      if (!user) {
        user = new User({
          oauthID: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        });
        await user.save();
      }
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));

app.use(passport.initialize());

// Route to start OAuth2 authentication
app.get('/auth/github', passport.authenticate('oauth2'));

// OAuth2 callback route
app.get('/auth/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
