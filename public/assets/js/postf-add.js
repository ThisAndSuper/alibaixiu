
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (result) {
        let html = template('tml', { data: result });
        $('#category').html(html);

    }
});

$('#feature').on('change',function(){
    let formData=new FormData();
    formData.append('cover',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(data){
            console.log(data[0].cover);
            $('.showImg').attr('src',data[0].cover);
            $('.showImg').show();
            $('.thumbnail').val(data[0].cover);
        }
    });
    
}); 

//将信息进行保存
$('.saveBtn').on('click',function(){
    let params= $('.saveForm').serialize();
    $.ajax({
        type:'post',
        url:'/posts',
        data:params,
        success:function(data){
            console.log(data);
            location.href='/admin/posts.html'
            
        }
    });
    

});