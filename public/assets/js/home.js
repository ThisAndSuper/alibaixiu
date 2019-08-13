$.ajax({
    type: 'GET',
    url: '/slides',
    success: function (result) {
        // console.log(result);
        let html = template('tml', { data: result });
        $('.lunbo').html(html);
        //
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
});


$.ajax({
    type: 'GET',
    url: '/posts/lasted',
    success: function (result) {
        console.log(result);
        let html=template('tml2',{data:result});
        $('.new').append(html);
    }
});

//随机推荐
$.ajax({
    type: 'GET',
    url: '/posts/random',
    success: function (result) {
        var tml5=`
        {{each data}}
        <li>
          <a href="/detail.html?cid={{$value._id}}">
            <p class="title">{{$value.title}}</p>
            <p class="reading">阅读({{$value.meta.views}})</p>
            <div class="pic">
              <img src="{{$value.thumbnail}}" alt="">
            </div>
          </a>
        </li>
        {{/each}}`;
   
 
        let html=template.render(tml5,{data:result});
        $('.random').html(html);
    }
});


//最新评论

$.ajax({
    type: 'GET',
    url: '/comments/lasted',
    success: function (result) {
        console.log(result);
        // let html=template('tml3',{data:result});
        // $('.random').html(html);
    }
});


//获取分类

$.ajax({
    type: 'GET',
    url: '/categories',
    success: function (result) {
        // console.log(result);
        
       let tml9=`
       {{each data}}
       <li><a href="list.html?cid={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
       {{/each}}
       `;
       let html=template.render(tml9,{data:result});
       $('.navtemp').html(html);
    }
});



