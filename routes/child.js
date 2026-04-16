const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Simpan / update
router.post('/', (req, res) => {
    const user = req.session.user;
    if (!user) return res.send("Unauthorized");

    const data = req.body;

    db.run(`
        INSERT INTO child 
        (user_id, nama, umur, bb, tb, lila, lingkar_kepala, alergi, mikrobiota)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        user.id,
        data.nama,
        data.umur,
        data.bb,
        data.tb,
        data.lila,
        data.lk,
        data.alergi,
        data.mikrobiota
    ], function(err) {
        if (err) return res.send(err);
        res.send({ status: "saved" });
    });
});

// Ambil data
router.get('/', (req, res) => {
    const user = req.session.user;

    db.all(
        "SELECT * FROM child WHERE user_id=? ORDER BY created_at",
        [user.id],
        (err, rows) => {
            res.send(rows);
        }
    );
});

module.exports = router;