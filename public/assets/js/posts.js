
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (result) {
        console.log(result);
        
        let html=template('tml',{data:result});
        $('tbody').html(html);
        
    }

});

function formData(data){
    let date=new Date(data);
    return date.getFullYear()+'-'+(date.getMonth()+1).toString().padStart(2,0)+'-'+date.getDate();

}