var express = require('express');
var path = require('path');
var app = express();
app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));

// 设置handlebars 视图引擎
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//////////////////////////////////////////////静态资源路径设置ks/////////////
app.use(express.static(__dirname + '/public'));
var fortunes = require('./lib/fortune.js');

//////////////////////////////////////////////路由部分ks/////////////////////
app.get('/', function(req, res){
	res.render('home');
});
app.get('/about', function(req, res){
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: fortunes.getFortune() });
});


///////////////////////////////////////////////中间件部分ks////////////////////
// 定制404 页面
app.use(function(req, res){
	/*res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');*/
	res.status(404);
	res.render('404');
});
// 定制500 页面
app.use(function(err, req, res, next){
	/*console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');*/
	res.status(500);
	res.render('500');
});
/*app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});*/



module.exports = app;