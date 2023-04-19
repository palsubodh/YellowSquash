const webinarModal = require('../modal/webinarModal')
const uploadFile = require('./aws')
const StatusCodes = require('http-status-codes')
const categoryModel = require('../modal/webinarCategoryModal')

const createWebinar = async (req,res)=>{

    try{
        let data = req.body
        let files = req.files
        let{image,webinarCategory,webinarTitle,expertName,expertImage,expertDesignation,expertCategory,expertDescription,webinarVideo,date,day,Starttime,Endtime,webinarDescription,sessionwillCover,youwillLearn,whoisitFor,experienceImage,experienceName,experienceDescription,experienceVideo}= data
       
        //if(!image) return res.status(400).send({status:false,message:"Please Provide image"})
        if(!webinarCategory) return res.status(400).send({status:false,message:"Please Provide webinarCategory"})
        if(!webinarTitle) return res.status(400).send({status:false,message:"Please Provide webinarTitle"})
        if(!expertName) return res.status(400).send({status:false,message:"Please Provide expertName"})
        if(!expertCategory) return res.status(400).send({status:false,message:"Please Provide expertCategory"})
        if(!expertDescription) return res.status(400).send({status:false,message:"Please Provide expertDescription"})
        //if(!webinarVideo) return res.status(400).send({status:false,message:"Please Provide webinarVideo"})
        if(!expertDesignation) return res.status(400).send({status:false,message:"Please Provide expertDesignation"})
        if(!date) return res.status(400).send({status:false,message:"Please Provide date"})
        if(!day) return res.status(400).send({status:false,message:"Please Provide day"})
        if(!Starttime) return res.status(400).send({status:false,message:"Please Provide Starttime"})
        if(!Endtime) return res.status(400).send({status:false,message:"Please Provide Endtime"})
        if(!webinarDescription) return res.status(400).send({status:false,message:"Please Provide webinarDescription"})
        if(!sessionwillCover) return res.status(400).send({status:false,message:"Please Provide sessionwillCover"})
        if(!youwillLearn) return res.status(400).send({status:false,message:"Please Provide youwillLearn"})
        if(!whoisitFor) return res.status(400).send({status:false,message:"Please Provide whoisitFor"})
       // if(!experienceImage) return res.status(400).send({status:false,message:"Please Provide experienceImage"})
        if(!experienceName) return res.status(400).send({status:false,message:"Please Provide experienceName"})
        if(!experienceDescription) return res.status(400).send({status:false,message:"Please Provide experienceDescription"})
       // if(!experienceVideo) return res.status(400).send({status:false,message:"Please Provide experienceVideo"})
            //----------------------- Checking the File is present or not and Creating S3 Link ----------------------//
            if (files) {
    
                let uploadedFileURL = await uploadFile(files[0]);
                let uploadImageURL = await uploadFile(files[1])
                let webinarVideoUrl =await uploadFile(files[2])
                let experienceImageUrl = await uploadFile(files[3])
                let experienceVideoUrl = await uploadFile(files[4])
          data.image = uploadedFileURL;
          data.expertImage=uploadImageURL;
          data.webinarVideo=webinarVideoUrl;
          data.experienceImage=experienceImageUrl;
          data.experienceVideo = experienceVideoUrl;
            }
     
        let storeData = await webinarModal.create(data)
        res.status(StatusCodes.OK).send({status:true,data:storeData})
       }
       catch(err){
        return res.status(500).send({status:false,message:err.message})
       }
}

const  getallWebinar = async(req,res)=>{
    
   try{
    let data = await webinarModal.find()
    let categoryList = await categoryModel.find()
    let keys= categoryList[0]
        let key=Object.keys(keys._doc)
        key.pop(key[0])
        key.pop(key[0])
        key.pop(key[0])
        key.shift()
    if(data.length==0) return res.status(StatusCodes.NOT_FOUND).send({status:false,message:"Webinar not found"})
    res.status(StatusCodes.OK).send({status:true,message:"All webinar data",data:data,category:key})
   }
   catch(err){
    return res.status(500).send({status:false,message:err.message})
   }
}

const  getallWebinarById = async(req,res)=>{
    
    try{
        let webinarId = req.params.webinarId
     let data = await webinarModal.findOne({_id:webinarId})
     if(!data) return res.status(StatusCodes.NOT_FOUND).send({status:false,message:"Webinar not found"})
     res.status(StatusCodes.OK).send({status:true,data:data})
    }
    catch(err){
     return res.status(500).send({status:false,message:err.message})
    }
 }

 const updateWebinar = async (req,res)=>{
    try{
     let webinarId = req.body.webinarId
     let data = await webinarModal.findOneAndUpdate({_id:webinarId},req.body,{new:true})
     data.updatedAt=new Date(Date.now())
     if(!data) return res.status(400).send({status:false,message:"No programs found"})
    return res.status(200).send({status:true,message:"webinar updated successfully",data:data})
    }
    catch(err){
     return res.status(500).send({status:false,message:err.message})
    }
 }
 const deleteWebinar = async(req,res)=>{
    try{
        let webinarId = req.params.webinarId
        let data = await webinarModal.findOneAndDelete({_id:webinarId},{new:true})
        if(!data) return res.status(400).send({status:false,message:"No webinar found"})
       return res.status(200).send({status:true,message:"webinar deleted successfully"})
       }
       catch(err){
        return res.status(500).send({status:false,message:err.message})
       }
}


const  upcomingWebinar = async(req,res)=>{
    
    try{
     let data = await webinarModal.find()
     let categoryList = await categoryModel.find()
     let keys= categoryList[0]
         let key=Object.keys(keys._doc)
         key.pop(key[0])
         key.pop(key[0])
         key.pop(key[0])
         key.shift()
     if(data.length==0) return res.status(StatusCodes.NOT_FOUND).send({status:false,message:"Webinar not found"})
     const currentDate = new Date();
       // Filter programs that have a date greater than or equal to the current date
       const upcoming = data.filter(program => new Date(program.date) >= currentDate);
     res.status(StatusCodes.OK).send({status:true,message:"All webinar data",data:upcoming,category:key})
    }
    catch(err){
     return res.status(500).send({status:false,message:err.message})
    }
 }

module.exports={createWebinar,getallWebinar,getallWebinarById,updateWebinar,deleteWebinar,upcomingWebinar}