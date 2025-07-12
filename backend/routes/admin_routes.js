let express = require('express')
// var exe = require('./../connection');

var router = express.Router();

router.get('/admin',function(req,res){
    res.render('admin/home.ejs');
});

module.exports = router;
