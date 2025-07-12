let express = require('express');
let user_route = require('./routes/user_routes');

let app = express()
app.use(express.static('public'));


app.use('/',user_route);

app.listen(1000)