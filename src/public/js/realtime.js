const socketCliente = io();
socketCliente.on("productos", (products) => {
console.log(products);
updateProductList(products);
});

function updateProductList(products) {
let div = document.getElementById("list-products");
let productos = "";

products.forEach((product) => {
productos += `
<article class="container">
    <div class="card">
        <div class="imgBx">
            <img src="${product.thumbnail}" width="150" />
        </div>
        <div class="contentBx">
            <h2>${product.title}</h2>
            <div class="size">
            <h3>${product.description}</h3>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
        </div>
            <div class="color">
            <h3>${product.price}</h3>
            <span></span>
            <span></span>
            <span></span>
        </div>
            <a href="#">Buy Now</a>
        </div>
    </div>
</article>
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
socketCliente.emit("addProduct", {
    title,
    detail,
    price,
    image,
    code,
    stock,
    id,
});
form.reset();
});

document.getElementById("delete-btn").addEventListener("click", function () {
const deleteidinput = document.getElementById("id-prod");
const deleteid = parseInt(deleteidinput.value);
socketCliente.emit("deleteProduct", deleteid);
deleteidinput.value = "";
});
socketCliente.on("productosupdated", (obj) => {
updateProductList(obj);
});