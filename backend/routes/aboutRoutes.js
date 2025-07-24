let express = require('express');
const exe = require('../connection');
var router = express.Router();


// router.get('/about_banner_form', (req, res) => {
//   res.render('admin/about_banner_form.ejs');
// });


router.get('/about_banner_form', async (req, res) => {
//   Fetch banner data from DB (example)
//   let sql = 'SELECT * FROM about_banner';
//   let result = await exe(sql);
  res.render('admin/about_banner_form.ejs');
});
router.get('/update_about', async (req, res) => {
    
    res.render('admin/edit_about_banner.ejs');
});   
router.post("/save_about", async (req, res) => {
  res.send(req.body);
})




module.exports = router;