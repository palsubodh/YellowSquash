const programModal = require('../modal/programModal')
const uploadFile = require('../controller/aws')
const categoryModel = require('../modal/categoryModel')

const createProgram = async(req,res)=>{

   try{
    let data = req.body
    let files = req.files
    let{title,slug,rating,videoId,imageId,expert,expertDesignation,expertImage,teamImage,author,programdescription,programCost,numberofSessions,durationinWeeks,startDate,programCategory,enrolledUser,overview,aboutTheExpert,aboutTeam,howItWorks,structure,FAQ}= data
    /// this is explicit handle for nested object in mongodb
   let obj={}
     obj.overview=JSON.parse(overview)
     obj.aboutTheExpert=JSON.parse(aboutTheExpert)
    if(!title) return res.status(400).send({status:false,message:"Please Provide title"})
    if(!slug) return res.status(400).send({status:false,message:"Please Provide slug"})
    if(!rating) return res.status(400).send({status:false,message:"Please Provide rating"})
    // if(!programintovideourl) return res.status(400).send({status:false,message:"Please Provide programintovideourl"})
    if(!videoId) return res.status(400).send({status:false,message:"Please Provide videoId"})
    // if(!imageUrl) return res.status(400).send({status:false,message:"Please Provide imageUrl"})
    if(!imageId) return res.status(400).send({status:false,message:"Please Provide imageId"})
    if(!expert) return res.status(400).send({status:false,message:"Please Provide expert"})
    if(!expertDesignation) return res.status(400).send({status:false,message:"Please Provide expertDesignation"})

    if(!author) return res.status(400).send({status:false,message:"Please Provide author"})
    if(!programdescription) return res.status(400).send({status:false,message:"Please Provide programdescription"})
    if(!programCost) return res.status(400).send({status:false,message:"Please Provide programCost"})
    if(!numberofSessions) return res.status(400).send({status:false,message:"Please Provide numberofSessions"})
    if(!durationinWeeks) return res.status(400).send({status:false,message:"Please Provide durationinWeeks"})
    if(!startDate) return res.status(400).send({status:false,message:"Please Provide startDate"})

    if(!programCategory) return res.status(400).send({status:false,message:"Please Provide programCategory"})
    if(!enrolledUser) return res.status(400).send({status:false,message:"Please Provide enrolledUser"})
    if(!overview) return res.status(400).send({status:false,message:"Please Provide overview"})
    if(!aboutTheExpert) return res.status(400).send({status:false,message:"Please Provide aboutTheExpert"})
    if(!aboutTeam) return res.status(400).send({status:false,message:"Please Provide aboutTeam"})
    if(!howItWorks) return res.status(400).send({status:false,message:"Please Provide howItWorks"})
    if(!structure) return res.status(400).send({status:false,message:"Please Provide structure"})
    if(!FAQ) return res.status(400).send({status:false,message:"Please Provide FQA"})
        //----------------------- Checking the File is present or not and Creating S3 Link ----------------------//
        if (files) {

            let uploadedFileURL = await uploadFile(files[0]);
            let uploadImageURL = await uploadFile(files[1])
            let expertURL =await uploadFile(files[2])
            let teamURL = await uploadFile(files[3])
      data.programintovideourl = uploadedFileURL;
      data.imageUrl=uploadImageURL;
      data.expertImage=expertURL;
      data.teamImage=teamURL;
        }
 
        data.overview = obj.overview
        data.aboutTheExpert=obj.aboutTheExpert
    let storeData = await programModal.create(data)
    res.status(201).send({status:true,data:storeData})
   }
   catch(err){
    return res.status(500).send({status:false,message:err.message})
   }
}


const getallPrograms = async(req,res)=>{

    try{
        let data = await programModal.find()
        let categoryList = await categoryModel.find()
        let keys= categoryList[0]
        let key=Object.keys(keys._doc)
        key.pop(key[0])
        key.pop(key[0])
        key.pop(key[0])
        key.shift()
        // for(let i=0;i<data.length;i++){
        //     let newdata = data[i]
        //  newdata.category=key
        // }
       if(data.length==0) return res.status(400).send({status:false,message:"No programs find"})
         res.status(200).send({status:true,message:"All Programs data",data:data,category:key})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

const getprogrambyId = async(req,res)=>{

    try{
        let programId= req.params.programId
        let data = await programModal.findOne({_id:programId})
       if(data==null) return res.status(400).send({status:false,message:"No programs find"})
         res.status(200).send({status:true,message:"Program Found",data:data})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}
const updatePrograms = async (req,res)=>{
   try{
    let programId = req.body.programId
    let data = await programModal.findOneAndUpdate({_id:programId},req.body,{new:true})
    data.updatedAt=new Date(Date.now())
    if(!data) return res.status(400).send({status:false,message:"No programs found"})
   return res.status(200).send({status:true,message:"Program updated successfully",data:data})
   }
   catch(err){
    return res.status(500).send({status:false,message:err.message})
   }
}

const deletePrograms = async(req,res)=>{
    try{
        let programId = req.params.programId
        let data = await programModal.findOneAndDelete({_id:programId},{new:true})
        if(!data) return res.status(400).send({status:false,message:"No programs found"})
       return res.status(200).send({status:true,message:"Program deleted successfully"})
       }
       catch(err){
        return res.status(500).send({status:false,message:err.message})
       }
}


module.exports ={createProgram,getallPrograms,updatePrograms,deletePrograms,getprogrambyId}
