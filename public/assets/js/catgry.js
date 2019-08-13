
let arr = new Array();

$.ajax({
    type: 'get',
    url: '/categories',
    success: function (result) {
        // console.log(result);

        arr = result;
        let html = template('tml', { data: arr });
        $('tbody').html(html);

    }
});
$('.btnUP').on('click', function () {
    $.ajax({
        type: 'post',
        url: '/categories',
        data: $('.userForm').serialize(),
        success: function (result) {
            // console.log(result);

            arr.push(result);
            let html = template('tml', { data: arr });
            $('tbody').html(html);
        },
        error: function (data) {
            // console.log('错误了');

        }
    });

});




//修改文件
$('tbody').on('click', '.modifyInfo', function () {
    $('.btnUP').hide();
    $('.modifyBtn').show();
    $('.changeTitle').html('修改分类');
    let title = $(this).parent().parent().children().eq(1);
    let className = $(this).parent().parent().children().eq(2);
    let id = $(this).attr('data-id');
    // console.log(title.text());
    // console.log(className.text());

    $('.catogyName').val(title.text());
    $('.imgName').val(className.text());
    // console.log(id);
    // console.log($('.userForm').serialize());

    $('.modifyBtn').on('click', function () {
        $.ajax({
            type: 'put',
            url: '/categories/' + id,
            data: $('.userForm').serialize(),
            success: function (result) {
                var index = arr.findIndex(item => item._id == id);
                // 根据这个index找到数组的这个元素 将它的数据更新 
                arr[index] = result;
                // 调用render方法 重新渲染页面 
                let html = template('tml', { data: arr });
                $('tbody').html(html);
                $('.btnUP').show();
                $('.modifyBtn').hide();
                $('.changeTitle').html('添加分类');
                location.reload(true);
            }

        });
        return false;

    });

});

//点击删除
$('tbody').on('click', '.del', function () {
    let id = $(this).parent().attr('data-id');
    if (confirm('确定删吗？')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function (data) {
                // console.log(data);
                location.reload();
            }
        });
    }
});

//点击后将总的checked复制给所有
$('.selectAll').on('change', function () {
    $('.userChecked').prop('checked', $(this).prop('checked'));
    if ($('.selectAll').prop('checked') == true) {
        $('.piLiang').show();
    }
    else {
        $('.piLiang').hide();
    }
});


//当点击其他的按钮时，总按钮要变化
$('tbody').on('change', 'input', function () {

    if ($('.userChecked').length == $('.userChecked').filter(':checked').length) {
        $('.selectAll').prop('checked', true);
    }
    else {
        $('.selectAll').prop('checked', false);
    }
    if ($('tbody input:checked').length > 1) {
        $('.piLiang').show();
    }
    else {
        $('.piLiang').hide();
    }
});

//点击批量删除按钮进行删除
var arrB = new Array();
$('.piLiang').on('click', function () {
    if (confirm('确定批量删除吗')) {
        let checkedInput = $('tbody input:checked');
        checkedInput.each(function (index, ele) {
            let id = ele.parentNode.parentNode.children[3].getAttribute('data-id');
            arrB.push(id);
        });
        let strB = arrB.join('-');
        $.ajax({
            type: 'delete',
            url: '/categories/' + strB,
            success: function (data) {
                location.reload(true);
            }
        });
    }
});











