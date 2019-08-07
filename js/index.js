var tpl = $('#template')
var tpl_str = tpl.html()
var lis = $('#list>li')
var height_arr = new Array(lis.length).fill(0)

$('.repin').css({
	'width':'500'
})
//r为json值，
function sendAjax(r){
	// $.get("https://xufyi.github.io/WaterfallFlow/data/"+ r +".json",function(data){
	$.get("./data/"+ r +".json",function(data){
			console.log(data)
	//判断当页面
	var data_arr = data.pins
	var str = ''
	//li内容上树
	for(var i = 0;i<data_arr.length;i++){
		str = format(tpl_str,data_arr[i])
		
		//获取到当前img的高度，并计算出当前li高度
//因为li中的img先是用str上树，上树后再去发送Img请求，所以只能通过json对象中知道img的高度来计算，
// 无法使用onload
		var height  = data_arr[i].file.height
		var width  = data_arr[i].file.width

		var img_height = 234 * height / width 
		var li_height = img_height + 123

		var idx = getMinIdx(height_arr)
		
		//判断height_arr最小值，上树，上树后height_arr中对应项的数据变化
		$('#list>li').eq(idx).append(str)
		height_arr[idx] += li_height
	}	
	},'json')
}
var r = 1
sendAjax(r)

//判断页面滚动值，当内容小于200px时候再去发送ajax
document.body.onscroll = function(){
	//页面高，
	var pageHeight = document.body.clientHeight
	//页面卷动值
	var scrollHeight = document.documentElement.scrollTop 
	//视口高
	var clientHeight = document.documentElement.clientHeight

	//节流
	clearTimeout(timer)
	if(pageHeight - scrollHeight - clientHeight <200){
		var timer = setTimeout(function(){
		console.log('1')
		r++
		sendAjax(r)
		})
	}	
}
  // 定义一个函数 该函数接收两个参数 第一个是模板字符串 第二个是对象
function format(tplStr, dictionary) {
	// 替换方法 将字符串中某些内容替换掉 
	return tplStr.replace(/<%((\w+)(\.\w+)*)%>/g, function(match, $1) {
		// 将$1以.分割成数组
		var arr = $1.split(".");
		var result = dictionary;
		// 循环arr 从dictionary中获取数据
		for(var i = 0; i < arr.length - 1; i++) {
			result = result[arr[i]];
		}
		return result[arr[i]];
	})
}

//返回数组中最小项索引值
function getMinIdx(arr){
	//假设第一项为最小项
	var idx =0 ;
	var min = arr[idx]
	//循环判断
	for(var i= 0;i<arr.length;i++){
		if(min > arr[i] ){
			min = arr[i]
			idx = i
		}
	}
	return idx
}