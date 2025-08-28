let express = require('express');
const exe = require('../connection');
const { render } = require('ejs');
var router = express.Router();


router.get('/about_banner_form', (req, res) => {
  res.render('admin/about_banner_form.ejs');
});



// ------------------------
// router.post('/save_about', async (req, res) => 
// {
//     let d = req.body;
//     let image = '';

//     // Handle file upload if image is provided
//     if (req.files && req.files.image) {
//       let image = new Date().getTime() + req.files.background_image.name;
//       await req.files.background_image.mv('public/images/' + image);
//     }

//     // Insert query for about_banner table
//     let sql = `INSERT INTO about_banner (title, subtitle, background_image) VALUES (?, ?, ?)`;
//     let values = [
//       d.title,
//       d.subtitle,
//       image
//     ];

//     var result = await exe(sql, values);
//     res.send(result)

//     // res.redirect('/admin/about_banner_form');
  
// });
router.post('/save_about', async (req, res) => {
  try {
    const d = req.body;
    let image = ''; // Don't redeclare

    // Check file exists and handle upload
    if (req.files && req.files.background_image) {
      image = Date.now().getTime + '_' + req.files.background_image.name;
      const uploadPath = 'public/images/' + image;

      await req.files.background_image.mv(uploadPath); // await is important!
    }

    // Insert query
    const sql = 'INSERT INTO about_banner (title, subtitle, background_image) VALUES (?,?,?)';
    const values = [d.title, d.subtitle, image];
    const result = await exe(sql, values);

    console.log('Uploaded Image:', image);
    // res.send(result); 
    res.redirect('/admin/about_banner_form');
// or res.redirect(...)
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).send('Server error');
  }
});

// router.get('/update_about', async (req, res) => {
//   try {
//     // Fetch the latest about_banner row (assuming only one, or the latest)
//     const sql = 'SELECT * FROM about_banner ORDER BY id DESC LIMIT 1';
//     const resultArr = await exe(sql);

//     let result = resultArr && resultArr.length > 0 ? resultArr[0] : {};

//     res.render('admin/edit_about_banner.ejs', { result });
//   } catch (err) {
//     console.error('Fetch About Banner Error:', err);
//     res.status(500).send('Server error');
//   }
// });
 
router.get("/edit_about_banner", async (req, res) => {
  const sql = `SELECT * FROM about_banner `;
  var banners = await exe(sql);
  var packet = {banners};
  res.render('admin/edit_about_banner.ejs',packet);
});

router.get("/update_about_banner/:id", async (req, res) => {
  const sql = `SELECT * FROM about_banner WHERE id = ?`;
  const result = await exe(sql, [req.params.id]);
  res.render('admin/update_about_banner.ejs', { result });
});

// router.post("/save_about", async (req, res) => {
//   const d = req.body;
//   const sql = `UPDATE about_banner SET title = ?, subtitle = ?, background_image = ? WHERE id = ?`;
//   const values = [d.title, d.subtitle, d.background_image, d.id];
//   const result = await exe(sql, values);
//   res.send(result);
//   // res.redirect('/admin/edit_about_banner');
// });


// router.post("/save_about", async (req, res) => {
//   try {
//     const d = req.body;
//     let image = d.old_image; // fallback if no new image uploaded

//     // Handle image upload
//     if (req.files && req.files.background_image) {
//       image = new Date().getTime() + "_" + req.files.background_image.name;
//       req.files.background_image.mv("public/images/" + image);
//     }

//     // Prepare SQL
//     const sql = "UPDATE about_banner SET title = ?, subtitle = ?, background_image = ? WHERE id = ?";
//     const values = [d.title, d.subtitle, image, d.id];

//     const result = await exe(sql, values);
//     res.send(result);
//     // res.redirect("/admin/edit_about_banner");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// });
router.post("/save_about", async (req, res) => {
  try {
    const d = req.body;
    let image = d.existing_background_image || '';

    // New image uploaded
    if (req.files && req.files.background_image) {
      image = new Date().getTime() + "_" + req.files.background_image.name;
      await req.files.background_image.mv("public/images/" + image);
    }

    let sql, values;

    if (d.id) {
      // UPDATE existing row
      sql = "UPDATE about_banner SET title = ?, subtitle = ?, background_image = ? WHERE id = ?";
      values = [d.title, d.subtitle, image, d.id];
    } else {
      // INSERT new row
      sql = "INSERT INTO about_banner (title, subtitle, background_image) VALUES (?, ?, ?)";
      values = [d.title, d.subtitle, image];
    }

    await exe(sql, values);
    res.redirect("/admin/edit_about_banner");
  } catch (err) {
    console.error("Error saving About Banner:", err);
    res.status(500).send("Server Error");
  }
});

  
  


router.get("/add_photographer",async(req,res)=>{

  let photographerdata = `SELECT * FROM photographers`;
  let photographerResult = await exe(photographerdata);
  let photographerPacket = { photographerResult };
  res.render("admin/add_photographer.ejs", photographerPacket);
})



module.exports = router;