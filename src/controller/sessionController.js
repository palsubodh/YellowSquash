const sessionModal = require('../modal/sessionModal')
const StatusCodes = require('http-status-codes')

const createBatch = async(req,res)=>{

    try{
        let data= req.body
    
    let storeData = await sessionModal.create(data)
    return res.status(StatusCodes.CREATED).send({status:true,message:"Batch created successfully",data:storeData})
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status:false,message:err.message})
    }
}

const updateSession = async(req,res)=>{
    try{
        let data = req.body
        let programId= req.body.programId
        let Id= data.id
        let {BatchDetails}= data
        let Data = await sessionModal.findOne({_id:Id,programId:programId})
       
        if(!Data) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"No Session found"})
        let Previousbatchdetails= Data.BatchDetails
        // console.log(Previousbatchdetails)
        if(Data){
            //for loop for body data
            let arr =[]
            let arr1=[]
            for(let i=0;i<BatchDetails.length;i++){
                let count=0
               for(let j=0;j<Previousbatchdetails.length;j++)
               {
                if(BatchDetails[i].batchId == Previousbatchdetails[j].batchId){
                    // console.log("matched")
                    count++
            
                   let checksessionId = BatchDetails[i].sessionDetails
                //    console.log(checksessionId)

                   for(let k=0;k<checksessionId.length;k++){
                    // console.log(checksessionId[k].sessionId)
                    let count1 =0
                        let sessionDetails = Previousbatchdetails[j].sessionDetails
                        for(let l=0;l<sessionDetails.length;l++){
                            // console.log(sessionDetails[l].sessionId)
                            if(checksessionId[k].sessionId == sessionDetails[l].sessionId){
                                count1++
                               sessionDetails[l].sessionRecording = checksessionId[k].sessionRecording
                               sessionDetails[l].sessionResources = checksessionId[k].sessionResources

                                let updateBatch = await sessionModal.findOneAndUpdate({_id:Id,programId:programId,BatchDetails:{$elemMatch:{batchId:BatchDetails[i].batchId}}},
                                    {$set:{"BatchDetails.$.sessionDetails":sessionDetails}},{new:true})
                                return res.status(StatusCodes.OK).json({status:true,data:updateBatch})  
                            }
                            
                        }
                        if(count1==0){
                            arr1.push(checksessionId[k])
                            if(k==checksessionId.length-1)
                            { 
                                for(let s=0;s<arr1.length;s++){
                                    sessionDetails.push(arr1[s])
                                }

                                 //  console.log(sessionDetails,Previousbatchdetails[j])
                                let updateBatch = await sessionModal.findOneAndUpdate({_id:Id,programId:programId,BatchDetails:{$elemMatch:{batchId:BatchDetails[i].batchId}}},
                                    {$set:{"BatchDetails.$.sessionDetails":sessionDetails}},{new:true})
                                return res.status(StatusCodes.OK).json({status:true,data:updateBatch})  
                            } 
                         
                            
                        }
                   }
                }
               }
               // Batch id not present // unique batch
               if(count==0){
                 arr.push(BatchDetails[i])
                if(i==BatchDetails.length-1)
                { 
                    for(let s=0;s<arr.length;s++){
                        Previousbatchdetails.push(arr[s])
                    }
            let updateBatch = await sessionModal.findOneAndUpdate({_id:Id,programId:programId},{BatchDetails:Previousbatchdetails},{new:true})
             return  res.status(StatusCodes.OK).json({status:true,data:updateBatch})    
                }
               
               
            }
            }

        }
        res.status(StatusCodes.CREATED).json({status:true,data:Data})
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
    }
}

const getsession = async(req,res)=>{
   try{
    let programId = req.params.id
    let batchId = req.params.batchId
    
    let getData = await sessionModal.findOne({programId:programId})
    
    if(!getData) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"No Session found"})

       let count = 0
        let x = getData.BatchDetails
        for(let j=0;j<x.length;j++){
            
            if(x[j].batchId==batchId){
                
                count++
                return res.status(StatusCodes.OK).json({status:true,data:x[j]})
            }
        }
        if(count==0) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"Batch Id does not exits"})
   }
   catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
}
}


const deleteBatchfromBatchId = async(req,res)=>{
    try{
     let programId = req.params.id
     let batchId = req.params.batchId
     
     let getData = await sessionModal.findOne({programId:programId})
     
     if(!getData) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"No Program found"})
 
        let count = 0
         let x = getData.BatchDetails
         for(let j=0;j<x.length;j++){
             if(x[j].batchId==batchId){
                x.splice(j,1)
                 count++
                 let updateBatch = await sessionModal.findOneAndUpdate({programId:programId},{BatchDetails:x},{new:true})
                 return res.status(StatusCodes.OK).json({status:true,data:updateBatch})
             }
         }
         if(count==0) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"Batch Id does not exits"})
    }
    catch(err){
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
 }
 }
 
 const deleteSessionfromSessionId = async(req,res)=>{
    try{
     let programId = req.params.id
     let batchId = req.params.batchId
     let sessionId = req.params.sessionId
     
     let getData = await sessionModal.findOne({programId:programId})
     
     if(!getData) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"No Program found"})
 
        let count = 0
         let x = getData.BatchDetails
         for(let j=0;j<x.length;j++){
             if(x[j].batchId==batchId){
                let session = x[j].sessionDetails
                let count1 =0
               for(let k=0;k<session.length;k++){
                if(session[k].sessionId==sessionId){
                    count1++
                    session.splice(k,1)
                    let updateBatch = await sessionModal.findOneAndUpdate({programId:programId},{BatchDetails:x},{new:true})
                    return res.status(StatusCodes.OK).json({status:true,data:updateBatch})
                }
               }
               if(count1==0) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"session Id does not exits"})
                 count++
               
             }
         }
         if(count==0) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"Batch Id does not exits"})
    }
    catch(err){
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
 }
 }


module.exports ={createBatch,updateSession,getsession,deleteBatchfromBatchId,deleteSessionfromSessionId}