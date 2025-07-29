var express = require('express');
var exe = require('../connection');
var { route } = require('./homeRoutes');
var router = express.Router();


router.get('/addPhotographyservices', async (req, res) => {
    var sql = `
      SELECT ps.*, c.category_name 
      FROM photographyservices ps
      JOIN category c ON ps.category = c.category_id
    `;
    var category = `SELECT * FROM category`;
    var result = await exe(sql);
    var categoryResult = await exe(category);
    var packet = { result, categoryResult };
    res.render('admin/photographyservices.ejs', packet);
});

router.post('/updateCategory',async(req,res)=>{
    let d = req.body
    var sql = `UPDATE category SET category_name = ? WHERE category_id = ?`;
    var result = await exe(sql,[d.category_name,d.category_id])
    res.redirect('/admin/addPhotographyservices')
})
router.post('/saveCategory',async(req,res)=>{
    let d = req.body
    var sql = `INSERT INTO category(category_name)
    VALUES
    (?)`
    var result = await exe(sql,[d.categoryName])
    res.redirect('/admin/addPhotographyservices')
})
router.get('/deleteCategory/:id',async(req,res)=>{
    var did = req.params.id;
    var sql = `DELETE FROM category WHERE category_id = ?`
    var result = await exe(sql,[did])
    res.redirect('/admin/addPhotographyservices')
})
const path = require('path');
const db = require('../connection'); // adjust this based on your DB config

router.post('/saveServices', async (req, res) => {
    const d = req.body;

    var imageName = ''
    if (req.files) {
        var imageName = new Date().getTime()+ req.files.image.name;
        req.files.image.mv('public/images/'+imageName)
    }
    var sql = `INSERT INTO photographyservices (title, event_date, description, image_path, category) 
                 VALUES (?, ?, ?, ?, ?)`;

    let result = await exe(sql, [d.title, d.event_date, d.description, imageName, d.category]);
    res.redirect('/admin/addPhotographyservices')
});
router.get('/editServices/:id',async (req, res) => {
    let eid = req.params.id;
    var sql = `SELECT * FROM photographyservices WHERE id = ?`
    var sql2 = `SELECT * FROM category`;
    var result2 = await exe(sql2)
    var result = await exe(sql,[eid])
    var packet = {result,result2}
    // res.send(packet)
    res.render('admin/editPhotoServices.ejs',packet);
});
router.post('/updateServices', async (req, res) => {
    let d = req.body;
console.log(req.body.category)

    let oldImageQuery = await exe("SELECT image_path FROM photographyservices WHERE id = ?", [d.u_id]);
    let oldImagePath = oldImageQuery.length > 0 ? oldImageQuery[0].image_path : "";

    
    let image = oldImagePath; 
    if (req.files && req.files.u_image) {
        image = new Date().getTime() + "_" + req.files.u_image.name;
        await req.files.u_image.mv("public/images/" + image);
    }


    let sql = `
        UPDATE photographyservices SET
            title = ?,
            event_date = ?,
            description = ?,
            image_path = ?,
            category = ?
        WHERE id = ?
    `;
    let values = [
        d.u_title,
        d.u_event_date,
        d.u_description,
        image,
        d.category,
        d.u_id
    ];

    // Execute update
    await exe(sql, values);

    res.redirect('/admin/managePhotographyservices');
});
router.get('/deleteServices/:id',async(req,res)=>{
    let did = req.params.id;
    var sql = `DELETE FROM photographyservices WHERE id = ?`
    var result = await exe(sql,[did])
    res.redirect('/admin/managePhotographyservices');
})
router.get('/managePhotographyservices',async(req,res)=>{
    var sql = `
      SELECT ps.*, c.category_name 
      FROM photographyservices ps
      JOIN category c ON ps.category = c.category_id
    `;
    var result = await exe(sql);
    var packet = { result };
    res.render('admin/managePhotographyservices.ejs',packet)
})

module.exports= router;