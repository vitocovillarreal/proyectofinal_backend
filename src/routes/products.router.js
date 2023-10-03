import {Router} from "express"
import ProductManager from "../dao/mongomanagers/productManagerMongo.js"
import { __dirname } from "../utils.js"

const manager=new ProductManager()
const router =Router()

router.get("/products",async(req,res)=>{
const products= await manager.getProducts()
    if(products.length ===0){
    res.json("No hay productos en la tienda")
    }else{
    res.json({message:"success",products})
    }
})

router.get("/products/:pid", async (req, res) => {
const productfind = await manager.getProductbyId(req.params);
    res.json({ status: "success", productfind });
});

router.post("/products", async (req, res) => {
const obj=req.body
const newproduct = await manager.addProduct(obj);
    res.json({ status: "success", newproduct });
});

router.put("/products/:pid", async (req, res) => {
const pid=req.params.pid
const obj=req.body
const updatedproduct = await manager.updateProduct(pid,obj);
    res.json({ status: "success", updatedproduct });
});

router.delete("/products/:pid", async (req, res) => {
const id=req.params.pid
const deleteproduct = await manager.deleteProduct(id);
    res.json({ status: "success",deleteproduct });
});

export default router