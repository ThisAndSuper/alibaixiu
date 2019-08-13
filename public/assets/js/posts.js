render();
function render(page,category=undefined,state=undefined){
    $.ajax({
        type: 'get',
        url: '/posts',
        data:{
            page:page || 1,
            category:category,
            state:state
        },
        success: function (result) {
            
            console.log(result);
            
            let html=template('tml',{data:result});
            $('tbody').html(html);
    
            let page=template('tml1',{data:result});
            $('.pagination').html(page);
            
        }
    });
};



function formData(data){
    let date=new Date(data);
    return date.getFullYear()+'-'+(date.getMonth()+1).toString().padStart(2,0)+'-'+date.getDate();

}

function change(page){
    render(page);
}

//查询分类列表
$.ajax({
    type:'get',
    url:'/categories',
    success:function(data){  
        let html=template('tml2',{data:data});
        $('#allCatogy').html(html);
    }
});

//筛选功能
$('#chooseForm1').on('submit',function(){
    let formData=$(this).serialize();
    $.ajax({
        type:'GET',
        url: '/posts',
        data:formData,
        success: function (result) {
            console.log(result);
            
            let html=template('tml',{data:result});
            $('tbody').html(html);
            let page=template('tml1',{data:result});
            $('.pagination').html(page);
            
        }
    });
    return false ;
});