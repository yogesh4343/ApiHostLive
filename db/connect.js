const mongoose = require('mongoose');

// const uri = ""


const connectDb  = (uri)=> {
    // console.log("connect bd")
    return mongoose.connect(uri , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });


}


module.exports = connectDb;