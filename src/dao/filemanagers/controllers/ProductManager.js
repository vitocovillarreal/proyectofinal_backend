import fs from "fs"

export default class ProductManager{
    constructor(path){
    this.path=path
}
    getProducts=async(info)=>{
    const {limit}=info
        try{
        if(fs.existsSync(this.path)){
        const productlist= await fs.promises.readFile(this.path,"utf-8")
        const productlistparse=JSON.parse(productlist)
        const productlistsliced=productlistparse.slice(0,limit)
            return productlistsliced
        }else{
            console.error("Error al listar productos")
            return
            }
        }
        catch(error)
        {
        throw new Error(error)
        }
    }

    getProductbyId=async(id)=>{
        const{pid}=id
        const allproducts=await this.getProducts({})
        const found=allproducts.find(element=>element.id===parseInt(pid))
        if(found){
            return found
        }
        else{
            console.error("Producto no encontrado")
        }
    }

    generateId=async()=>{
        if(fs.existsSync(this.path)){
        const listaproducts=await this.getProducts({})
        const counter=listaproducts.length
        if(counter==0){
            return 1
        }else{
            return (listaproducts[counter-1].id)+1
            }
        }
    }

    addProduct=async(obj)=>{
        const {title, detail, price, image, code, stock, id}=obj
        if(title===undefined || detail===undefined || price===undefined || image===undefined || code===undefined||stock===undefined || id===undefined){
            console.error("INGRESE TODOS LOS DATOS DEL PRODUCTO")
            return 
        }else{
        const listaproducts=await this.getProducts({})
        const codigorepetido=listaproducts.find(elemento=>elemento.code===code)
        if(codigorepetido){
            console.error("EL CODIGO DEL PRODUCTO QUE DESEA AGREGAR ES REPETIDO")
            return
        }else{
        const id=await this.generateId()
        const productnew = {
            title,
            detail,
            price,
            image,
            code,
            stock,
            id,
        }
        listaproducts.push(productnew)
            await fs.promises.writeFile(this.path,JSON.stringify(listaproducts,null,2))
            }
        }
    }

    updateProduct=async(id,obj)=>{
        const {pid}=id
        const{title,description,price,thumbnail,category,status,code,stock}=obj
        if(title===undefined || description===undefined || price===undefined || category===undefined || status===undefined || code===undefined||stock===undefined){
        console.error("INGRESE TODOS LOS DATOS DEL PRODUCTO PARA SU ACTUALIZACION")
        return 
        }else{
        const allproducts=await this.getProducts({})
        const codigorepetido=allproducts.find(elemento=>elemento.code===code)
        if(codigorepetido){
        console.error("EL CODIGO DEL PRODUCTO QUE DESEA ACTUALIZAR ES REPETIDO")
        return
        }else{
        const newProductsList=allproducts.map(elemento=>{
        if(elemento.id===parseInt(pid)){
        const updatedProduct={
        ...elemento,
        title, detail, price, image, code, stock, id
        }
            return updatedProduct
            }
        else{
            return elemento
            }
        })
            await fs.promises.writeFile(this.path,JSON.stringify(newProductsList,null,2))     
            } 
        }
    }
    
    deleteProduct=async(pid)=>{
        const allproducts=await this.getProducts({})
        const productswithoutfound=allproducts.filter(elemento=>elemento.id!==parseInt(pid))
        await fs.promises.writeFile(this.path,JSON.stringify(productswithoutfound,null,2))
    }
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