const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;



passport.use(
    new GoogleStrategy({
            clientID: "612881049394-o60dr8ik0ivgf3msdo930obf68rn09eg.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            // Find or create the user in the database
            // Then call done with the user
            done(null, user);
        }
    )
);

app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to home.
        res.redirect('/');
    }
);



// Connect to MongoDB
mongoose.connect('mongodb://localhost/your_database', { useNewUrlParser: true });

// Create a new Mongoose schema for your user model
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// Use the schema to create a new Mongoose model
const User = mongoose.model('User', userSchema);

// Use Passport.js to handle user authentication
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

// Create API routes to handle user login and registration
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.send('Logged in successfully');
});
app.post('/register', (req, res) => {
    // Handle user registration
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});