


$('#follow').click((ev)=>{
    let userID = $(ev.target).attr('data-id');
    $.post('/user/follow', {followID: userID},(status)=>{
        if(status === '47' ){
            window.alert('Login to follow');
        }else{
            window.alert('Follow done');
        }
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
        // $('#nuup').html(done.upVotes);
        // $('#nudown').html(done.downVotes);

        console.log($(ev.target.parentNode.nextSibling).html(done.upVotes));
        console.log($(ev.target.parentNode.nextSibling.nextSibling.nextSibling).html(done.downVotes));
    })
});

$('.downvote').click((ev)=>{
   let blogID = $(ev.target.parentNode).attr('data-id');
   $.post('/blog/downvote', {blogID: blogID}, (done)=>{
       if(done === '786'){
           window.alert('Please login to vote');
       }
       console.log(done);
       $(ev.target.parentNode.previousSibling).html(done.upVotes);
       $(ev.target.parentNode.nextSibling).html(done.downVotes);
   })
});

$('.delete').click((ev)=>{
   let blogID = $(ev.target.parentNode).attr('data-id');
   console.log(blogID);
   $.post('/blog/delete', {id: blogID}, (done)=>{
       // console.log(done);
       // $('.collapsible.popout').html(done);
       location.reload();
   })
});

$('#hire').click((ev)=>{
   let userEmail = $(ev.target).attr('data-id');
   console.log(userEmail);
    $.post('/user/hire', {userEmail: userEmail}, (status)=>{
        // console.log(status);
        if(status === '47'){
            window.alert('Login To hire');
        }else{
            window.alert('Email has been send to the candidate');
        }
    })
});