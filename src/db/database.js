import mongoose from 'mongoose';

const URI="mongodb+srv://localhost:27017/"

try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
    } catch (error) {
    console.log(`ERROR => ${error}`);
}