let articleId='';
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
articleId=id;
//根据id获取文章
$.ajax({
    type: 'GET',
    url: '/posts/category/'+id,
    success: function (result) {
        console.log(result);frameElement
        
      let html=template('tml11',{data:result});
      $('.new').append(html);
    }
});


//进行点赞

	
	
	$('.new').on('click','.like',function(){
		let id= $(this).attr('data-id');

		$.ajax({
			type: 'post',
			url: '/posts/fabulous/'+id,
			success: function (result) {
				
				alert('点赞成功了');
				location.reload(true);
			//   let html=template('tml12',{data:result});
			//   $('.content').append(html);
			  
			}
		});
	});


