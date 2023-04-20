const mongoose = require('mongoose')

const healthPedia = new mongoose.Schema({
        title:{type:String},
        releaseDate:{type:String},
        category:{type:String},
        summary:{type:String},
        bannerImageUrl:{type:String},
        bannerImageUrlKey:{type:String},
        articleBody:{type:String},
        expertName:{type:String},
        expertImageUrlKey:{type:String},
        expertImageUrl:{type:String},
        slug:{type:String},
        status:{type:String}
},{timestamps:true})

module.exports = mongoose.model("healthPedia", healthPedia)