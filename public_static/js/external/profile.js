


$('#follow').click((ev)=>{
    let userID = $(ev.target).attr('data-id');
    $.post('/user/follow', {followID: userID},()=>{
        console.log('done');
    })
});

$('.upvote').click((ev)=>{
    // console.log(ev);
   let blogID = $(ev.target.parentNode).attr('data-id');
   // console.log(blogID);
    $.post('/blog/upvote', {blogID: blogID}, (done)=>{
        if(done === '786'){
            window.alert('Please login to vote');
        }
        console.log(done);
        $('#nuup').html(done.upVotes);
        $('#nudown').html(done.downVotes);
    })
});

$('.downvote').click((ev)=>{
   let blogID = $(ev.target.parentNode).attr('data-id');
   $.post('/blog/downvote', {blogID: blogID}, (done)=>{
       if(done === '786'){
           window.alert('Please login to vote');
       }
       console.log(done);
       $('#nuup').html(done.upVotes);
       $('#nudown').html(done.downVotes);
   })
});