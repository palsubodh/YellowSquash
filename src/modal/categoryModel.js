const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    yoga:[String],
    diets:[String],
    digestion:[String],
    allergies:[String],
    alternateTherapy:[String],
    selfHelp:[String],
    communityWellness:[String],
    boneElderlyLung:[String],
    kidTherapeutic:[String],
    hornonalIssues:[String],
    thyroid:[String],
    nutrition:[String],
    accupressure:[String],
    mentalHealth:[String],
    healthyLife:[String],
    infertility:[String],
    heartHealth:[String],
    ADHD:[String],
   
}
,{timestamps:true})

module.exports = mongoose.model("category",categorySchema)