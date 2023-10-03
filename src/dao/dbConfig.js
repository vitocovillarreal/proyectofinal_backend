import mongoose from "mongoose"

const URI="mongodb+srv://"
mongodb://localhost:27017

await mongoose.connect(URI,{
    serverSelectionTimeoutMS:5000,
})
    console.log("Base de datos conectada....")