


$('#follow').click((ev)=>{
    let userID = $(ev.target).attr('data-id');
    $.post('/follow', {followID: userID},()=>{
        console.log('done');
    })
});