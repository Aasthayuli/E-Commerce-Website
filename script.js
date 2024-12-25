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
        <button class="normal">Add To Cart</button>
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
} else {
  document.getElementById("detail").innerHTML = `
        <h4>Product not found</h4>
      `;
}
