const express = require('express');
const router = express.Router();
const db = require('../models/db');
const PDFDocument = require('pdfkit');

router.get('/', (req, res) => {
  const user = req.session.user;

  db.all("SELECT * FROM child WHERE user_id=?", [user.id], (err, rows) => {

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(18).text('Laporan Data Anak', { align: 'center' });
    doc.moveDown();

    rows.forEach((d, i) => {
      doc.fontSize(12).text(
        `${i+1}. Nama: ${d.nama} | BB: ${d.bb} | TB: ${d.tb}`
      );
    });

    doc.end();
  });
});

module.exports = router;