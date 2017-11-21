$(()=>{
    $('.category').click((ev)=>{
        let cat_id = $(ev.target).attr('data-id');
        console.log(cat_id);
        let filterApplied = { catID: cat_id, lbp: 0, ubp:1000, sort:0, page: 1 };
        $.get('/gallery', filterApplied,()=>{
            window.location.href =
            console.log('Done');
        });
        // window.location.href  = '/gallery/?q='+ cat_id;
    })
});