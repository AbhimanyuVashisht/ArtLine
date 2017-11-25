let filterApplied = { catID: 1, lbp: 0, ubp:1000, sort:0, page: 1 }; // object to store the filters

function changePage(page) {
    console.log('Requested Page' + page);
    filterApplied.page = page;
    $.get('/products', filterApplied, (result)=>{
        changeProducts(result);
    })

}


// function to create the product list element done
function changeProducts(productList) {
    console.log('im here');
    let div = $('#product');
    console.log(productList);
    div.empty();
    div.html( productList );
}


// function to create the modal view for each product done
function modalView(pid) {
    // console.log(pid);
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

            console.log(result);
            changeProducts(result);
        });
}

function addToCart(pid) {
    // console.log(pid);
    $.post('/cart/addToCart', {prodID : pid}, (done)=>{
        console.log(done);
        if(done.status === '200'){
            $('.new.badge').html(done.cartCount);
            window.alert('Item Successfully added');
        }else if(done.status === '403'){
            window.alert('Login to add to the cart');
        }else if(done.status === '302'){
            window.alert('Item Already added in the cart');
        }
    })
}
// Price filter done
$('.price-filter-button').click(()=>{

    let lowerBP = $('.irs-from').html();
    let upperBP = $('.irs-to').html();

    filterApplied.lbp = Number(lowerBP.split('$')[1]);
    filterApplied.ubp = Number(upperBP.split('$')[1]);

    $.get('/products', filterApplied, (result)=>{
        changeProducts(result);
    })

});

// Select dropdown
$('#select-menu').change(()=>{
    filterApplied.sort = $('#select-menu').val();
    $.get('/products', filterApplied, (result)=>{
        changeProducts(result);
    })
});



