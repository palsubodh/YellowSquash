const programModal = require('../modal/programModal')

const createProgram = async(req,res)=>{

   try{
    let data = req.body
    let{title,slug,rating,programintovideourl,videoId,imageUrl,imageId,expert,author,programdescription,programCost,numberofSessions,durationinWeeks,startDate}= data
    if(!title) return res.status(400).send({status:false,message:"Please Provide title"})
    if(!slug) return res.status(400).send({status:false,message:"Please Provide slug"})
    if(!rating) return res.status(400).send({status:false,message:"Please Provide rating"})
    if(!programintovideourl) return res.status(400).send({status:false,message:"Please Provide programintovideourl"})
    if(!videoId) return res.status(400).send({status:false,message:"Please Provide videoId"})
    if(!imageUrl) return res.status(400).send({status:false,message:"Please Provide imageUrl"})
    if(!imageId) return res.status(400).send({status:false,message:"Please Provide imageId"})
    if(!expert) return res.status(400).send({status:false,message:"Please Provide expert"})
    if(!author) return res.status(400).send({status:false,message:"Please Provide author"})
    if(!programdescription) return res.status(400).send({status:false,message:"Please Provide programdescription"})
    if(!programCost) return res.status(400).send({status:false,message:"Please Provide programCost"})
    if(!numberofSessions) return res.status(400).send({status:false,message:"Please Provide numberofSessions"})
    if(!durationinWeeks) return res.status(400).send({status:false,message:"Please Provide durationinWeeks"})
    if(!startDate) return res.status(400).send({status:false,message:"Please Provide startDate"})
  
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
       if(data.length==0) return res.status(400).send({status:false,message:"No programs find"})
         res.status(200).send({status:true,message:"All Programs data",data:data})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


const updatePrograms = async (req,res)=>{
   try{
    let programId = req.body.programId
    let data = await programModal.findOneAndUpdate({_id:programId},req.body,{new:true})
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


module.exports ={createProgram,getallPrograms,updatePrograms,deletePrograms}
