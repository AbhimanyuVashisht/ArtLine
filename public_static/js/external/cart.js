

function changeCart(cartList) {
    let div = $('#cartbody');
    div.empty();
    div.html( cartList );

}
function deleteCartEle(pid) {
    console.log(pid);
    $.post('/removeFromCart', {prodID: pid}, (result)=>{
        changeCart(result);
    })
}

