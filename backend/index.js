let express = require('express');
let bodyparser = require('body-parser')
let user_route = require('./routes/user_routes');
let session = require('express-session')

var admin_route = require('./routes/admin_routes');


let app = express()
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'sdlkfowir2938493'
}))
app.use(express.static('public/'));
app.use(bodyparser.urlencoded({extended:true}))


app.use('/',user_route);
app.use('/admin',admin_route);
app.listen(1000)