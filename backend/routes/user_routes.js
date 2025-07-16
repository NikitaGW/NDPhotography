let express = require('express');
// var exe = require('./../connection');

var router = express.Router();

router.get('/',(req,res)=>{
    res.render('user/home.ejs');
})
router.get('/portfolio',(req,res)=>{
    res.render('user/portfolio.ejs')
})
router.get('/services',(req,res)=>{
    res.render('user/services.ejs')
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