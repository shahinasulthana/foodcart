const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
cart.classList.add('cart-active');
});
btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);
console.log(cart)


function loadFood() {
    loadContent();

    // Initialize cart buttons after DOM is loaded
    let cartBtns = document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn) => {
        btn.addEventListener('click', addCart);
    });
}
//product item change event
let qtyElements=document.querySelectorAll('.cart-quantity');
qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
});

// Initialize the item list globally
let itemList = [];

// Function to create HTML for a cart product
function createCartProduct(title, price, imgsrc) {
    return `
    <div class="cart-box">
        <img src="${imgsrc}" class="cart-img">
        <div class="detail-box">
            <div class="cart-food-title">${title}</div>
            <div class="price-box">
                <div class="cart-price">${price}</div>
                <div class="cart-amt">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <ion-icon name="trash" class="remove"></ion-icon>
        </div>
    </div>`;
}

// Function to update the total price of the cart
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalvalue = document.querySelector('.total-price');
    let total = 0;

    cartItems.forEach(product => {
        // Extract and clean price value
        let priceElement = product.querySelector('.cart-price');
        let priceText = priceElement.innerText.replace('Rs.', ''); // Clean the text
        let price = parseFloat(priceText);

        // Extract quantity
        let qtyElement = product.querySelector('.cart-quantity');
        let qty = parseInt(qtyElement.value, 10);

        // Calculate total for this item
        let itemTotal = qty * price;
        total += itemTotal;

        // Update item total in cart
        product.querySelector('.cart-amt').innerText = "Rs. " + itemTotal.toFixed(2); // Format to 2 decimal places
    });

    // Update the total value displayed
    totalvalue.innerText = "Rs. " + total.toFixed(2); // Format to 2 decimal places
}

// Function to update the total price of the cart
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalvalue = document.querySelector('.total-price');
    let total = 0;

    cartItems.forEach(product => {
        // Extract and clean price value
        let priceElement = product.querySelector('.cart-price');
        let priceText = priceElement.innerText.replace('Rs.', ''); // Clean the text
        let price = parseFloat(priceText);

        // Extract quantity
        let qtyElement = product.querySelector('.cart-quantity');
        let qty = parseInt(qtyElement.value, 10);

        // Calculate total for this item
        let itemTotal = qty * price;
        total += itemTotal;

        // Update item total in cart
        product.querySelector('.cart-amt').innerText = "Rs. " + itemTotal.toFixed(2); // Format to 2 decimal places
    });

    // Update the total value displayed
    totalvalue.innerText = "Rs. " + total.toFixed(2); // Format to 2 decimal places
}

// Function to handle quantity change
function changeQty() {
    let quantity = parseInt(this.value, 10);
    if (isNaN(quantity) || quantity < 1) {
        this.value = 1;
    }
    updateCartTotal(); // Update the cart total price
    updateCartCount(); // Update the cart count
}

// Function to remove item from cart
function removeItem() {
    if (confirm('Are you sure you want to remove this item?')) {
        let cartBox = this.closest('.cart-box');
        let title = cartBox.querySelector('.cart-food-title').innerText;

        // Update itemList by filtering out the item to be removed
        itemList = itemList.filter(el => el.title !== title);

        // Remove the cart item from the DOM
        cartBox.remove();

        // Update the total price and cart count
        updateCartTotal();
        updateCartCount();
    }
}

// Function to add item to cart
function addCart() {
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgsrc = food.querySelector('.food-image').src;

    let newProduct = { title, price, imgsrc };
    if (itemList.some(el => el.title === newProduct.title)) {
        alert("Product already added to the cart");
        return;
    } else {
        itemList.push(newProduct);
    }

    let newProductElement = createCartProduct(title, price, imgsrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;

    // Attach event listeners for new cart items
    element.querySelector('.remove').addEventListener('click', removeItem);
    element.querySelector('.cart-quantity').addEventListener('change', changeQty);

    let cartBasket = document.querySelector('.cart-content');
    cartBasket.appendChild(element);

    // Update the total price and cart count after adding a new item
    updateCartTotal();
    updateCartCount();
}

// Function to update the cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) { // Ensure the element exists
        cartCount.innerText = itemList.length; // Set the count to the length of the itemList
    }
}

// Event listener setup
document.addEventListener('DOMContentLoaded', () => {
    // Initial setup for existing cart items and add-cart buttons
    let cartBtns = document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn) => {
        btn.addEventListener('click', addCart);
    });

    // Attach event listeners to existing cart quantity inputs
    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input) => {
        input.addEventListener('change', changeQty);
    });

    // Initialize cart total and cart count
    updateCartTotal();
    updateCartCount();
});
