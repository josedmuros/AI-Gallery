const weatherAPIKey = "502f0f01b684aa807720884b684b3120";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

const galleryImages = [
  {
    src: "./assets/gallery/image1.jpg",
    alt: "Thumbnail Image 1",
  },
  {
    src: "./assets/gallery/image2.jpg",
    alt: "Thumbnail Image 2",
  },
  {
    src: "./assets/gallery/image3.jpg",
    alt: "Thumbnail Image 3",
  },
];

const products = [
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 49.9,
    image: "./assets/products/img6.png",
  },
  {
    title: "Space Odissey",
    author: "Marie Anne",
    price: 35,
    image: "./assets/products/img1.png",
  },
  {
    title: "Doomed City",
    author: "Jason Cobert",
    price: 0,
    image: "./assets/products/img2.png",
  },
  {
    title: "Black Dog",
    author: "John Doe",
    price: 85.35,
    image: "./assets/products/img3.png",
  },
  {
    title: "My Little Robot",
    author: "Pedro Paulo",
    price: 0,
    image: "./assets/products/img5.png",
  },
  {
    title: "Garden Girl",
    author: "Ankit Patel",
    price: 45,
    image: "./assets/products/img4.png",
  },
];

// Menu section

function menuHandler() {
  document
    .querySelector("#open-nav-menu")
    .addEventListener("click", function () {
      document.querySelector("header nav .wrapper").classList.add("nav-open");
    });

  document
    .querySelector("#close-nav-menu")
    .addEventListener("click", function () {
      document
        .querySelector("header nav .wrapper")
        .classList.remove("nav-open");
    });
}

// Temperature conversion
function celsiusToFahr(temperature) {
  let fahr = (temperature * 9) / 5 + 32;

  return fahr;
}

// greeting section

function greetingHandler() {
  let currentHour = new Date().getHours();
  let greetingText;
  if (currentHour < 12) {
    greetingText = "Good morning!";
  } else if (currentHour < 19) {
    greetingText = "Good Afternoon!";
  } else if (currentHour < 24) {
    greetingText = "Good Evening!";
  } else {
    greetingText = "Welcome!";
  }

  document.querySelector("#greeting").innerHTML = greetingText;
}

//Weather text

function weatherHandler() {
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let url = weatherAPIURL
      .replace("{lat}", latitude)
      .replace("{lon}", longitude)
      .replace("{API key}", weatherAPIKey);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const condition = data.weather[0].description;
        const location = data.name;
        const temperature = data.main.temp;

        let celsiusText = `The weather is ${condition} in ${location}  and it's ${temperature.toFixed(
          1
        )}°C outside`;

        let fahrText = `The weather is ${condition} in ${location}  and it's ${celsiusToFahr(
          temperature
        ).toFixed(1)}°F outside`;
        document.querySelector("#weather").innerHTML = celsiusText;
        document
          .querySelector(".weather-group")
          .addEventListener("click", function (event) {
            if (event.target.id == "celsius") {
              document.querySelector("#weather").innerHTML = celsiusText;
            } else if (event.target.id == "fahr") {
              document.querySelector("#weather").innerHTML = fahrText;
            }
          });
      })
      .catch((err) => {
        document.querySelector("#weather").innerHTML =
          "Unable to get weather information.";
      });
  });
}

// Clock section

function clockHandler() {
  setInterval(function () {
    let localTime = new Date();

    document.querySelector("span[data-time=hours]").textContent = localTime
      .getHours()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=minutes]").textContent = localTime
      .getMinutes()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=seconds]").textContent = localTime
      .getSeconds()
      .toString()
      .padStart(2, "0");
  }, 1000);
}
// Gallery section

function galleryHandler() {
  /* for (let i in gallerIymages) {
  console.log(gallerIymages[i]);
} */

  let mainImage = document.querySelector("#gallery > img");
  let thumbnails = document.querySelector("#gallery .thumbnails");

  mainImage.src = galleryImages[0].src;
  mainImage.alt = galleryImages[0].alt;

  {
    /* <img src="./assets/gallery/image1.jpg"
            alt="Thumbnail Image 1"
            data-array-index="0"
            data-selected="true"/> */
  }

  galleryImages.forEach(function (image, index) {
    let thumb = document.createElement("img");
    thumb.src = image.src;
    thumb.alt = image.alt;
    thumb.dataset.arrayIndex = index;
    thumb.dataset.selected = index === 0 ? true : false;

    // esta funcion hace que el cuadro de seleccion en las miniaturas se active y muestre la imagen seleccionada
    thumb.addEventListener("click", function (e) {
      let selectedIndex = e.target.dataset.arrayIndex;
      let selectedImage = galleryImages[selectedIndex];

      mainImage.src = selectedImage.src;
      mainImage.alt = selectedImage.alt;

      thumbnails.querySelectorAll("img").forEach(function (img) {
        img.dataset.selected = false;
      });
      e.target.dataset.selected = true;
    });

    thumbnails.appendChild(thumb);
  });
}

//Product section

function populateProducts(productList) {
  let productsSection = document.querySelector(".products-area");
  productsSection.textContent = "";

  productList.forEach(function (product, index) {
    // create HTML element for the individual product
    let productElm = document.createElement("div");
    productElm.classList.add("product-item");

    // create the product image
    let productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = "Image for " + product.title;

    // create the product detail

    let productDetail = document.createElement("div");
    productDetail.classList.add("product-details");

    // Create product title , author, price-title and price

    let productTitle = document.createElement("h3");
    productTitle.classList.add("product-title");
    productTitle.textContent = product.title;

    let productAuthor = document.createElement("p");
    productAuthor.classList.add("product-author");
    productAuthor.textContent = product.author;

    let priceTitle = document.createElement("p");
    priceTitle.classList.add("price-title");
    priceTitle.textContent = "Price";

    let productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent =
      product.price > 0 ? `$${product.price.toFixed(2)}` : "Free";
    // append all details to the product
    productDetail.append(productTitle);
    productDetail.append(productAuthor);
    productDetail.append(priceTitle);
    productDetail.append(productPrice);

    // add all child HTML of the product
    productElm.append(productDetail);
    productElm.append(productImage);
    // add completed product to the product section
    productsSection.append(productElm);
  });
}

/*<div class="product-item">
            <img src="./assets/products/img6.png" alt="AstroFiction" />
            <div class="product-details">
              <h3 class="product-title">AstroFiction</h3>
              <p class="product-author">John Doe</p>
              <p class="price-title">Price</p>
              <p class="product-price">$ 49.90</p>
            </div>*/

function productsHandler() {
  let freeProducts = products.filter(function (item) {
    return !item.price || item.price <= 0;
  });
  let paidProducts = products.filter(function (item) {
    return item.price > 0;
  });

  populateProducts(products);

  document.querySelector(
    ".products-filter label[for=all] span.product-amount"
  ).textContent = products.length;
  document.querySelector(
    ".products-filter label[for=paid] span.product-amount"
  ).textContent = paidProducts.length;
  document.querySelector(
    ".products-filter label[for=free] span.product-amount"
  ).textContent = freeProducts.length;

  let productsFilter = document.querySelector(".products-filter");
  productsFilter.addEventListener("click", function (e) {
    if (e.target.id === "all") {
      populateProducts(products);
    } else if (e.target.id === "paid") {
      populateProducts(paidProducts);
    } else if (e.target.id === "free") {
      populateProducts(freeProducts);
    }
  });
}

// Footer section

function footerHandler() {
  let currentYear = new Date().getFullYear();
  document.querySelector(
    "footer"
  ).textContent = ` ©  ${currentYear} - All rights reserved`;
}

//Page Load

menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();
