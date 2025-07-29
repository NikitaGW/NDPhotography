let express = require('express');
const exe = require('../connection');

var router = express.Router();

router.get('/',async(req,res)=>{
    let sliderdata = `SELECT * FROM sliders`;
    let servicesData = `SELECT * FROM home_services`
    let featured = `SELECT * FROM homefeature`;
    let homeTestimonials = `SELECT * FROM Hometestimonials`;
    var photography_highlightSql = `SELECT * FROM photography_highlights`
    let sliderSql = await exe(sliderdata)
    let featureResult = await exe(featured);
    let servicesSql = await exe(servicesData)
    let homeTestimonialsSql = await exe(homeTestimonials)
    var photography_highlightResult = await exe(photography_highlightSql)
    let homePacket = {sliderSql, featureResult,servicesSql,homeTestimonialsSql,photography_highlightResult}
    res.render('user/home.ejs',homePacket);
})
router.get('/portfolio',(req,res)=>{
    res.render('user/portfolio.ejs')
})
router.get('/services',async(req,res)=>{
    var serviceSql = `SELECT * FROM photographyservices`;
    var servicesResult = await exe(serviceSql);
    var servicePacket = {servicesResult}
    res.render('user/services.ejs',servicePacket)
})
router.get('/event',async(req,res)=>{
    let event = 6
    var eventSql = `SELECT * FROM photographyservices WHERE category = ?`
    var eventResult = await exe(eventSql,[event])
    var eventPacket = {eventResult}

    res.render('user/event.ejs',eventPacket)
})
router.get('/about',(req,res)=>{
    res.render("user/about.ejs")
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
router.get('/serviceswedding',async(req,res)=>{
    let category = 5
    var ServicesSql = `SELECT * FROM photographyservices WHERE category = ?`
    var ServicesResult = await exe(ServicesSql,[category])
    var ServicesPacket = {ServicesResult}
    res.render('user/servicesWedding.ejs',ServicesPacket)
})
router.get('/portraitservices',async(req,res)=>{
    let portrait = 7
    var portraitSql = `SELECT * FROM photographyservices WHERE category = ?`
    var portraitResult = await exe(portraitSql,[portrait])
    var portraitPacket = {portraitResult}
    res.render('user/portraitservices.ejs',portraitPacket)
})
router.get('/commercialservices',async(req,res)=>{
    let commercial = 9
    var commercialSql = `SELECT * FROM photographyservices WHERE category = ?`
    var commercialResult = await exe(commercialSql,[commercial])
    var commercialPacket = {commercialResult}
    res.render('user/commercialservices.ejs',commercialPacket);
})
router.get('/blog',(req,res)=>{
    res.render('user/blog.ejs')
})
module.exports = router;