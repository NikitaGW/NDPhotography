let express = require('express')

var router = express.Router();

router.get('/',(req,res)=>{
    res.render('home.ejs');
})
router.get('/portfolio',(req,res)=>{
    res.render('portfolio.ejs')
})
router.get('/services',(req,res)=>{
    res.render('services.ejs')
})
router.get('/about',(req,res)=>{
    res.render("about.ejs")
})
router.get('/contact',(req,res)=>{
    res.render('contact.ejs')
})
router.get('/testimonials',(req,res)=>{
    res.render('testimonials.ejs');
})
router.get('/pricing',(req,res)=>{
    res.render('pricing.ejs');
})
module.exports = router;