let filterApplied = { lbp: 0, ubp:1000, sort:0 }; // object to store the filters

$(function () {

});






// function to create the product list element done
function createCardElement(i) {
    let cardElement;
    cardElement = $(`<div class="col m3 s6 xs12 l3 shop-product-wrapper">
                <div class="block-shop-product font-heading">
                  <div class="__image overlay-container"><img src="./data/${filterProductList[i].product_path}" alt="Shop Product"/>
                    <div class="overlay text-center">
                      <div class="__layer bgc-dark-o-3"></div>
                      <ul>
                        <li class="clearfix"><a href="#shop-quickview"  class="quick-view" onclick="modalView(${i})"  rel="modal:open"><i class="small material-icons">search</i><a href="#" class="wish-list"><i class="small material-icons">favorite</i></a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="__info text-center"><a href="#" data-id="${filterProductList[i].prod_id}">${filterProductList[i].product_name}</a>
                    <div class="__price"><span>$${filterProductList[i].price}</span>
                    </div>
                    <div data-rating="4" class="star-ratings"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>
                  </div>
                </div>
              </div>`);
    return cardElement;
}


// function to create the modal view for each product done
function modalView(pid) {
    let modalDOM = $('#shop-quickview');
    modalDOM.empty();
    modalDOM.append($(`<div class="row">
          <div class="col s12 xs12 l6 product-thumbnail-slider-wrapper __content-left">
            <div class="product-thumbnail-slider">
              <div class="product-syn-slider-1-wrapper">
                <div class="product-syn-slider-1 syn-slider-1 direction-nav">
                  <div class="block-product-slider">
                    <div data-mfp-src="assets/images/shop/product-img-2-l.jpg" class="__image zoom-button img-wrapper"><img src="./data/${categoryProductList[pid].product_path}" width="750px" height="600px" alt="Product slider image"/></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col s12 xs12 l6 __content-right">
            <div class="product-detail">
              <h3 class="fz-3-l"><a href="shop-single-fullwidth.html">${filterProductList[pid].product_name}</a></h3>
              <div class="__rating clearfix">
                <div data-rating='4' class="star-ratings"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>
                <p class="color-secondary">(1 customer review)</p>
              </div>
              <div class="__price fz-4 font-heading">
                <span class="color-primary">${filterProductList[pid].price}</span>
              </div>
              <div class="__text">
                <p>Nullam fringilla tristique elit id varius. Nulla lacinia quam nec venenatis dignissim. Vivamus volutpat tempus semper. Cras feugiat mi sit amet risus consectetur, non consectetur nisl finibus. Ut ac eros quis mi volutpat cursus vel non risus. In non neque lacinia, aliquet tortor sed, consectetur nibh. Nulla faucibus risus in ligula elementum bibendum.</p>
              </div>
              <form>
                <div class="__option-2 clearfix">
                  <div class="__button"><a href="shop-cart.html" class="btn btn-primary"><i class="icon-shopping111"></i>ADD TO CART</a></div>
                </div>
              </form>
              <div class="__others">
                <p>VIEWS:&nbsp;<a>${filterProductList[pid].views}</a></p>
                <p>ARTIST:&nbsp;<a href="#"><ArtistName></a></p>
              </div>
              
              <ul class="social circle secondary responsive">
                <li><a href="#"><i class="icon icon-facebook-1"></i></a></li>
                <li><a href="#"><i class="icon icon-twitter-1"></i></a></li>
              </ul>
            </div>
          </div>
        </div>`));
    // ajax request to update the view count with each modal view
    $.post('/viewer',{pid: filterProductList[pid].prod_id} ,(result)=>{
        filterProductList = categoryProductList = result;
        applyFilter();
    });
}


//  function to fetch the product list from db done
function getProducts(cid) {
    console.log('inside getProducts')
    $.get('/products', {cat_id: cid}, (result)=>{
            console.log(result);
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


    applyFilter();
});
//done
// Select dropdown
$('#select-menu').change(()=>{
    filterApplied.sort = $('#select-menu').val();
    applyFilter();
});



