const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./models/db');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
    secret: 'secret123',
    resave: false,
    saveUninitialized: true
}));

// ROUTES
app.use('/auth', require('./routes/auth'));
app.use('/child', require('./routes/child'));
app.use('/recommendation', require('./routes/recommendation'));
app.use('/report', require('./routes/report'));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

function authMiddleware(req, res, next) {
  if (!req.session.user) return res.redirect('/login.html');
  next();
}

// protect route static
app.use('/layout.html', authMiddleware);