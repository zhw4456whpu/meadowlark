var express = require('express');
var app = express();
app.use(require('body-parser')());

app.get('/newsletter',function(req,res){
	//CSRF提供一个虚拟值
	res.render('newsletter',{csrf:'CSRF token goes here'});
});

app.post('/process',function(req,res){
	console.log('Form(from querystring):'+req.query.form);
	console.log('CSRF token(from hidden form field):'+req.body._csrf);
	console.log('Name(from visible form field):'+req.body.name);
	console.log('Email(from visible form field):'+req.query.email);
	res.redirect(303,'/thank-you');
});

module.exports = app;