var express = require('express');
const exe = require('../connection');

var router = express.Router();

router.get('/',async(req,res)=>{
    var sliderdata = `SELECT * FROM sliders`;
    var servicesData = `SELECT * FROM home_services`
    var featured = `SELECT * FROM homefeature`;
    var homeTestimonials = `SELECT * FROM Hometestimonials`;
    var photography_highlightSql = `SELECT * FROM photography_highlights`
    var sliderSql = await exe(sliderdata)
    var featureResult = await exe(featured);
    var servicesSql = await exe(servicesData)
    var homeTestimonialsSql = await exe(homeTestimonials)
    var photography_highlightResult = await exe(photography_highlightSql)
    var homePacket = {sliderSql, featureResult,servicesSql,homeTestimonialsSql,photography_highlightResult}
    res.render('user/home.ejs',homePacket);
})
router.get('/portfolio',async(req,res)=>{
    var category = 5
    var portraitSql = `SELECT * FROM photographyservices WHERE category = ?`
    var portraitsResult = await exe(portraitSql,[category])
    var packet = {portraitsResult}
    res.render('user/portfolio.ejs',packet)
})
router.get('/booking',(req,res)=>{
    res.render('user/booking.ejs')
})
router.post("/save_booking", async (req, res) => {
    var d = req.body;

    var sql = `INSERT INTO bookings (full_name, email, phone, photography_type, location, preferred_date, preferred_slot, message) 
               VALUES (?,?,?,?,?,?,?,?)`;

    var data = await exe(sql, [
        d.full_name,
        d.email,
        d.phone,
        d.photography_type,
        d.location,
        d.preferred_date,
        d.preferred_slot,
        d.message || null  
    ]);

    res.redirect("/booking"); 
});

router.get('/services',async(req,res)=>{
    var serviceSql = `SELECT * FROM photographyservices`;
    var servicesResult = await exe(serviceSql);
    var servicePacket = {servicesResult}
    res.render('user/services.ejs',servicePacket)
})
router.get('/event',async(req,res)=>{
    var event = 6
    var eventSql = `SELECT * FROM photographyservices WHERE category = ?`
    var eventResult = await exe(eventSql,[event])
    var eventPacket = {eventResult}

    res.render('user/event.ejs',eventPacket)
})
router.get('/about',async(req,res)=>{
    var aboutSql = `SELECT * FROM about_banner`;
    var aboutResult = await exe(aboutSql);
    var aboutPacket = {aboutResult}
    res.render("user/about.ejs",aboutPacket)
    
})
router.get('/contact',(req,res)=>{
    res.render('user/contact.ejs')
})
router.post('/save_enquiry', async (req, res) => {
    let d = req.body;

    let sql = `INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)`;
    await exe(sql, [d.name, d.email, d.phone, d.message]);

    res.redirect('/contact'); 
});
router.get('/testimonials',async(req,res)=>{
    var sql =`SELECT * FROM testimonials`;
    var result =  await exe(sql)
    var packet = {result}
    res.render('user/testimonials.ejs',packet);
})
router.get('/pricing', async (req, res) => {
  try {
    const sql = 'SELECT * FROM photography_packages';
    let addons = `SELECT * FROM photography_addons`;
    let faq = `SELECT * FROM photography_faqs`;
    let faqResult = await exe(faq)
    let result = await exe(sql);
    let addonsResult = await exe(addons)

    // Transform features dynamically
    const packages = result.map(pkg => ({
      ...pkg,
      features: [
        { text: `${pkg.duration} of coverage`, disabled: false },
        { text: `${pkg.edited_images} edited images`, disabled: false },
        { text: 'Online gallery', disabled: !pkg.online_gallery },
        { text: 'Digital download', disabled: !pkg.digital_download },
        { text: 'Print release', disabled: !pkg.print_release },
        { text: 'Second photographer', disabled: !pkg.second_photographer },
        { text: pkg.photo_album || 'Photo album', disabled: !pkg.photo_album }
      ]
    }));

    // ✅ Pass 'packages' to the EJS
    res.render('user/pricing', { packages,addonsResult,faqResult });

  } catch (err) {
    console.error('Error fetching packages:', err);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/serviceswedding',async(req,res)=>{
    var category = 5
    var ServicesSql = `SELECT * FROM photographyservices WHERE category = ?`
    var ServicesResult = await exe(ServicesSql,[category])
    var ServicesPacket = {ServicesResult}
    res.render('user/servicesWedding.ejs',ServicesPacket)
})
router.get('/portraitservices',async(req,res)=>{
    var portrait = 7
    var portraitSql = `SELECT * FROM photographyservices WHERE category = ?`
    var portraitResult = await exe(portraitSql,[portrait])
    var portraitPacket = {portraitResult}
    res.render('user/portraitservices.ejs',portraitPacket)
})
router.get('/commercialservices',async(req,res)=>{
    var commercial = 9
    var commercialSql = `SELECT * FROM photographyservices WHERE category = ?`
    var commercialResult = await exe(commercialSql,[commercial])
    var commercialPacket = {commercialResult}
    res.render('user/commercialservices.ejs',commercialPacket);
})




module.exports = router;