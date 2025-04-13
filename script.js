const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const prod = document.querySelectorAll(".pro");
if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}
const close = document.getElementById("close");

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

prod.forEach((products) => {
  products.addEventListener("click", () => {
    const pid = products.getAttribute("data-id");
    window.location.href = `sproduct.html?id=${pid}`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".seemore").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "shop.html";
      // Add your logic here (e.g., apply coupon, add to cart, etc.)
    });
  });

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const tableBody = document.querySelector(".tablebody");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");
  const couponInput = document.querySelector("#coupon input");
  const couponBtn = document.querySelector("#coupon button");

  let discount = 0;

  function renderCart() {
    tableBody.innerHTML = "";

    if (cart.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6">Your cart is empty</td></tr>`;
      subtotalEl.textContent = "Rs.0";
      totalEl.textContent = "Rs.0";
      return;
    }

    cart.forEach((item, index) => {
      const priceNum = parseInt(item.price.replace(/[^0-9]/g, ""));
      const subtotal = priceNum * item.quantity;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><i class="fa-solid fa-trash remove-icon" data-index="${index}" style="cursor:pointer;"></i></td>
        <td><img src="${item.image}" alt="" /></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><input type="number" min="1" value="${item.quantity}" data-index="${index}" /></td>
        <td class="item-subtotal">Rs.${subtotal}</td>
      `;
      tableBody.appendChild(row);
    });

    updateTotals();
  }

  function updateTotals() {
    let subtotal = 0;
    cart.forEach((item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ""));
      subtotal += price * item.quantity;
    });

    let finalTotal = Math.round(subtotal - subtotal * discount);
    subtotalEl.textContent = `Rs.${subtotal}`;
    totalEl.textContent = `Rs.${finalTotal}`;
  }

  // 🗑 Remove item
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-icon")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  //  Update quantity
  tableBody.addEventListener("input", (e) => {
    if (e.target.type === "number") {
      const index = e.target.dataset.index;
      const newQty = parseInt(e.target.value);
      if (newQty > 0) {
        cart[index].quantity = newQty;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    }
  });

  //Apply coupon
  couponBtn.addEventListener("click", () => {
    const code = couponInput.value.trim();
    if (code === "DISCOUNT10") {
      discount = 0.1;
      alert("Coupon applied: 10% OFF!");
    } else {
      discount = 0;
      alert("Invalid coupon");
    }
    updateTotals();
  });

  renderCart();
});

function addToCart() {
  const product = pro_details[productId];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex(
    (item) => item.name === product.name
  );

  if (existingItemIndex !== -1) {
    // Product exists, update quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // Add new product with quantity 1
    cart.push({
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItemFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function updateQuantity(index, newQuantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart[index];
  item.quantity = newQuantity;

  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the subtotal in the DOM
  const priceNum = parseInt(item.price.replace(/[^0-9]/g, ""));
  const newSubtotal = priceNum * newQuantity;

  const subtotalCell = document.querySelector(
    `.subtotal[data-index="${index}"]`
  );
  if (subtotalCell) {
    subtotalCell.textContent = `Rs.${newSubtotal}`;
  }
}

const pro_details = {
  1: {
    name: "Borrcco Cashmere-Blend Crop Jacket",
    category: "Women Wear",
    price: "Rs.317,200",
    image: "img/products/p1.jpg",
  },
  2: {
    name: "All hearts Baby Dress Set",
    category: "Kid's Wear",
    price: "Rs.55,700",
    image: "img/products/p2.jpg",
  },
  3: {
    name: "Versace Logo Baby Sleepsuit",
    category: "Babies",
    price: "Rs.25,400",
    image: "img/products/p3.jpg",
  },
  4: {
    name: "Borroco Athena Baby changing Mat bag",
    category: "Gifts for Her",
    price: "Rs.218,600",
    image: "img/products/p4.jpg",
  },
  5: {
    name: "Dylan Blue Pour Homme EDT 100ml",
    category: "Gifts for Him",
    price: "Rs.15,600",
    image: "img/products/p5.jpg",
  },
  6: {
    name: "Medusa Biggie Crossbody Bag",
    category: "Bags",
    price: "Rs.176,300",
    image: "img/products/p6.jpg",
  },
  7: {
    name: "Virtus Gala Etagre",
    category: "TableWare",
    price: "Rs.76,000",
    image: "img/products/p7.jpg",
  },
  8: {
    name: "Icon Slippers",
    category: "FootWears",
    price: "Rs.69,100",
    image: "img/products/p8.jpg",
  },
  9: {
    name: "mini cashin tote",
    category: "Purse",
    price: "Rs.17,200",
    image: "img/products/n1.jpg",
  },
  10: {
    name: "Gucci Horsebit Chain Clutch",
    category: "Wallets",
    price: "Rs.55,700",
    image: "img/products/n2.jpg",
  },
  11: {
    name: "White Sneakers",
    category: "Sneakers",
    price: "Rs.25,400",
    image: "img/products/n3.jpg",
  },
  12: {
    name: "Louis Vuitton Mini Bag",
    category: "Gifts for Her",
    price: "Rs.18,600",
    image: "img/products/n4.jpg",
  },
  13: {
    name: "Travelling Bags",
    category: "Gifts for Him",
    price: "Rs.15,600",
    image: "img/products/n5.jpg",
  },
  14: {
    name: "Medusa Scents",
    category: "Perfumes",
    price: "Rs.76,300",
    image: "img/products/n6.jpg",
  },
  15: {
    name: "Virtus rings",
    category: "Jewellery",
    price: "Rs.76,000",
    image: "img/products/n7.jpg",
  },
  16: {
    name: "Daily Slippers",
    category: "FootWears",
    price: "Rs.69,100",
    image: "img/products/n8.jpg",
  },
};

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Load the product details dynamically
if (pro_details[productId]) {
  const product = pro_details[productId];
  document.getElementById("detail").innerHTML = `
        <div>
        <img src="${product.image}" alt="${product.name}" />
        </div>
        <div>
        <h6>${product.category}</h6>
        <br>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2>
        <select>
          <option>Select Size</option>
          <option>XL</option>
          <option>XXL</option>
          <option>Small</option>
          <option>Large</option>
        </select>
        <input type="number" value="1" />
        <button id="addToCartBtn" class="normal">Add To Cart</button>
       
        <h4>Product Details</h4>
        <span
          >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
          molestiae ducimus excepturi ipsam ad? Ullam cupiditate fugit eveniet
          quasi reiciendis. Sit, perferendis quis quisquam ut nisi explicabo
          officiis aut eveniet! Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Eaque fuga exercitationem sunt enim atque porro hic
          id quam. Quidem numquam, iure ex quod eligendi quo quaerat
          exercitationem debitis tempora voluptatum?
        </span>
        </div>
      `;
  //  Select and add event listener to the button
  const addToCartButton = document.querySelector("#addToCartBtn");
  addToCartButton.addEventListener("click", function () {
    addToCart();
    window.location.href = "cart.html";
  });
} else {
  document.getElementById("detail").innerHTML = `
        <h4>Product not found</h4>
      `;
}
