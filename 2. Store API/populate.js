require('dotenv').config()

const connectDB = require('./db/connect')
const productModel = require('./models/product')
const productJSON = require('./products.json')

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log('connect ho gya')
        await productModel.deleteMany()
        await productModel.create(productJSON)
        console.log('data pushed')
        process.exit(0) // to exit the process, ) means everything went well
    } catch(e){
        console.log(e)
        process.exit(1)
    }
}
start()