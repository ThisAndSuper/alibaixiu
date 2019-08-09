
let arr = new Array();

$.ajax({
    type: 'get',
    url: '/users',
    success: function (result) {
        arr = result;
        let html = template('tml', { data: arr });
        $('tbody').html(html);

    }
});
$('.btnUP').on('click', function () {
    console.log($('.userForm').serialize());
    // location.href='/users.html';
    $.ajax({
        type: 'post',
        url: '/users',
        data: $('.userForm').serialize(),
        success: function (result) {
            console.log(result);

            arr.push(result);
            let html = template('tml', { data: arr });
            $('tbody').html(html);
        },
        error: function (data) {
            // console.log('错误了');

        }
    });

});


//文件上传
$('#avatar').on('change', function () {
    let formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        processData: false,
        contentType: false,
        data: formData,
        success: function (data) {
            if (data[0].avator != '') {
                $('.form-image img').attr('src', data[0].avatar);
                $('.hideInput').val(data[0].avatar);
            }

        }
    });

});


//修改文件
$('tbody').on('click', '.modify', function () {
    let img = $('.form-image img');
    let email = $('.emailForm');
    let nickName = $('.nickNameForm');

    img.attr('src', $(this).parent().siblings().children('img').attr('src'));
    $('.hideInput').val($(this).parent().siblings().children('img').attr('src'));
    if ($(this).parent().siblings().children('img').attr('src') == '') {
        // alert(1);
        img.prop('src', '../assets/img/default.png');
    }
    email.val($(this).parent().parent().children().eq(2).text());
    nickName.val($(this).parent().parent().children().eq(3).text());
    if ($(this).parent().parent().children().eq(4).text() == '激活') {
        $('.jh').prop('checked', true);
    }
    else if ($(this).parent().parent().children().eq(4).text() == '未激活') {
        $('.wjh').prop('checked', true);
    }
    if ($(this).parent().parent().children().eq(5).text() == '超级管理员') {
        $('.admin').prop('checked', true);
    }
    else if ($(this).parent().parent().children().eq(5).text() == '普通用户') {
        $('.normal').prop('checked', true);
    }
    //获取id
    let id = $(this).parent().attr('data-id');
    //修改添加按钮为需改按钮
    $('.edit').show();
    $('.btnUP').hide();
    $('.titleUser').text('修改用户');

    $('.edit').on('click', function () {
        let emailValue= $('.emailForm').val();
        let nickNameValue= $('.nickNameForm').val();
        let hideInputValue=$('.hideInput').val();
        console.log(emailValue);
        console.log(nickNameValue);
        console.log(hideInputValue);
        

        $.ajax({
            type: 'put',
            url: '/users/' + id,
            data:$('.userForm').serialize(),
            success: function (result) {
                console.log(result+'111');
                var index = arr.findIndex(item => item._id == id);
                console.log(index);
                
                // 根据这个index找到数组的这个元素 将它的数据更新 
                console.log(arr[index]);
                console.log(result);
                
                arr[index] = result;
                
                
                // 调用render方法 重新渲染页面 
                let html = template('tml', { data: arr });
                $('tbody').html(html);

                $('.edit').hide();
                $('.btnUP').show();
                $('.titleUser').text('添加用户');
                location.href='users.html';
            }
           
        });

    });
});

//添加的时候





