let express = require('express');
const exe = require('../connection');

var router = express.Router();

router.get('/',async(req,res)=>{
    let sliderdata = `SELECT * FROM sliders`;
    let servicesData = `SELECT * FROM home_services`
    let featured = `SELECT * FROM homefeature`;
    let homeTestimonials = `SELECT * FROM Hometestimonials`
    let sliderSql = await exe(sliderdata)
    let featureResult = await exe(featured);
    let servicesSql = await exe(servicesData)
    let homeTestimonialsSql = await exe(homeTestimonials)
    let homePacket = {sliderSql, featureResult,servicesSql,homeTestimonialsSql}
    res.render('user/home.ejs',homePacket);
})
router.get('/portfolio',(req,res)=>{
    res.render('user/portfolio.ejs')
})
router.get('/services',(req,res)=>{
    res.render('user/services.ejs')
})
router.get('/about',async(req,res)=>{
    let aboutSql = `SELECT * FROM about_banner`;
    let aboutResult = await exe(aboutSql);
    let aboutPacket = {aboutResult}
    res.render("user/about.ejs",aboutPacket)
    
})
router.get('/contact',(req,res)=>{
    res.render('user/contact.ejs')
})
router.get('/testimonials',(req,res)=>{
    res.render('user/testimonials.ejs');
})
router.get('/pricing',(req,res)=>{
    res.render('user/pricing.ejs');
})
router.get('/serviceswedding',(req,res)=>{
    res.render('user/servicesWedding.ejs')
})
router.get('/portraitservices',(req,res)=>{
    res.render('user/portraitservices.ejs')
})
router.get('/commercialservices',(req,res)=>{
    res.render('user/commercialservices.ejs');
})
router.get('/blog',(req,res)=>{
    res.render('user/blog.ejs')
})
module.exports = router;