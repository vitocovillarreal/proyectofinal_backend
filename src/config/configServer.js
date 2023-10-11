import mongoose from "mongoose";
const URI="mongodb+srv://localhost:27017/"

const connectToDB = () => {
    try {
        mongoose.connect(URI)
        console.log('connected to DB The Book Store')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB