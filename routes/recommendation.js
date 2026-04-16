const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const { bb, tb, alergi } = req.query;

    let menu = [];

    if (bb < 10) {
        menu.push("Bubur ayam + telur");
        menu.push("Pure kentang + daging");
    }

    if (tb < 80) {
        menu.push("Susu tinggi kalsium");
    }

    if (alergi && alergi.includes("telur")) {
        menu = menu.filter(m => !m.includes("telur"));
    }

    menu.push("Buah pisang");
    menu.push("Sayur bayam");

    res.send(menu.slice(0,5));
});

module.exports = router;