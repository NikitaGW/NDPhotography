let express = require('express');
const exe = require('../connection');
const { route } = require('./user_routes');
var router = express.Router();

// slider
router.get('/add_slider', async (req, res) => {
    let sliderdata = `SELECT * FROM sliders`;
    let sliderResult = await exe(sliderdata)
    let sliderPacket = { sliderResult }
    res.render('admin/add_slider.ejs', sliderPacket)
})

router.get('/update_slider', async (req, res) => {
    let sliderSql = `SELECT * FROM sliders`;
    let sliderResult = await exe(sliderSql);
    res.render('admin/edit_slider.ejs', { sliderResult })
})
router.post("/save_slider", async (req, res) => {
    let d = req.body;

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

router.get('/add_featured', async (req, res) => {
    let featureSql = `SELECT * FROM homefeature`;
    let featureResult = await exe(featureSql);
    res.render('admin/add_featured_work.ejs', { featureResult });
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

router.get('/home_services', async (req, res) => {
    let showHomeServices = `SELECT * FROM home_services`;
    let showResult = await exe(showHomeServices)
    let showPacket = { showResult }
    res.render('admin/homeServices.ejs', showPacket)
})
router.post('/save_home_service', async (req, res) => {
    let d = req.body;
    var icon_paths = ''
    if (req.files) {
        var icon_paths = new Date().getTime() + req.files.icon_path.name;
        req.files.icon_path.mv("public/images/" + icon_paths)
    }
    let homeServicesSql = ` INSERT INTO home_services (category, description, icon_path)
VALUES (?,?,?)`
    let value = [d.category, d.description, icon_paths]

    let homeServicesResult = await exe(homeServicesSql, value)

    res.redirect('/admin/home_services')
})
router.get('/edit_services/:id',async(req,res)=>{
    let eid = req.params.id;
    let editHomeServices = `SELECT * FROM home_services WHERE id = ?`;
    let editHomeServicesResult = await exe (editHomeServices,[eid])
    let editHomeServicesPakcet = {editHomeServicesResult}
    res.render('admin/updateHomeServices.ejs',editHomeServicesPakcet)
})
router.post('/update_home_service', async (req, res) => {
    let d = req.body;
    let icon_paths = d.old_icon_path;

    // If a new icon is uploaded
    if (req.files && req.files.icon_path) {
        icon_paths = new Date().getTime() + req.files.icon_path.name;
        await req.files.icon_path.mv("public/images/" + icon_paths);
    }

    let updateHomeServicesSql = `UPDATE home_services 
                                 SET category = ?, description = ?, icon_path = ? 
                                 WHERE id = ?`;
    let value = [d.category, d.description, icon_paths, d.id];

    await exe(updateHomeServicesSql, value);

    res.redirect('/admin/home_services'); // ✅ Final response
});
router.get('/delete_services/:id',async(req,res)=>{
    let did = req.params.id;
    let deleteHomeServices = `DELETE FROM home_services WHERE id = ?`
    let deleteHomeServicesResult = await exe(deleteHomeServices,[did])
    res.redirect('/admin/home_services')
})
router.get('/home_testimonials',async(req,res)=>{
    let homeTestimonials = `SELECT * FROM Hometestimonials`
    let homeTestimonialsResult = await exe(homeTestimonials)
    let HometestimonialsPacket = {homeTestimonialsResult}
    res.render('admin/homeTestimonials.ejs',HometestimonialsPacket)
})
router.post('/save_home_testimonial', async (req, res) => {
    let d = req.body;
    let insertSql = `
        INSERT INTO Hometestimonials (name, category, description, status)
        VALUES (?, ?, ?, ?)
    `;
    let values = [d.name, d.category, d.description, d.status || 'active'];
    await exe(insertSql, values);

    res.redirect('/admin/home_testimonials');
});
router.get('/edit_home_testimonial/:id', async (req, res) => {
    let id = req.params.id;
    let selectSql = `SELECT * FROM Hometestimonials WHERE id = ?`;
    let result = await exe(selectSql, [id]);

    if (result.length > 0) {
        res.render('admin/updateHomeTestimonial.ejs', { testimonial: result[0] });
    } else {
        res.send('Testimonial not found.');
    }
});
router.post('/update_home_testimonial', async (req, res) => {
    let d = req.body;
    let updateSql = `
        UPDATE Hometestimonials 
        SET name = ?, category = ?, description = ? 
        WHERE id = ?
    `;
    let values = [d.name, d.category, d.description, d.id];
    await exe(updateSql, values);

    res.redirect('/admin/home_testimonials');
});
router.get('/delete_home_testimonial/:id', async (req, res) => {
    let id = req.params.id;

    try {
        await exe('DELETE FROM Hometestimonials WHERE id = ?', [id]);
        res.redirect('/admin/home_testimonials');
    } catch (err) {
        console.error("Delete error:", err);
        res.send("Error deleting testimonial");
    }
});
router.get('/PhotographerStory',async(req,res)=>{
    var sql = `SELECT * FROM photography_highlights`
    var result = await exe(sql)
    var packet = {result}
    res.render('admin/photographyHighlights.ejs',packet)
})
router.post('/update_result/:id', async (req, res) => {
  const id = req.params.id;
  const { title, description, style, experience, categories } = req.body;
  let image = req.files?.image?.name || null;

  if (image) {
    await req.files.image.mv('./public/images/' + image);
  }

  const sql = `
    UPDATE photography_highlights 
    SET title = ?, description = ?, style = ?, experience = ?, categories = ?, image = COALESCE(?, image)
    WHERE id = ?
  `;

  try {
    await exe(sql, [title, description, style, experience, categories, image, id]);
    res.redirect('/admin/PhotographerStory');
  } catch (err) {
    console.error(err);
    res.send("Update failed");
  }
});
router.get('/manage_booking', async (req, res) => {
  try {
    const sql = 'SELECT * FROM bookings ORDER BY id DESC';
    const result = await exe(sql); 
    console.log("📦 Inquiries fetched:", result); // DEBUG LOG
    res.render('admin/Bookings.ejs', { inquiries: result });
  } catch (err) {
    console.error('❌ Error fetching inquiries:', err.message);
    res.status(500).send('Internal Server Error');
  }
});





module.exports = router;