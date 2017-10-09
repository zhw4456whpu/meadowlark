var express = require('express');
var path = require('path');
var app = express();
app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));

// 设置handlebars 视图引擎
//var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
var handlebars = require('express3-handlebars').create({
	defaultLayout:'main',
	helpers: {
		section: function(name, options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//////////////////////////////////////////////静态资源路径设置ks，放在所有路由之前/////////////
app.use(express.static(__dirname + '/public'));
var fortunes = require('./lib/fortune.js');

//////////////////////////////////////////////页面测试开关，放在所有路由之前//////////////////
app.use(function(req,res,next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});
//////////////////////////////////////////////路由部分ks/////////////////////////////////////
app.get('/', function(req, res){
	res.render('home');
});
app.get('/about', function(req, res){
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: fortunes.getFortune(),pageTestScript:'/qa/tests-about.js' });
});
app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

app.get('/clienttemplate',function(req,res){
	res.render('clienttemplate')
})

app.get('/data/clienttemplate',function(req,res){
	res.json({
		animal:'squirrel',
		bodyPart:'tail',
		adjective: 'bushy',
		noun: 'heck',
	});
})
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
	console.log('error:'+err);
	res.status(505);
	res.render('505');
});
/*app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});*/

//测试js去毛，jshint meadowlark，返回meadowlark.js: line 61, col 49, Missing semicolon. 1 error;给句末加上分好';'就好了
if( app.thing === null ) console.log( 'bleat!' )
module.exports = app;