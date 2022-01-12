const mongoose = require("mongoose");
const mongoURI ="mongodb://localhost:27017/registered"

const connectTMongo=()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo succesfully");
    })
}

module.exports= connectTMongo;