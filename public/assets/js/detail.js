
// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
	var paramsAry = location.search.substr(1).split('&');
	// 循环数据
	for (var i = 0; i < paramsAry.length; i++) {
		var tmp = paramsAry[i].split('=');
		if (tmp[0] == name) {
			return tmp[1];
		}
	}
	return -1;
}

let id=getUrlParams('cid');
$.ajax({
    type: 'GET',
    url: '/posts/'+id,
    success: function (result) {
        console.log(result);
        
      let html=template('tml12',{data:result});
      $('.content').append(html);
      
    }
});


//搜索功能
$('.why').on('click',function() {
	console(3333333);
	let keys=$('.keys').val();
	alert(keys);
});

