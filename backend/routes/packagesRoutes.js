var express = require('express');
const exe = require('../connection');
var router = express.Router();

// Show all packages
// Show all packages
router.get('/save', async (req, res) => {
  const data = await exe('SELECT * FROM photography_packages');
  res.render('admin/photography_packages.ejs', { packages: data, item: null }); // 🛠️ Fix: pass item
});


// Save new package
router.post('/photography-packages/save', async (req, res) => {
  var { name, price, duration, edited_images, online_gallery, digital_download, print_release, second_photographer, photo_album, is_most_popular } = req.body;
  var sql = `
    INSERT INTO photography_packages 
    (name, price, duration, edited_images, online_gallery, digital_download, print_release, second_photographer, photo_album, is_most_popular)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  await exe(sql, [name, price, duration, edited_images, online_gallery ? 1 : 0, digital_download ? 1 : 0, print_release ? 1 : 0, second_photographer ? 1 : 0, photo_album || null, is_most_popular ? 1 : 0]);
  res.redirect('/admin/save');
});

// Edit view
router.get('/photography-packages/edit/:id', async (req, res) => {
  var id = req.params.id;
  var [item] = await exe('SELECT * FROM photography_packages WHERE id = ?', [id]);
  var data = await exe('SELECT * FROM photography_packages');
  res.render('admin/photography_packages.ejs', { packages: data, item });
});

// Update package
router.post('/update/:id', async (req, res) => {
  var id = req.params.id;
  var { name, price, duration, edited_images, online_gallery, digital_download, print_release, second_photographer, photo_album, is_most_popular } = req.body;
  var sql = `
    UPDATE photography_packages SET 
    name = ?, price = ?, duration = ?, edited_images = ?, 
    online_gallery = ?, digital_download = ?, print_release = ?, 
    second_photographer = ?, photo_album = ?, is_most_popular = ? 
    WHERE id = ?
  `;
  await exe(sql, [name, price, duration, edited_images, online_gallery ? 1 : 0, digital_download ? 1 : 0, print_release ? 1 : 0, second_photographer ? 1 : 0, photo_album || null, is_most_popular ? 1 : 0, id]);
  res.redirect('/admin/save');
});

// Delete package
router.get('/photography-packages/delete/:id', async (req, res) => {
  await exe('DELETE FROM photography_packages WHERE id = ?', [req.params.id]);
  res.redirect('/admin/save');
});

// View all addons
router.get('/addons', async (req, res) => {
  try {
    const sql = 'SELECT * FROM photography_addons ORDER BY id DESC';
    const addons = await exe(sql);
    res.render('admin/addons_crud.ejs', { addons });
  } catch (err) {
    res.send(err);
  }
});

// Show form to add new addon
router.get('/addons/add', (req, res) => {
  res.render('admin/addons_form', { addon: null });
});

// Save new addon
router.post('/addons/save', async (req, res) => {
  const { title, price, description } = req.body;
  const sql = 'INSERT INTO photography_addons (title, price, description) VALUES (?, ?, ?)';
  await exe(sql, [title, price, description]);
  res.redirect('/admin/addons');
});

// Show form to edit addon
router.get('/addons/edit/:id', async (req, res) => {
  const [addon] = await exe('SELECT * FROM photography_addons WHERE id = ?', [req.params.id]);
  res.render('admin/addons_form', { addon });
});

// Update addon
router.post('/addons/update/:id', async (req, res) => {
  const { title, price, description } = req.body;
  const sql = 'UPDATE photography_addons SET title=?, price=?, description=? WHERE id=?';
  await exe(sql, [title, price, description, req.params.id]);
  res.redirect('/admin/addons');
});

// Delete addon
router.get('/addons/delete/:id', async (req, res) => {
  await exe('DELETE FROM photography_addons WHERE id = ?', [req.params.id]);
  res.redirect('/admin/addons');
});


// Show form + list
router.get('/photolist_form', async (req, res) => {
  const faqs = await exe('SELECT * FROM photography_faqs ORDER BY id DESC');
  res.render('admin/photography_faqs_crud', { faq: null, faqs });
});

// Save new FAQ
router.post('/photography-faqs/save', async (req, res) => {
  const { question, answer } = req.body;
  await exe('INSERT INTO photography_faqs (question, answer) VALUES (?, ?)', [question, answer]);
  res.redirect('/admin/photolist_form');
});

// Edit view
router.get('/photography-faqs/edit/:id', async (req, res) => {
  const faqs = await exe('SELECT * FROM photography_faqs ORDER BY id DESC');
  const faqResults = await exe('SELECT * FROM photography_faqs WHERE id = ?', [req.params.id]);
  const faq = faqResults[0];
  res.render('admin/photography_faqs_crud', { faq, faqs });
});

// Update FAQ
router.post('/photography-faqs/update/:id', async (req, res) => {
  const { question, answer } = req.body;
  await exe('UPDATE photography_faqs SET question = ?, answer = ? WHERE id = ?', [question, answer, req.params.id]);
  res.redirect('/admin/photolist_form');
});

// Delete FAQ
router.get('/photography-faqs/delete/:id', async (req, res) => {
  await exe('DELETE FROM photography_faqs WHERE id = ?', [req.params.id]);
  res.redirect('/admin/photolist_form');
});

module.exports = router;
