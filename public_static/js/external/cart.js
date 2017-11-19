

function changeCart(cartList) {
    let div = $('#cartbody');
    div.empty();
    div.html( cartList );

}
function deleteCartEle(pid) {
    console.log(pid);
    $.get('/cart/removeFromCart', {prodID: pid}, (result)=>{
        // console.log(result);
        window.location.href = '/cart';

    })
}


