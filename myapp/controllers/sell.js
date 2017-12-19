var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var sell = require('../models/sell');
var db = require('../helpers/db')

router.get('/', function(req, res) {
     if(req.isAuthenticated()) {
	res.render('sell');
	}
else{
res.redirect('https://sfsuse.com/fa17g02/login');
}
});

//router.get('/', ensureAuthenticated, function (req, res) {
//    res.render('sell');
//});

//function ensureAuthenticated(req, res, next){
//	if(req.isAuthenticated()){
//	res.render('sell');
//		 next();
//	} else {
//		res.redirect('/fa17g02/login');
//	}
//}

router.post('/', function (req, res) {
	var form = new formidable.IncomingForm();
    	form.parse(req, function (err, fields, files) {
	//res.send(fields.address + ',' + fields.city + ',' + fields.state + ',' + fields.zip + ',' + files.filetoupload.name + ',' + files.filetoupload.path);
	var oldpath = files.filetoupload.path;
	var newpath = "public/images/" + files.filetoupload.name;
	fs.rename(oldpath, newpath, function (err) {
        	if (err) throw err;
      	});
	//sell.postListings(fields.price, function(err, data){
	sell.postListings(fields.address, fields.city, fields.state, fields.zip, files.filetoupload.name,fields.price , fields.bedrooms, fields.bathrooms, function (err, data) {
        if (err) {
            data = [];
        }
        //res.json("Upload Success")
	res.redirect("/fa17g02/")
	});	
});
});
module.exports = router;
