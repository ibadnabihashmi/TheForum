$(document).ready(function(){
    var canclick = true;
    $('.counter').click(function(){
        if(canclick){
            $.post('/counterup',{post:$(this).attr('id')},function(res){
                $('.counter').html(res.post.counterText+' '+'('+' '+res.post.counter+' '+')');
                canclick = false;
            });
        }
    });
});