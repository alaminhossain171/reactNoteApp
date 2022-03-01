import mongoose from 'mongoose';
const { Schema } = mongoose;

const NoteSchema = new Schema({
title:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,

},
tag:{
    type:String,
default:'Generel'
},
date:{
    type:Date,
    default:Date.now
},
});

module.exports=mongoose.model('notes',NoteSchema);