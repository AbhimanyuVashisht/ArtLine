let filterApplied = { catID: 1, lbp: 0, ubp:1000, sort:0, page: 1 }; // object to store the filters

$(function () {

});






// function to create the product list element done
function changeProducts(productList) {
    console.log('im here');
    let div = $('#product');
    div.empty();
    div.html( productList );
}


// function to create the modal view for each product done
function modalView(pid) {
    console.log(pid);
    // ajax request to fetech modal and update the view count with each modal view
    $.get('/modal',{prodID: pid} ,(result)=>{
        let modalDOM = $('#shop-quickview');
        modalDOM.empty();
        modalDOM.html(result);
    });
}


//  function to fetch the product list from db done
function getProducts(cid) {
    console.log('inside getProducts');
    filterApplied.catID = cid;
    $.get('/products', filterApplied, (result)=>{
            changeProducts(result);
        });
}

// Price filter done
$('.price-filter-button').click(()=>{

    let lowerBP = $('.from').html();
    let upperBP = $('.to').html();
    // this filter will act as a array filter
    filterApplied = {lbp: lowerBP
        , ubp: upperBP
        , sort: 0};

});

// Select dropdown
$('#select-menu').change(()=>{
    filterApplied.sort = $('#select-menu').val();
    $.get('/products', filterApplied, (result)=>{
        changeProducts(result);
    })
});



