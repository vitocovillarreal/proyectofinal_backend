import fs from "fs";

export default class ProductManager {
    constructor(path) {
    (this.path = path), (this.products = []);
}

    getProducts = async (info) => {
    try {
        const { limit } = info;
        if (fs.existsSync(this.path)) {
        const productlist = await fs.promises.readFile(this.path, "utf-8");
        const productlistJs = JSON.parse(productlist);
        if (limit) {
        const limitProducts = productlistJs.slice(0, parseInt(limit));
            return limitProducts;
        } else {
            return productlistJs;
        }
        } else {
            return [];
        }
    } catch (error) {
    throw new Error(error);
    }
};

    getProductbyId = async (id) => {
    try {
        const {pid}=id
        if (fs.existsSync(this.path)) {
        const allproducts = await this.getProducts({});
        const found = allproducts.find((element) => element.id === parseInt(pid));
        if (found) {
            return found;
        } else {
        throw new Error("Producto no existe");
        }
        } else {
        throw new Error("Product file not found");
        }
    } catch (error) {
    throw new Error(error);
    }
};

    generateId = async () => {
    try {
        if (fs.existsSync(this.path)) {
        const productlist = await fs.promises.readFile(this.path, "utf-8");
        const productlistJs = JSON.parse(productlist);
        const counter = productlistJs.length;
        if (counter == 0) {
            return 1;
        } else {
            return productlistJs[counter - 1].id + 1;
        }
        }
    } catch (error) {
    throw new Error(error);
    }
};

    addProduct = async (obj) => {
        const {title, detail, price, image, code, stock, id}=obj
        if (!title || !detail || !price || !image || !code || !stock ||!id) {
            console.error("INGRESE TODOS LOS DATOS DEL PRODUCTO");
            return;
        } else {
        const listadoProductos=await this.getProducts({})
        const codigorepetido = listadoProductos.find(
            (elemento) => elemento.code === code
        );
        if (codigorepetido) {
            console.error("EL CODIGO DEL PRODUCTO QUE DESEA AGREGAR ES REPETIDO");
        return;
        } else {
        const id = await this.generateId();
        const productnew = {
            title,
            detail,
            price,
            image,
            code,
            stock,
            id,
        };
            listadoProductos.push(productnew);
            await fs.promises.writeFile(this.path,
            JSON.stringify(listadoProductos, null, 2)
            );
        }
    }
};

    updateProduct = async (id,obj) => {
        const {pid}=id
        const {title, detail, price, image, code, stock, id}=obj
        if(title===undefined || detail===undefined || price===undefined || image===undefined || code===undefined||stock===undefined || id===undefined){
            console.error("INGRESE TODOS LOS DATOS DEL PRODUCTO PARA SU ACTUALIZACION");
                return;
        } else {
        const listadoProductos = await this.getProducts({});
        const codigorepetido = listadoProductos.find( (i) => i.code === code);
        if (codigorepetido) {
            console.error(
        "EL CODIGO DEL PRODUCTO QUE DESEA ACTUALIZAR ES REPETIDO"
        );
            return;
        } else {
        const listadoProductos = await this.getProducts({});
        const newProductsList = listadoProductos.map((elemento) => {
        if (elemento.id === parseInt(pid)) {
        const updatedProduct = {
            ...elemento,
            title,
            detail,
            price,
            image,
            code,
            stock,
            id,
        };
            return updatedProduct;
        } else {
            return elemento;
        }
        });
        await fs.promises.writeFile(this.path,JSON.stringify(newProductsList, null, 2));
        }
    }
};

    deleteProduct = async (id) => {
        const{pid}=id
        const allproducts = await this.getProducts({});
        const productswithoutfound = allproducts.filter(
            (elemento) => elemento.id !==  parseInt(pid)
        );
        await fs.promises.writeFile(
        this.path,
        JSON.stringify(productswithoutfound, null, 2)
        );
    };
}

// async function generator(){

// const productmanager=new ProductManager("./files/products.json");
// // await productmanager.addProduct("product1","detail1",41000,"image","9788466356985",15)
// // await productmanager.addProduct("product2","detail2",13500,"image","9788499083209",40)
// // await productmanager.addProduct("product3","detail3",37000,"image","9786070753749",100)
// // await productmanager.updateProduct(3,"zzzzz","xxxxxx",12500,"image","abc126",500)
// // await productmanager.deleteProduct(2)
// const solo=await productmanager.getProductbyId(1)

// // const listado=await productmanager.getProducts()
// console.log(solo)
// }

// generator()