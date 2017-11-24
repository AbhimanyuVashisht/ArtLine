$(()=>{
    $('.carousel-item.category').click((ev)=>{
        // console.log(ev);
        // let cat_id = $(ev.target.parentNode).attr('data-id');
        // console.log(cat_id);
        // let filterApplied = { catID: cat_id, lbp: 0, ubp:1000, sort:0, page: 1 };
        // $.get('/gallery', filterApplied,()=>{
        //     window.location.href =
        // });
        window.location.href = '/gallery';
    })
});