


$('#follow').click((ev)=>{
    let userID = $(ev.target).attr('data-id');
    $.post('/user/follow', {followID: userID},()=>{
        console.log('done');
    })
});