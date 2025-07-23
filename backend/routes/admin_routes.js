let express = require('express')
var exe = require('./../connection');


var router = express.Router();
router.get('/',(req,res)=>{
    res.render('admin/login.ejs')
})
// let verify = (req,res,next)=>{
//     if (req.session.logInId  == undefined)
//     {
//        return res.redirect('/admin')
//     }
//     else
//     {
//         next()
//     }
//      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//     res.setHeader('Pragma', 'no-cache');
//     res.setHeader('Expires', '0');
// }
// router.post('/login_process',async(req,res)=>{
//     let d = req.body;
//     let loginuser = `SELECT * FROM admin_login WHERE admin_email = ? && admin_pass = ?`
//     let loginUserValue = [d.username,d.password]
//     let loginexe = await exe(loginuser,loginUserValue)
//     if(loginexe.length > 0)
//     {
//         let logindata = loginexe[0];
//         req.session.logInId = logindata.admin_login_id;
//         res.redirect('/admin/dashboard')
//     }
//     else
//     {
//         res.send('login failed');
//     }
// })
router.get('/dashboard',function(req,res){
    res.render('admin/home.ejs'); 
});
router.get('/logout',(req,res)=>{
   req.session.destroy(err => {
        if (err) {
            return res.send('Logout failed');
        }
        res.redirect('/admin');
    });
})

router.get('/add_slider',async(req,res)=>{
    let sliderdata = `SELECT * FROM sliders`;
    let sliderResult = await exe(sliderdata)
    let sliderPacket = {sliderResult}
    res.render('admin/add_slider.ejs',sliderPacket)
})


router.get('/update',async (req,res)=>{
    let sliderSql = `SELECT * FROM sliders`;
    let sliderResult =await exe(sliderSql);
    res.render('admin/edit_slider.ejs',{sliderResult})
})
router.post("/update_slider", async (req, res) => {
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
router.get('/add_featured',async(req,res)=>{
    
    // let sliderPacket = {sliderResult}
    res.render('admin/add_featured_work.ejs');
})
router.post('/update_feature', async (req, res) => {
    let d = req.body;

    let image = d.old_image || ''; // fallback to old image

    if (req.files && req.files.featured_image) {
        image = Date.now() + '_' + req.files.featured_image.name;
        await req.files.featured_image.mv('public/images/' + image);
    }

    const sql = `
      UPDATE homeFeature 
      SET 
        feature_heading = ?, 
        feature_subheading = ?, 
        featured_image = ?
      WHERE feature_id = ?
    `;
    const values = [d.feature_heading, d.feature_subheading, image, d.feature_id];

    await exe(sql, values);
    res.redirect('/admin/add_feature');
});




module.exports = router;
