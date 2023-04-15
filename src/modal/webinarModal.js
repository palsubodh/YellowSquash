

const mongoose = require('mongoose')

const webinarSchema = new mongoose.Schema({

image:{type:String},
webinarCategory:{type:String},
webinarTitle:{type:String},
expertName:{type:String},
expertImage:{type:String},
expertDesignation:{type:String},
expertCategory:{type:String},
expertDescription:{type:String},
webinarVideo:{type:String},
date:{type:String},
day:{type:String},
Starttime:{type:String},
Endtime:{type:String},
webinarDescription:{type:String},
sessionwillCover:{type:String},
youwillLearn:{type:String},
whoisitFor:{type:String},
experienceImage:{type:String},
experienceName:{type:String},
experienceDescription:{type:String},
experienceVideo:{type:String}
},
{timestamps:true})


module.exports=mongoose.model('webinar',webinarSchema)
