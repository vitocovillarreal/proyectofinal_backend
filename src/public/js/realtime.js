const socketClient=io()

socketClient.on("enviodeproducts",(obj)=>{
updateProductList(obj)
})

function updateProductList(products) {
    let div = document.getElementById("contenedor");
    let productos = "";

    products.forEach((product) => {
    productos += `
    <div class="card">
    <div class="basicInfo">
    <div class="title">
    <div class="category">Best Sellers</div>
    <div class="name">${product.title}</div>
    <div class="info">${product.detail}</div>
    </div>
    <div class="images">
    <div class="img">
    <div class="item">
    <img src="${product.image}">
    </div>
    </div>
    </div>
    <div class="colors">
    <label for="green">
    <div class="name">ss</div>
    <div class="ellipse" style="background:#CADB6E"></div>
    </label>
    <label for="black">
    <div class="name">Black</div>
    <div class="ellipse" style="background:#2B2B2B"></div>
    </label>
    </div>
    <div class="addCard">
    <i class="fa-solid fa-basket-shopping"></i>
    </div>
    </div>
    <div class="mores">
    <div class="stars">
    <i class="fa-regular fa-star text-yellow"></i>
    <i class="fa-regular fa-star text-yellow"></i>
    <i class="fa-regular fa-star text-yellow"></i>
    <i class="fa-regular fa-star text-yellow"></i>
    <i class="fa-regular fa-star"></i>
    </div>
    <div class="price">${product.price}</div>
    </div>
</div>
    `;
    });

div.innerHTML = productos;
}

let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
evt.preventDefault();

let title = form.elements.title.value;
let detail = form.elements.detail.value;
let stock = form.elements.stock.value;
let image = form.elements.image.value;
let price = form.elements.price.value;
let code = form.elements.code.value;
let id = form.elements.id.value;

socketClient.emit("addProduct", {
    title,
    detail,
    stock,
    image,
    price,
    code,
    id,
});

form.reset();
});

document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteidinput = document.getElementById("id-prod");
    const deleteid = deleteidinput.value;
    console.log(deleteid)
    socketClient.emit("deleteProduct", deleteid);
    deleteidinput.value = "";
  });