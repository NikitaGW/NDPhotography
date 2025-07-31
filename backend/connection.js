let mysql = require('mysql');
let util = require('util')


let conn = mysql.createConnection({
    host:"bpaz9xm6nviszsaz40rv-mysql.services.clever-cloud.com",
    user:'uetmszyap3qud2ph',
    password:'i5bxkWogV6H8hiwomuR3',
    database:'bpaz9xm6nviszsaz40rv'
    // host:'localhost',
    // user:"root",
    // password:"",
    // database:'temp'
})
let exe = util.promisify(conn.query).bind(conn)


module.exports = exe;

