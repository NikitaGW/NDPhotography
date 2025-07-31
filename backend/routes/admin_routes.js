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
    let sql = `SELECT * FROM admin_login WHERE email = ? && password = ?`;
    let loginexe = await exe(sql, [d.email,d.password])
    if(loginexe.length > 0)
    {
        let logindata = loginexe[0];
        req.session.logInId = logindata.id;
        res.redirect('/admin/dashboard')
    }
    else
    {
        res.send('login failed');
    }
})
router.get('/dashboard', verify,async function(req,res){
    let booking_data = await exe(`SELECT count(*) as total_bookings FROM bookings`);
    let enquiry_data = await exe(`SELECT count(*) as total_enquiries FROM messages WHERE DATE(created_at) = CURDATE() `);
    res.render('admin/home.ejs',{booking_data, enquiry_data}); 
    // res.send(data);
});
router.get('/logout',(req,res)=>{
   req.session.destroy(err => {
        if (err) {
            return res.send('Logout failed');
        }
        res.redirect('/admin');
    });
});


router.get('/admin/about_banner_form', (req, res) => {
  res.render('admin/about_banner_form.ejs'); // Make sure the filename matches exactly
});


module.exports = router;

