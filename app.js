const express = require('express');
require('dotenv').config();
const connectDb = require('./db/connect');
const product_router = require('./routes/products');



const app = express()
// var router = express.Router();
const PORT = process.env.PORT || 4000



// app.get('/' , (req, res) => {
//     res.send("hii live")

// })

// middleware 
app.use('/api/products' , product_router);



// connect 
const start = async() => {
    try {
        await connectDb(process.env.MONGODB_URL);

        app.listen(PORT  , ()=>{
           console.log( `${PORT} is conn`)
        })
    } catch (error) {
            console.log(error)
    }
}
start()