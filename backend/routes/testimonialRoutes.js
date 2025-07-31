var express = require('express');
var exe = require('../connection');
const path = require('path');
const router = express.Router();



router.get('/add_testimonial',(req,res)=>{
    res.render('admin/testimonial.ejs')
})
router.get('/managePhotographytestimonial',async(req,res)=>{
  var sql = `SELECT * FROM testimonials`;
    var result = await exe (sql)
    var packet = {result}
  res.render('admin/managePhotographytestimonial.ejs',packet)
})
router.post('/save_testimonial', async (req, res) => {
    var d = req.body;
    var imageName = '';

    if (req.files && req.files.testimonial_image) {
        let image = req.files.testimonial_image;
        imageName = Date.now() + '_' + image.name;

        let uploadPath = path.join(__dirname, '../public/images/', imageName);
        await image.mv(uploadPath);
    }

    const sql = `INSERT INTO testimonials (testimonial_image, testimonial_description, client_name, client_category)
                 VALUES (?, ?, ?, ?)`;

    try {
        var result = await exe(sql, [
            imageName,
            d.testimonial_description,
            d.client_name,
            d.client_category
        ]);
        res.redirect('/admin/add_testimonial');
    } catch (err) {
        console.error('DB Insert Error:', err);
        res.status(500).send('Database insert failed.');
    }
});
router.get('/edit_testimonial/:id', async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM testimonials WHERE id = ?`;
  const result = await exe(sql, [id]);

  if (result.length === 0) return res.send('Testimonial not found');

  res.render('admin/edit_testimonial.ejs', { testimonial: result[0] });
});

router.post('/update_testimonials', async (req, res) => {
  const d = req.body;
//   let imageName = d.old_image; // keep old image by default
var imageName = '';
  if (req.files) {
   var imageName = new Date().getTime()+ req.files.testimonial_image.name;
    req.files.testimonial_image.mv('public/images/'+imageName)
  }

  const sql = `UPDATE testimonials SET testimonial_image = ?, testimonial_description = ?, client_name = ?, client_category = ? WHERE id = ?`;
  var result = await exe(sql, [imageName, d.testimonial_description, d.client_name, d.client_category, d.id]);
  // res.send(result)
  res.redirect('/admin/managePhotographytestimonial'); // or wherever your list route is
});
router.get('/delete_testimonial/:id',async(req,res)=>{
  let did = req.params.id;
  var sql = `DELETE FROM testimonials WHERE id = ?`
  var result = await exe(sql,[did])
  res.redirect('/admin/managePhotographytestimonial')
  
})


module.exports = router