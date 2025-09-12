let express = require('express');
let bodyparser = require('body-parser')
let user_route = require('./routes/user_routes');
let session = require('express-session')
let fileUpload = require('express-fileupload');
var admin_route = require('./routes/admin_routes');
let homeRoutes = require('./routes/homeRoutes');
let aboutRoutes = require('./routes/aboutRoutes');
let servicesRouter = require('./routes/servicesRoutes');
const testimonialRouter = require('./routes/testimonialRoutes');
const PackagesRouter = require('./routes/packagesRoutes');



let app = express()
app.use(fileUpload())
app.use(express.static('public/'))
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'sdlkfowir2938493'
}))
app.use(express.static('public/'));
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine', 'ejs');

app.use('/',user_route);
app.use('/admin',admin_route);
app.use('/admin',homeRoutes);
app.use('/admin',aboutRoutes);
app.use('/admin',servicesRouter)
app.use('/admin',testimonialRouter)
app.use('/admin', PackagesRouter);



app.listen(1000)

