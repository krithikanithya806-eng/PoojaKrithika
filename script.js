```javascript
// =====================================================
// SMART CANTEEN ORDER
// COMPLETE JAVASCRIPT
// =====================================================


// =====================================================
// MENU DATA
// =====================================================

const menuItems = [

    // -------------------------
    // BREAKFAST - VEG
    // -------------------------

    {
        id: 1,
        name: "Dosa + Chutney + Sambar",
        price: 80,
        category: "Breakfast",
        type: "veg",
        available: true
    },

    {
        id: 2,
        name: "Idly + Chutney + Sambar",
        price: 60,
        category: "Breakfast",
        type: "veg",
        available: true
    },


    // -------------------------
    // SNACKS - VEG
    // -------------------------

    {
        id: 3,
        name: "Veg Puffs",
        price: 25,
        category: "Snacks",
        type: "veg",
        available: true
    },

    {
        id: 4,
        name: "Samosa",
        price: 20,
        category: "Snacks",
        type: "veg",
        available: true
    },


    // -------------------------
    // SNACKS - NON VEG
    // -------------------------

    {
        id: 5,
        name: "Egg Puffs",
        price: 35,
        category: "Non-Veg",
        type: "nonveg",
        available: true
    },


    // -------------------------
    // MEALS - VEG
    // -------------------------

    {
        id: 6,
        name: "Veg Meals",
        price: 100,
        category: "Meals",
        type: "veg",
        available: true
    },

    {
        id: 7,
        name: "Veg Biriyani",
        price: 110,
        category: "Meals",
        type: "veg",
        available: true
    },


    // -------------------------
    // NON VEG
    // -------------------------

    {
        id: 8,
        name: "Boiled Egg",
        price: 15,
        category: "Non-Veg",
        type: "nonveg",
        available: true
    },

    {
        id: 9,
        name: "Chicken Fried Rice",
        price: 130,
        category: "Non-Veg",
        type: "nonveg",
        available: true
    },


    // -------------------------
    // FAST FOOD
    // -------------------------

    {
        id: 10,
        name: "Burger",
        price: 80,
        category: "Fast Food",
        type: "veg",
        available: true
    },

    {
        id: 11,
        name: "Pizza",
        price: 120,
        category: "Fast Food",
        type: "veg",
        available: true
    },

    {
        id: 12,
        name: "Noodles",
        price: 70,
        category: "Fast Food",
        type: "veg",
        available: true
    },

    {
        id: 13,
        name: "Sandwich",
        price: 60,
        category: "Fast Food",
        type: "veg",
        available: true
    },

    {
        id: 14,
        name: "Fried Rice",
        price: 90,
        category: "Fast Food",
        type: "veg",
        available: true
    },


    // -------------------------
    // DRINKS
    // -------------------------

    {
        id: 15,
        name: "Fresh Juice",
        price: 50,
        category: "Drinks",
        type: "veg",
        available: true
    },

    {
        id: 16,
        name: "Normal Water",
        price: 10,
        category: "Drinks",
        type: "veg",
        available: true
    },

    {
        id: 17,
        name: "Cold Water",
        price: 15,
        category: "Drinks",
        type: "veg",
        available: true
    }

];


// =====================================================
// CART
// =====================================================

let cart = [];


// =====================================================
// ORDER HISTORY
// =====================================================

let orderHistory =
    JSON.parse(
        localStorage.getItem(
            "canteenOrderHistory"
        )
    ) || [];


// =====================================================
// CURRENT CATEGORY
// =====================================================

let currentCategory = "All";


// =====================================================
// DISPLAY MENU
// =====================================================

function displayMenu() {

    const menuGrid =
        document.getElementById(
            "menuGrid"
        );

    menuGrid.innerHTML = "";


    const searchText =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const filteredItems =
        menuItems.filter(item => {

            const matchesCategory =
                currentCategory === "All" ||
                item.category === currentCategory;


            const matchesSearch =
                item.name
                    .toLowerCase()
                    .includes(searchText);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    if (filteredItems.length === 0) {

        menuGrid.innerHTML = `
            <p>
                No food items found.
            </p>
        `;

        return;
    }


    filteredItems.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            "food-card";


        const symbolClass =
            item.type === "veg"
                ? "veg-symbol"
                : "nonveg-symbol";


        const availabilityClass =
            item.available
                ? "available"
                : "unavailable";


        const availabilityText =
            item.available
                ? "Available"
                : "Not Available";


        card.innerHTML = `

            <h3>

                <span
                    class="
                        food-symbol
                        ${symbolClass}
                    "
                ></span>

                ${item.name}

            </h3>


            <p>
                Category:
                ${item.category}
            </p>


            <h4>
                ₹${item.price}
            </h4>


            <p class="${availabilityClass}">
                ${availabilityText}
            </p>


            <div
                class="quantity-control"
            >

                <button
                    onclick="
                        changeQuantity(
                            ${item.id},
                            -1
                        )
                    "
                >
                    −
                </button>


                <span
                    class="quantity-value"
                    id="quantity-${item.id}"
                >
                    1
                </span>


                <button
                    onclick="
                        changeQuantity(
                            ${item.id},
                            1
                        )
                    "
                >
                    +
                </button>

            </div>


            <button
                onclick="
                    addToCart(
                        ${item.id}
                    )
                "
                ${!item.available
                    ? "disabled"
                    : ""}
            >
                Add to Cart
            </button>

        `;


        menuGrid.appendChild(card);

    });

}


// =====================================================
// SEARCH
// =====================================================

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        displayMenu
    );


// =====================================================
// CATEGORY FILTER
// =====================================================

function filterCategory(category) {

    currentCategory = category;

    document
        .querySelectorAll(".category-btn")
        .forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.category === category
            ) {
                button.classList.add("active");
            }

        });

    displayMenu();
}


// Category button clicks

document
    .querySelectorAll(".category-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                filterCategory(
                    this.dataset.category
                );

            }
        );

    });

// =====================================================
// QUANTITY
// =====================================================

const itemQuantities = {};


function changeQuantity(
    itemId,
    change
) {

    if (
        !itemQuantities[itemId]
    ) {

        itemQuantities[itemId] = 1;

    }


    itemQuantities[itemId] +=
        change;


    if (
        itemQuantities[itemId] < 1
    ) {

        itemQuantities[itemId] = 1;

    }


    const element =
        document.getElementById(
            `quantity-${itemId}`
        );


    if (element) {

        element.innerText =
            itemQuantities[itemId];

    }

}


// =====================================================
// ADD TO CART
// =====================================================

function addToCart(itemId) {

    const item =
        menuItems.find(
            food =>
                food.id === itemId
        );


    if (!item || !item.available) {

        return;

    }


    const quantity =
        itemQuantities[itemId] || 1;


    const existingItem =
        cart.find(
            cartItem =>
                cartItem.id === itemId
        );


    if (existingItem) {

        existingItem.quantity +=
            quantity;

    } else {

        cart.push({

            id: item.id,

            name: item.name,

            price: item.price,

            quantity: quantity

        });

    }


    itemQuantities[itemId] = 1;


    const quantityElement =
        document.getElementById(
            `quantity-${itemId}`
        );


    if (quantityElement) {

        quantityElement.innerText =
            "1";

    }


    displayCart();

}


// =====================================================
// REMOVE FROM CART
// =====================================================

function removeFromCart(index) {

    cart.splice(
        index,
        1
    );


    displayCart();

}


// =====================================================
// DISPLAY CART
// =====================================================

function displayCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    const totalElement =
        document.getElementById(
            "total"
        );


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>
                Your cart is empty.
            </p>
        `;


        totalElement.innerText =
            "0";


        cartCount.innerText =
            "0";


        return;

    }


    let total = 0;

    let itemCount = 0;


    cart.forEach(
        (item, index) => {

            const itemTotal =
                item.price *
                item.quantity;


            total += itemTotal;

            itemCount +=
                item.quantity;


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "cart-item";


            div.innerHTML = `

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    ×
                    ${item.quantity}

                    — ₹${itemTotal}

                </div>


                <button
                    class="remove-btn"
                    onclick="
                        removeFromCart(
                            ${index}
                        )
                    "
                >
                    Remove
                </button>

            `;


            cartItems.appendChild(
                div
            );

        }
    );


    totalElement.innerText =
        total;


    cartCount.innerText =
        itemCount;

}


// =====================================================
// PAYMENT MODE
// =====================================================

document
    .getElementById("payment")
    .addEventListener(
        "change",
        showPaymentDetails
    );


function showPaymentDetails() {

    const payment =
        document.getElementById(
            "payment"
        ).value;


    const details =
        document.getElementById(
            "paymentDetails"
        );


    details.innerHTML = "";


    if (payment === "Cash") {

        details.innerHTML = `

            <div class="payment-box">

                💵 Please pay at the
                canteen counter when
                collecting your order.

            </div>

        `;

    }


    else if (
        payment === "UPI"
    ) {

        details.innerHTML = `

            <div class="payment-box">

                <label>
                    UPI ID
                </label>

                <input
                    type="text"
                    id="upiId"
                    placeholder="example@upi"
                    required
                >

            </div>

        `;

    }


    else if (
        payment ===
        "Debit/Credit Card"
    ) {

        details.innerHTML = `

            <div class="payment-box">

                <label>
                    Card Number
                </label>

                <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                    required
                >


                <label>
                    Expiry Date
                </label>

                <input
                    type="text"
                    placeholder="MM/YY"
                    required
                >


                <label>
                    CVV
                </label>

                <input
                    type="password"
                    placeholder="CVV"
                    maxlength="3"
                    required
                >

            </div>

        `;

    }


    else if (
        payment ===
        "Online Payment"
    ) {

        details.innerHTML = `

            <div class="payment-box">

                🌐 Online payment
                will be processed
                after placing the order.

            </div>

        `;

    }

}


// =====================================================
// PLACE ORDER
// =====================================================

document
    .getElementById("orderForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    "Please add at least one item to your cart."
                );

                return;

            }


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const phone =
                document.getElementById(
                    "phone"
                ).value.trim();


            const payment =
                document.getElementById(
                    "payment"
                ).value;


            let total = 0;


            cart.forEach(item => {

                total +=
                    item.price *
                    item.quantity;

            });


            const orderId =
                "SCO" +
                Math.floor(
                    100000 +
                    Math.random() *
                    900000
                );


            const order = {

                id: orderId,

                customer: name,

                phone: phone,

                items: [...cart],

                total: total,

                payment: payment,

                status:
                    "Order Placed",

                date:
                    new Date()
                        .toLocaleString()

            };


            // Save order

            orderHistory.push(
                order
            );


            localStorage.setItem(
                "canteenOrderHistory",
                JSON.stringify(
                    orderHistory
                )
            );


            // Confirmation

            document
                .getElementById(
                    "confirmation"
                )
                .innerHTML = `

                    <div class="success">

                        <h3>
                            ✅ Order Placed Successfully!
                        </h3>


                        <p>
                            <strong>
                                Order ID:
                            </strong>

                            ${order.id}
                        </p>


                        <p>
                            <strong>
                                Customer:
                            </strong>

                            ${order.customer}
                        </p>


                        <p>
                            <strong>
                                Phone:
                            </strong>

                            ${order.phone}
                        </p>


                        <p>
                            <strong>
                                Payment Mode:
                            </strong>

                            ${order.payment}
                        </p>


                        <p>
                            <strong>
                                Total Amount:
                            </strong>

                            ₹${order.total}
                        </p>


                        <p>
                            Please collect your
                            order using your
                            Order ID.
                        </p>

                    </div>

                `;


            // Clear cart

            cart = [];


            displayCart();


            // Reset form

            document
                .getElementById(
                    "orderForm"
                )
                .reset();


            document
                .getElementById(
                    "paymentDetails"
                )
                .innerHTML = "";


            // Update history

            displayOrderHistory();

        }
    );


// =====================================================
// ORDER HISTORY
// =====================================================

function displayOrderHistory() {

    const container =
        document.getElementById(
            "orderHistory"
        );


    container.innerHTML = "";


    if (
        orderHistory.length === 0
    ) {

        container.innerHTML = `
            <p>
                No previous orders.
            </p>
        `;

        return;

    }


    // Newest first

    const orders =
        [...orderHistory]
            .reverse();


    orders.forEach(order => {

        const div =
            document.createElement(
                "div"
            );


        div.className =
            "order-history-card";


        let itemsHTML = "";


        order.items.forEach(item => {

            itemsHTML += `

                <p>
                    ${item.name}
                    × ${item.quantity}
                    — ₹${item.price * item.quantity}
                </p>

            `;

        });


        div.innerHTML = `

            <h3>
                Order ID:
                ${order.id}
            </h3>


            <p>
                <strong>
                    Date:
                </strong>
                ${order.date}
            </p>


            <p>
                <strong>
                    Customer:
                </strong>
                ${order.customer}
            </p>


            <p>
                <strong>
                    Items:
                </strong>
            </p>

            ${itemsHTML}


            <p>
                <strong>
                    Total:
                </strong>

                ₹${order.total}
            </p>


            <p>
                <strong>
                    Payment:
                </strong>

                ${order.payment}
            </p>


            <p class="order-status">

                Status:
                ${order.status}

            </p>

        `;


        container.appendChild(
            div
        );

    });

}


// =====================================================
// TRACK ORDER
// =====================================================

function trackOrder() {

    const orderId =
        document
            .getElementById(
                "trackOrderId"
            )
            .value
            .trim();


    const result =
        document.getElementById(
            "trackingResult"
        );


    if (!orderId) {

        result.innerHTML = `
            <p>
                Please enter an Order ID.
            </p>
        `;

        return;

    }


    const order =
        orderHistory.find(
            item =>
                item.id === orderId
        );


    if (!order) {

        result.innerHTML = `
            <p>
                ❌ Order not found.
            </p>
        `;

        return;

    }


    const statuses = [

        "Order Placed",

        "Payment Confirmed",

        "Preparing Food",

        "Ready for Pickup",

        "Order Completed"

    ];


    const currentIndex =
        statuses.indexOf(
            order.status
        );


    let trackingHTML = `

        <div class="success">

            <h3>
                Order ${order.id}
            </h3>

            <p>
                Current Status:
                <strong>
                    ${order.status}
                </strong>
            </p>

    `;


    statuses.forEach(
        (status, index) => {

            if (
                index <= currentIndex
            ) {

                trackingHTML += `

                    <div
                        class="
                            tracking-step
                            completed
                        "
                    >
                        ✓ ${status}
                    </div>

                `;

            } else {

                trackingHTML += `

                    <div
                        class="
                            tracking-step
                        "
                    >
                        ○ ${status}
                    </div>

                `;

            }

        }
    );


    trackingHTML += `
        </div>
    `;


    result.innerHTML =
        trackingHTML;

}


// =====================================================
// INITIAL LOAD
// =====================================================

displayMenu();

displayCart();

displayOrderHistory();
```
