let express = require('express')
var exe = require('./../connection');


var router = express.Router();
router.get('/',(req,res)=>{
    res.render('admin/login.ejs')
})
let verify = (req,res,next)=>{
    if (req.session.logInId  == undefined)
    {
       return res.redirect('/admin')
    }
    else
    {
        next()
    }
     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
}
router.post('/login_process',async(req,res)=>{
    let d = req.body;
    let loginuser = `SELECT * FROM admin_login WHERE admin_email = ? && admin_pass = ?`
    let loginUserValue = [d.username,d.password]
    let loginexe = await exe(loginuser,loginUserValue)
    if(loginexe.length > 0)
    {
        let logindata = loginexe[0];
        req.session.logInId = logindata.admin_login_id;
        res.redirect('/admin/dashboard')
    }
    else
    {
        res.send('login failed');
    }
})
router.get('/dashboard',verify,function(req,res){
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

module.exports = router;
