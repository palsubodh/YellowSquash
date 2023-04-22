const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({


  programId :{type:String},
  BatchDetails:{type: mongoose.Schema.Types.Mixed}

},{timestamps:true})

module.exports = mongoose.model("programBatchSession",sessionSchema)