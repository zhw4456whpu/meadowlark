//自动完成跨页测试，需要使用zombie：无头浏览器：不需要真的在屏幕上显示什么，但它必须表现得像个浏览器
var Browser = require('zombie');
//var assert = require('chai').assert;
var browser;
suite('Cross-Page Tests', function(){
	setup(function(){
		browser = new Browser();//创建一个新的浏览器实例
	});
	//检查用户是否从“胡德河之旅”页面：hood-river.handlebars 跳转至request-group-rate.handlebars
	test('requesting a group rate quote from the hood river tour page should populate the referrer field', function(done){
		var referrer = 'http://192.168.112.236:3000/tours/hood-river';
		//方法browser.visit 会真正加载页面，页面加载完成后，就会调用回调函数
		browser.visit(referrer, function(){
			//方法browser.clickLink 找到class 为requestGroupRate 的链接，并访问它
			browser.clickLink('.requestGroupRate', function(){
				//链接目标页面加载完后调用回调函数，我们就到了Request Group Rate 页面上
				//browser.field 方法会返回一个DOM 元素对象，具有value 属性
				
				assert(browser.field('referrer').value===referrer);
				done();
			});
		});
	});
	//检查用户是否从“俄勒冈海岸退潮”页面：oregon-coast.handlebars 跳转至request-group-rate.handlebars
	test('requesting a group rate from the oregon coast tour page should populate the referrer field', function(done){
		var referrer = 'http://192.168.112.236:3000/tours/oregon-coast';
		browser.visit(referrer, function(){
			browser.clickLink('.requestGroupRate', function(){
				
				assert(browser.field('referrer').value===referrer);
				done();
			});
		});
	});
	//用户直接访问页面：request-group-rate.handlebars
	test('visiting the "request group rate" page dirctly should result in an empty referrer field', function(done){
		browser.visit('http://192.168.112.236:3000/tours/request-group-rate',function(){
			
			assert(browser.field('referrer').value === '');
			done();
		});
	});
});