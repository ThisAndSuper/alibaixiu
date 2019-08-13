$.ajax({
    type: 'GET',
    url: '/posts/recommend',
    success: function (result) {
        // console.log(result);
        var tml=` 
        {{each data}}
        <li>
        <a href="/detail.html?cid={{$value._id}}">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
      </li>
        {{/each}}
      `;

      let html=template.render(tml,{data:result});
      $('#recommonBox').html(html);
       
    }
});