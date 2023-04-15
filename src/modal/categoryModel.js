const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    Yoga:[String],
    Diets:[String],
    Digestion:[String],
    Allergies:[String],
    AlternateTherapy:[String],
    SelfHelp:[String],
    communityWellness:[String],
    BoneElderlyLung:[String],
    KidTherapeutic:[String],
    HornonalIssues:[String],
    Thyroid:[String],
    Nutrition:[String],
    Accupressure:[String],
    MentalHealth:[String],
    HealthyLife:[String],
    Infertility:[String],
    HeartHealth:[String],
    ADHD:[String],
   
}
,{timestamps:true})

module.exports = mongoose.model("category",categorySchema)