let express = require('express');
const exe = require('../connection');
var router = express.Router();

// slider
router.get('/add_slider',async(req,res)=>{
    let sliderdata = `SELECT * FROM sliders`;
    let sliderResult = await exe(sliderdata)
    let sliderPacket = {sliderResult}
    res.render('admin/add_slider.ejs',sliderPacket)
})


router.get('/update_slider',async (req,res)=>{
    let sliderSql = `SELECT * FROM sliders`;
    let sliderResult =await exe(sliderSql);
    res.render('admin/edit_slider.ejs',{sliderResult})
})
router.post("/save_slider", async (req, res) => {
    let d =  req.body;

    let image1 = '';
    let image2 = '';
    let image3 = '';
    let image4 = '';
    if (req.files) {
        if (req.files.image1) {
            image1 = new Date().getTime() + req.files.image1.name;
            req.files.image1.mv('public/images/' + image1);
        }
        if (req.files.image2) {
            image2 = new Date().getTime() + req.files.image2.name;
            req.files.image2.mv('public/images/' + image2);
        }
        if (req.files.image3) {
            image3 = new Date().getTime() + req.files.image3.name;
            req.files.image3.mv('public/images/' + image3);
        }
        if (req.files.image4) {
            image4 = new Date().getTime() + req.files.image4.name;
            req.files.image4.mv('public/images/' + image4);
        }
    }

    const sql = `
      UPDATE sliders SET
      heading = ?, description = ?, image1 = ?, image2 = ?, image3 = ?, image4 = ?, button1_text = ?, button1_link = ?, button2_text = ?, button2_link = ?
      WHERE slider_id = ?

    `;

    const values = [
      d.heading,
      d.description,
      image1,
      image2,
      image3,
      image4,
      d.button1_text,
      d.button1_link,
      d.button2_text,
      d.button2_link,
      d.slider_id
    ];

    await exe(sql, values); // assuming your db returns a Promise
    res.redirect("/admin/add_slider"); 
});





// slider

router.get('/add_featured',async(req,res)=>{
    let featureSql = `SELECT * FROM homefeature`;
    let featureResult = await exe(featureSql);
    res.render('admin/add_featured_work.ejs',{featureResult});
})

router.post('/save_feature', async (req, res) => {
    let d = req.body;
    let image = '';

    if (req.files && req.files.featured_image) {
        image = Date.now() + '_' + req.files.featured_image.name;
        await req.files.featured_image.mv('public/images/' + image);
    }

    const sql = `
      INSERT INTO homeFeature (feature_heading, feature_subheading, featured_image)
      VALUES (?, ?, ?)
    `;
    const values = [d.feature_heading, d.feature_subheading, image];

    await exe(sql, values);
    res.redirect('/admin/add_featured'); // or wherever you want
});
router.get('/delete_feature/:id', async (req, res) => {
    let did = req.params.id;
    let deleteSql = `DELETE FROM homeFeature WHERE feature_id = ?`;
    await exe(deleteSql, [did]);
    res.redirect('/admin/add_featured');
});
router.get('/edit_feature/:id', async (req, res) => {
    let did = req.params.id;
    let editSql = `SELECT * FROM homeFeature WHERE feature_id = ?`;
    let editResult = await exe(editSql, [did]);
    res.render('admin/edit_featured.ejs', { editResult });
});
router.post('/update_feature', async (req, res) => {
    let d = req.body;
    let image = d.old_image;

    if (req.files && req.files.featured_image) {
        image = Date.now() + '_' + req.files.featured_image.name;
        await req.files.featured_image.mv('public/images/' + image);
    }

    const sql = `
      UPDATE homeFeature SET
      feature_heading = ?, feature_subheading = ?, featured_image = ?
      WHERE feature_id = ?
    `;
    const values = [d.feature_heading, d.feature_subheading, image, d.feature_id];

    await exe(sql, values);
    res.redirect('/admin/add_featured'); // or wherever you want
});



module.exports = router;