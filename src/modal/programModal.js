

const mongoose = require('mongoose')

const ProgramSchema = new mongoose.Schema({
title:{type:String},
slug:{type:String},
rating:{type:Number},
programintovideourl:{type:String},
videoId:{type:String},
imageUrl:{type:String},
imageId:{type:String},
expert:{type:String},
author:{type:String},
programdescription:{type:String},
programCost:{type:Number},
numberofSessions:{type:Number},
durationinWeeks:{type:Number},
startDate:{type:Date},
status:{type:String,default:"inactive"}

},{timestamps:true})

module.exports=mongoose.model('programs',ProgramSchema)