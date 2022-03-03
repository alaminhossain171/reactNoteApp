const mongoose = require('mongoose');

const mongoURI='mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';


const CallMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('mongo connected successfully!');
    })
}
module.exports=CallMongo;