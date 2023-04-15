

const mongoose = require('mongoose')

const ProgramSchema = new mongoose.Schema({

title:{type:String},
slug:{type:String},
rating:{type:Number},
programintovideourl:{type:String},
videoId:{type:Number},
imageUrl:{type:String},
imageId:{type:Number},
expert:{type:String},
expertDesignation:{type:String},
expertImage:{type:String},
author:{type:String},
programdescription:{type:String},
programCost:{type:Number},
discount:{type:Number},
numberofSessions:{type:Number},
plans:{
    week3 :{
        discount:{type:Number},
        price:{type:Number},
    },
    week6 :{
        discount:{type:Number},
        price:{type:Number},
    },
    week9 :{
        discount:{type:Number},
        price:{type:Number},
    },
    week12 :{
        discount:{type:Number},
        price:{type:Number},
    }
},
startDate:{type:Date},
programCategory:{type:String},
enrolledUser:{type:Number},
status:{type:String,default:"inactive"},
overview:{
    whatWeOffer :{type:String},
    theOutcome:{type:String},
    letTheDataSpeak:{
        batches:{type:Number},
        participants:{type:Number},
        benefitted:{type:Number}
    },
    overviewDescription:{type:String}
},
aboutTheExpert:{
    expertDescription:{type:String}
},
aboutTeam:{
    teamDescription:{type:String}
},
teamImage:{type:String},
howItWorks:{type:String},
structure:{type: mongoose.Schema.Types.Mixed},
FAQ:{type: mongoose.Schema.Types.Mixed}


},
{timestamps:true})


module.exports=mongoose.model('programs',ProgramSchema)
