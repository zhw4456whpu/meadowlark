var express = require('express');
var meadowlark = express();
meadowlark.set('port', process.env.PORT || 3000);

// 设置handlebars 视图引擎
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
meadowlark.engine('handlebars', handlebars.engine);
meadowlark.set('view engine', 'handlebars');

meadowlark.get('/', function(req, res){
	res.render('home');
});
meadowlark.get('/about', function(req, res){
	res.render('about');
});


// 定制404 页面
meadowlark.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});
// 定制500 页面
meadowlark.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});
/*meadowlark.listen(meadowlark.get('port'), function(){
	console.log( 'Express started on http://localhost:' + meadowlark.get('port') + '; press Ctrl-C to terminate.' );
});*/

module.exports = meadowlark;