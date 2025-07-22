let mysql = require('mysql');
let util = require('util')


let conn = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'',
    database:"ndphotography"
})
let exe = util.promisify(conn.query).bind(conn)


module.exports = exe;

