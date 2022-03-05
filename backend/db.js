const mongoose = require('mongoose');

const mongoURI="mongodb://localhost:27017/iNotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";


const CallMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('mongo connected successfully!');
    })
}
module.exports=CallMongo;