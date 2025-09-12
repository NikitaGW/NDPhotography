const express = require('express');
const fs = require('fs');
const path = require('path');
const exe = require('../connection'); // your DB helper
const router = express.Router();

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Show add form
router.get('/about_banner_form', (req, res) => {
  res.render('admin/about_banner_form.ejs');
});

// Insert banner
router.post("/add_about_banner", async function(req, res) {
  try {
    const d = req.body;
    let filename = null;

    if (req.files && req.files.image) {
      filename = Date.now() + '_' + req.files.image.name.replace(/\s+/g, '_');
      await req.files.image.mv(path.join(IMAGES_DIR, filename));
    }

    await exe(
      `INSERT INTO about_banner (title, subtitle, background_image) VALUES (?, ?, ?)`,
      [d.title, d.subtitle, filename]
    );

    res.redirect("/admin/about_banner_list");
  } catch (err) {
    console.error("Error in add_about_banner:", err);
    res.status(500).send("Server error");
  }
});

// List banners
router.get("/about_banner_list", async function (req, res) {
  try {
    let banners = await exe("SELECT * FROM about_banner ORDER BY id ASC");
    res.render("admin/about_banner_list.ejs", { banners });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// render edit page (list -> click edit)
router.get("/update_about_banner/:id", async (req, res) => {
  try {
    const sql = `SELECT * FROM about_banner WHERE id = ?`;
    const rows = await exe(sql, [req.params.id]);

    if (!rows || rows.length === 0) {
      return res.status(404).send("Banner not found");
    }

    // PASS a single object, not the array
    res.render('admin/update_about_banner.ejs', { result: rows[0] });
  } catch (err) {
    console.error("Error in GET update:", err);
    res.status(500).send("Server error");
  }
});

// Update banner (handles optional new image)
router.post("/update_about_banner", async function(req, res) {
  try {
    const d = req.body;
    const id = d.id;

    // If new file uploaded -> save & update background_image
    if (req.files && req.files.background_image) {
      const file = req.files.background_image;
      const newName = Date.now() + '_' + file.name.replace(/\s+/g, '_');
      await file.mv(path.join(IMAGES_DIR, newName));

      // Optionally delete old image file (if exists)
      const old = await exe("SELECT background_image FROM about_banner WHERE id = ?", [id]);
      if (old && old[0] && old[0].background_image) {
        const oldPath = path.join(IMAGES_DIR, old[0].background_image);
        if (fs.existsSync(oldPath)) {
          try { fs.unlinkSync(oldPath); } catch(e) { console.warn("Could not delete old image:", e); }
        }
      }

      await exe(`UPDATE about_banner SET background_image = ? WHERE id = ?`, [newName, id]);
    }

    // Update title & subtitle
    await exe(
      `UPDATE about_banner SET title = ?, subtitle = ? WHERE id = ?`,
      [d.title, d.subtitle, id]
    );

    res.redirect("/admin/about_banner_list");
  } catch (err) {
    console.error("Error in POST update:", err);
    res.status(500).send("Server error");
  }
});

// Delete banner
router.get("/delete_about_banner/:id", async function(req, res) {
  try {
    const id = req.params.id;
    // optionally fetch image name to delete file
    const rows = await exe("SELECT background_image FROM about_banner WHERE id = ?", [id]);
    if (rows && rows[0] && rows[0].background_image) {
      const imgPath = path.join(IMAGES_DIR, rows[0].background_image);
      if (fs.existsSync(imgPath)) {
        try { fs.unlinkSync(imgPath); } catch(e) { console.warn("Could not delete file:", e); }
      }
    }
    await exe("DELETE FROM about_banner WHERE id = ?", [id]);
    res.redirect("/admin/about_banner_list");
  } catch (err) {
    console.error("Error in delete:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
