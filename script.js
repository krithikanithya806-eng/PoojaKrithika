let cart = [];

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
}


function removeFromCart(index) {

    cart.splice(index, 1);

    displayCart();
}


function displayCart() {

    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        totalElement.textContent = "0";

        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <span>
                <strong>${item.name}</strong>
                × ${item.quantity}
                — ₹${itemTotal}
            </span>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);
    });

    totalElement.textContent = total;
}


// Payment mode

document.getElementById("payment")
    .addEventListener("change", function () {

        const paymentDetails =
            document.getElementById("paymentDetails");

        const payment = this.value;

        paymentDetails.innerHTML = "";

        if (payment === "UPI") {

            paymentDetails.innerHTML = `
                <div class="payment-box">
                    <label>UPI ID</label>
                    <input
                        type="text"
                        id="upi"
                        placeholder="example@upi"
                        required>
                </div>
            `;

        } else if (payment === "Debit/Credit Card") {

            paymentDetails.innerHTML = `
                <div class="payment-box">

                    <label>Card Number</label>
                    <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxlength="19"
                        required>

                    <label>Expiry Date</label>
                    <input
                        type="text"
                        placeholder="MM/YY"
                        required>

                    <label>CVV</label>
                    <input
                        type="password"
                        placeholder="CVV"
                        maxlength="3"
                        required>

                </div>
            `;

        } else if (payment === "Online Payment") {

            paymentDetails.innerHTML = `
                <div class="payment-box">
                    <p>
                        You will be redirected to
                        the online payment gateway
                        after placing the order.
                    </p>
                </div>
            `;

        } else if (payment === "Cash") {

            paymentDetails.innerHTML = `
                <div class="payment-box">
                    <p>
                        💵 Please pay at the canteen
                        counter when collecting
                        your order.
                    </p>
                </div>
            `;
        }
    });


// Place order

document.getElementById("orderForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        if (cart.length === 0) {

            alert("Please add at least one item to your cart.");

            return;
        }

        const name =
            document.getElementById("name").value;

        const phone =
            document.getElementById("phone").value;

        const payment =
            document.getElementById("payment").value;

        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
        });

        const orderId =
            "SCO" + Math.floor(100000 + Math.random() * 900000);
        const order = {
           id: orderId,
           customer: name,
           phone: phone,
           items: [...cart],
           total: total,
           payment: payment,
           status: "Order Placed",
           date: new Date().toLocaleString()
};

saveOrderHistory(order);

        document.getElementById("confirmation")
            .innerHTML = `
                <div class="success">

                    <h3>✅ Order Placed Successfully!</h3>

                    <p>
                        <strong>Order ID:</strong>
                        ${orderId}
                    </p>

                    <p>
                        <strong>Customer:</strong>
                        ${name}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${phone}
                    </p>

                    <p>
                        <strong>Payment Mode:</strong>
                        ${payment}
                    </p>

                    <p>
                        <strong>Total Amount:</strong>
                        ₹${total}
                    </p>

                    <p>
                        Please collect your order
                        using your Order ID.
                    </p>

                </div>
            `;

        cart = [];

        displayCart();

        document.getElementById("orderForm").reset();

        document.getElementById("paymentDetails")
            .innerHTML = "";
    });
        // Make addToCart available to features.js
        window.addToCart = addToCart;
