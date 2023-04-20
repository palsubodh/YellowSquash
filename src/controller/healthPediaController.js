const healthPediaModel = require('../modal/healthpediaModal')
const StatusCodes = require('http-status-codes')
const uploadFile = require('../controller/aws')


const create = async (req, res) => {
    try {
        let payload = req.body
    let files = req.files

    if(!payload || Object.keys(payload).length == 0) {
        return res.status(StatusCodes.BAD_REQUEST).send({status: false, message: "Body cant be empty"})
    }

    // console.log("payload recieved...");

    let { title,
        summary,
        articleBody,
        expertName,
        slug,
        status } = payload

        if(!title || title.length == 0) {
            return res.status(StatusCodes.BAD_REQUEST).send({status: false, message: "Title cant be empty"})
        }
    
        if(!summary || summary.length == 0) {
            return res.status(StatusCodes.BAD_REQUEST).send({status: false, message: "summary cant be empty"})
        }
    
        if(!articleBody || articleBody.length == 0) {
            return res.status(StatusCodes.BAD_REQUEST).send({status: false, message: "articleBody cant be empty"})
        }
    
        if(!expertName || expertName.length == 0) {
            return res.status(StatusCodes.BAD_REQUEST).send({status: false, message: "expertName cant be empty"})
        }
    
        if(!slug || slug.length == 0) {
            return res.status(StatusCodes.BAD_REQUEST).send({status: false, message: "slug cant be empty"})
        }
    
        if(!status || status.length == 0) {
            return res.status(StatusCodes.BAD_REQUEST).send({status: false, message: "status cant be empty"})
        }

        // console.log("Error in authenticating payload...");

        if (files) {
            let uploadedBannerImageUrl = await uploadFile(files[0]);
            let uploadedExpertImageUrl = await uploadFile(files[1])
            payload.bannerImageUrl = uploadedBannerImageUrl;
            payload.expertImageUrl=uploadedExpertImageUrl;
        }

        // console.log("File uploaded to aws...");

        let persistPayload = await healthPediaModel.create(payload)

        // console.log("data persisted in db...");

        return res.status(StatusCodes.OK).send({status: true, data: persistPayload})
    } catch(err) {
        // console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status: false, message: err.message})
    }
}


const getAllHealthPedia = async(req,res)=>{

    try{
        let data = await healthPediaModel.find()
        if(data.length==0) return res.status(StatusCodes.NOT_FOUND).send({status:false,message:"No data found"})
        res.status(StatusCodes.OK).send({status:true,message:"All Programs data",data:data})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


const getHealthPediaById = async(req,res)=>{

    try{
        let id = req.params.Id
        let data = await healthPediaModel.find({_id:id})
        if(!data) return res.status(StatusCodes.NOT_FOUND).send({status:false,message:"No data found"})
        res.status(StatusCodes.OK).send({status:true,data:data})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


const updateHealthpedia = async (req,res)=>{
    try{
     let healthPediaId = req.body.Id
     let data = await healthPediaModel.findOneAndUpdate({_id:healthPediaId},req.body,{new:true})
     data.updatedAt=new Date(Date.now())
     if(!data) return res.status(400).send({status:false,message:"No programs found"})
    return res.status(200).send({status:true,message:"HealthPedia updated successfully",data:data})
    }
    catch(err){
     return res.status(500).send({status:false,message:err.message})
    }
 }

 const deleteHealthPedia = async(req,res)=>{
    try{
        let healthPediaId = req.params.healthPediaId
        let data = await healthPediaModel.findOneAndDelete({_id:healthPediaId},{new:true})
        if(!data) return res.status(400).send({status:false,message:"No programs found"})
       return res.status(200).send({status:true,message:"Program deleted successfully"})
       }
       catch(err){
        return res.status(500).send({status:false,message:err.message})
       }
}

module.exports = {create,getAllHealthPedia,getHealthPediaById,updateHealthpedia,deleteHealthPedia}