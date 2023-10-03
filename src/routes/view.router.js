import { Router } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../dao/mongomanagers/productManagerMongo.js";

const pmanager =new ProductManager()
const router =Router()

router.get("/",async(req,res)=>{
const listadeproductos=await pmanager.getProducts()
  console.log(listadeproductos)
res.render("home",{listadeproductos})
})

router.get("/realtimeproducts",(req,res)=>{
res.render("realtimeproducts")
})

router.get("/chat",(req,res)=>{
res.render("chat")
})

export default router