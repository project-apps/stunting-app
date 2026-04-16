const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Register
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    db.run(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, password],
        function(err) {
            if (err) return res.send(err);
            res.send({ status: "registered" });
        }
    );
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE email=? AND password=?",
        [email, password],
        (err, row) => {
            if (!row) return res.send({ status: "failed" });

            req.session.user = row;
            res.send({ status: "success" });
        }
    );
});

module.exports = router;