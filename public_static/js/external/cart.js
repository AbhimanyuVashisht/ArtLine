

function changeCart(cartList) {
    let div = $('#cartbody');
    div.empty();
    div.html( cartList );

}
function deleteCartEle(pid) {
    console.log(pid);
    $.post('/cart/removeFromCart', {prodID: pid}, (result)=>{
        // console.log(result);
        changeCart(result);

    })
}


