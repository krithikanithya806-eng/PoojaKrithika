```javascript
// =====================================================
// SMART CANTEEN ORDER - FEATURES.JS
// Search | Categories | Veg/Non-Veg | Quantity
// Availability | Order History | Track Order
// =====================================================


// =====================================================
// EXTRA MENU ITEMS
// =====================================================

const extraMenuItems = [

    // -------------------------
    // VEG - BREAKFAST
    // -------------------------

    {
        name: "Dosa + Chutney + Sambar",
        price: 80,
        category: "Breakfast",
        type: "veg",
        available: true
    },

    {
        name: "Idly + Chutney + Sambar",
        price: 60,
        category: "Breakfast",
        type: "veg",
        available: true
    },


    // -------------------------
    // VEG - SNACKS
    // -------------------------

    {
        name: "Veg Puffs",
        price: 25,
        category: "Snacks",
        type: "veg",
        available: true
    },

    {
        name: "Samosa",
        price: 20,
        category: "Snacks",
        type: "veg",
        available: true
    },


    // -------------------------
    // VEG - MEALS
    // -------------------------

    {
        name: "Veg Meals",
        price: 100,
        category: "Meals",
        type: "veg",
        available: true
    },

    {
        name: "Veg Biriyani",
        price: 110,
        category: "Meals",
        type: "veg",
        available: true
    },


    // -------------------------
    // NON-VEG
    // -------------------------

    {
        name: "Boiled Egg",
        price: 15,
        category: "Non-Veg",
        type: "nonveg",
        available: true
    },

    {
        name: "Chicken Fried Rice",
        price: 130,
        category: "Non-Veg",
        type: "nonveg",
        available: true
    },

    {
        name: "Egg Puffs",
        price: 35,
        category: "Non-Veg",
        type: "nonveg",
        available: true
    }

];


// =====================================================
// ORIGINAL MENU INFORMATION
// =====================================================

// This information is used for search and categories.

const originalMenuInfo = {

    "Burger": {
        category: "Fast Food",
        type: "veg",
        available: true
    },

    "Pizza": {
        category: "Fast Food",
        type: "veg",
        available: true
    },

    "Noodles": {
        category: "Fast Food",
        type: "veg",
        available: true
    },

    "Sandwich": {
        category: "Fast Food",
        type: "veg",
        available: true
    },

    "Fried Rice": {
        category: "Fast Food",
        type: "veg",
        available: true
    },

    "Fresh Juice": {
        category: "Drinks",
        type: "veg",
        available: true
    },

    "Normal Water": {
        category: "Drinks",
        type: "veg",
        available: true
    },

    "Cold Water": {
        category: "Drinks",
        type: "veg",
        available: true
    }

};


// =====================================================
// GET FOOD SYMBOL
// =====================================================

function getFoodSymbol(type) {

    if (type === "nonveg") {

        return `
            <span
                title="Non-Veg"
                style="
                    display:inline-block;
                    width:18px;
                    height:18px;
                    background-color:red;
                    border:2px solid darkred;
                    margin-right:6px;
                    vertical-align:middle;
                ">
            </span>
        `;

    }

    return `
        <span
            title="Veg"
            style="
                display:inline-block;
                width:18px;
                height:18px;
                background-color:green;
                border:2px solid darkgreen;
                margin-right:6px;
                vertical-align:middle;
            ">
        </span>
    `;
}


// =====================================================
// ADD CATEGORY INFORMATION TO ORIGINAL ITEMS
// =====================================================

function updateOriginalMenuCards() {

    const cards =
        document.querySelectorAll(".food-card");

    cards.forEach(card => {

        const heading =
            card.querySelector("h3");

        if (!heading) return;

        let itemName =
            heading.innerText
                .replace("🍔", "")
                .replace("🍕", "")
                .replace("🍜", "")
                .replace("🥪", "")
                .replace("🍚", "")
                .replace("🥤", "")
                .trim();

        const info =
            originalMenuInfo[itemName];

        if (!info) return;

        card.dataset.category =
            info.category;

        card.dataset.type =
            info.type;

        card.dataset.name =
            itemName.toLowerCase();

        // Add Veg/Non-Veg symbol

        heading.innerHTML =
            getFoodSymbol(info.type) +
            itemName;

        // Add availability text

        const availability =
            document.createElement("p");

        availability.innerHTML =
            info.available
                ? "<strong>Available</strong>"
                : "<strong>Not Available</strong>";

        card.appendChild(availability);

    });
}


// =====================================================
// ADD EXTRA MENU ITEMS
// =====================================================

function displayExtraMenu() {

    const grid =
        document.querySelector(
            "#menu .menu-grid"
        );

    if (!grid) return;


    extraMenuItems.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            "food-card";

        card.dataset.category =
            item.category;

        card.dataset.type =
            item.type;

        card.dataset.name =
            item.name.toLowerCase();


        const availability =
            item.available
                ? "Available"
                : "Not Available";


        const safeId =
            item.name
                .replace(/[^a-zA-Z0-9]/g, "-");


        card.innerHTML = `

            <h3>
                ${getFoodSymbol(item.type)}
                ${item.name}
            </h3>

            <p>
                ${item.category}
            </p>

            <h4>
                ₹${item.price}
            </h4>

            <p>
                <strong>
                    ${availability}
                </strong>
            </p>


            <div
                style="
                    margin:10px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    gap:10px;
                "
            >

                <button
                    onclick="
                        changeExtraQuantity(
                            '${item.name}',
                            -1
                        )
                    "
                >
                    −
                </button>


                <span
                    id="qty-${safeId}"
                    style="
                        font-weight:bold;
                        min-width:20px;
                        text-align:center;
                    "
                >
                    1
                </span>


                <button
                    onclick="
                        changeExtraQuantity(
                            '${item.name}',
                            1
                        )
                    "
                >
                    +
                </button>

            </div>


            <button
                ${!item.available ? "disabled" : ""}
                onclick="
                    addExtraItemToCart(
                        '${item.name}',
                        ${item.price}
                    )
                "
            >
                Add to Cart
            </button>

        `;


        grid.appendChild(card);

    });
}


// =====================================================
// ADD EXTRA ITEM TO CART WITH QUANTITY
// =====================================================

function addExtraItemToCart(
    itemName,
    price
) {

    const safeId =
        itemName
            .replace(/[^a-zA-Z0-9]/g, "-");

    const quantityElement =
        document.getElementById(
            "qty-" + safeId
        );

    let quantity = 1;

    if (quantityElement) {

        quantity =
            parseInt(
                quantityElement.innerText
            );

    }


    for (let i = 0; i < quantity; i++) {

        addToCart(
            itemName,
            price
        );

    }


    // Reset quantity after adding

    if (quantityElement) {

        quantityElement.innerText = "1";

    }

}


// =====================================================
// EXTRA ITEM QUANTITY
// =====================================================

function changeExtraQuantity(
    itemName,
    amount
) {

    const safeId =
        itemName
            .replace(/[^a-zA-Z0-9]/g, "-");

    const quantityElement =
        document.getElementById(
            "qty-" + safeId
        );


    if (!quantityElement) return;


    let quantity =
        parseInt(
            quantityElement.innerText
        );


    quantity += amount;


    if (quantity < 1) {

        quantity = 1;

    }


    quantityElement.innerText =
        quantity;

}


// =====================================================
// SEARCH BOX
// =====================================================

function createSearchBox() {

    const menuSection =
        document.getElementById("menu");

    const grid =
        menuSection.querySelector(
            ".menu-grid"
        );


    const searchContainer =
        document.createElement("div");


    searchContainer.innerHTML = `

        <input
            type="text"
            id="menuSearch"
            placeholder="🔎 Search menu..."
            style="
                width:100%;
                padding:12px;
                margin:15px 0;
                border:1px solid #ccc;
                border-radius:6px;
                font-size:16px;
            "
        >

    `;


    menuSection.insertBefore(
        searchContainer,
        grid
    );


    document
        .getElementById("menuSearch")
        .addEventListener(
            "input",
            searchMenu
        );

}


// =====================================================
// SEARCH FUNCTION
// =====================================================

function searchMenu() {

    const searchText =
        document
            .getElementById("menuSearch")
            .value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(
            ".food-card"
        );


    cards.forEach(card => {

        const name =
            card.innerText.toLowerCase();


        if (
            name.includes(searchText)
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


// =====================================================
// CATEGORY BUTTONS
// =====================================================

function createCategoryButtons() {

    const menuSection =
        document.getElementById("menu");

    const grid =
        menuSection.querySelector(
            ".menu-grid"
        );


    const container =
        document.createElement("div");


    container.id =
        "categoryButtons";


    container.innerHTML = `

        <div
            style="
                display:flex;
                flex-wrap:wrap;
                gap:8px;
                margin-bottom:15px;
            "
        >

            <button
                onclick="filterCategory('All')"
            >
                All
            </button>

            <button
                onclick="filterCategory('Breakfast')"
            >
                Breakfast
            </button>

            <button
                onclick="filterCategory('Meals')"
            >
                Meals
            </button>

            <button
                onclick="filterCategory('Snacks')"
            >
                Snacks
            </button>

            <button
                onclick="filterCategory('Fast Food')"
            >
                Fast Food
            </button>

            <button
                onclick="filterCategory('Drinks')"
            >
                Drinks
            </button>

            <button
                onclick="filterCategory('Non-Veg')"
            >
                Non-Veg
            </button>

        </div>

    `;


    menuSection.insertBefore(
        container,
        grid
    );

}


// =====================================================
// CATEGORY FILTER
// =====================================================

function filterCategory(category) {

    const cards =
        document.querySelectorAll(
            ".food-card"
        );


    cards.forEach(card => {

        if (
            category === "All" ||
            card.dataset.category === category
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


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
// SAVE ORDER
// =====================================================

function saveOrderHistory(order) {

    orderHistory.push(order);


    localStorage.setItem(
        "canteenOrderHistory",
        JSON.stringify(
            orderHistory
        )
    );

}


// =====================================================
// SHOW ORDER HISTORY
// =====================================================

function showOrderHistory() {

    if (
        orderHistory.length === 0
    ) {

        alert(
            "No previous orders found."
        );

        return;

    }


    let historyText =
        "CUSTOMER ORDER HISTORY\n\n";


    orderHistory.forEach(
        order => {

            historyText +=
                "Order ID: " +
                order.id +
                "\n";

            historyText +=
                "Date: " +
                order.date +
                "\n";

            historyText +=
                "Total: ₹" +
                order.total +
                "\n";

            historyText +=
                "Payment: " +
                order.payment +
                "\n";

            historyText +=
                "Status: " +
                order.status +
                "\n";

            historyText +=
                "-------------------------\n";

        }
    );


    alert(historyText);

}


// =====================================================
// TRACK ORDER
// =====================================================

function trackEnteredOrder() {

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


    const order =
        orderHistory.find(
            item =>
                item.id === orderId
        );


    if (!order) {

        result.innerText =
            "❌ Order not found.";

        return;

    }


    result.innerHTML = `

        <strong>
            Order ID:
        </strong>
        ${order.id}

        <br>

        <strong>
            Current Status:
        </strong>
        ${order.status}

    `;

}


// =====================================================
// CREATE ORDER HISTORY + TRACKING
// =====================================================

function createOrderFeatures() {

    const checkoutSection =
        document.getElementById(
            "checkout"
        );


    // Order History button

    const historyButton =
        document.createElement(
            "button"
        );


    historyButton.innerText =
        "📜 My Order History";


    historyButton.style.marginTop =
        "15px";


    historyButton.onclick =
        showOrderHistory;


    checkoutSection.appendChild(
        historyButton
    );


    // Tracking section

    const trackContainer =
        document.createElement(
            "div"
        );


    trackContainer.style.marginTop =
        "25px";


    trackContainer.innerHTML = `

        <hr>

        <h3>
            🚚 Track Your Order
        </h3>

        <input
            type="text"
            id="trackOrderId"
            placeholder="Enter Order ID"
            style="
                padding:10px;
                margin:8px 0;
                width:100%;
            "
        >

        <button
            onclick="trackEnteredOrder()"
        >
            Track Order
        </button>

        <p
            id="trackingResult"
            style="margin-top:10px;"
        ></p>

    `;


    checkoutSection.appendChild(
        trackContainer
    );

}


// =====================================================
// START FEATURES
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateOriginalMenuCards();

        createSearchBox();

        createCategoryButtons();

        displayExtraMenu();

        createOrderFeatures();

    }
);
```
