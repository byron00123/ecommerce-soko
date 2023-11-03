//cart open close
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
//open cart

cartIcon.onclick = () => {
    cart.classList.add("active");
}

//close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
}

//making Add to cart
//Cart Working JS
if(document.readyState  == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

//Making Function
function ready(){
    //Remove Item From Cart
    var reemoveCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < reemoveCartButtons.length; i++){
        var button = reemoveCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
}

//Remove Cart Item
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
}