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
        let {BatchDetails,batchId,sessionDetails} = data
        let Id= data.id
        let Data = await sessionModal.findOneAndUpdate({_id:Id},{$set:data,updateAt:new Date(Date.now())},{new:true})
        let BatchDetail = Data.BatchDetails
        // console.log(Object.keys(BatchDetail))

        for(let i=0;i<BatchDetail.length;i++){
            let x = BatchDetail[i].batchId === batchId
            console.log("already exits")
            //next step update
        }
    
        // let key =Object.keys(Data.BatchDetails)
        // let sessions =Data.BatchDetails[key]
        // let sessionKey = Object.keys(sessions.sessionDetails) 
       // console.log(key)
        
      //  console.log(Object.keys(Data.BatchDetails)[0].sessionDetails)
        if(!Data) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"No Session found"})
        res.status(StatusCodes.CREATED).json({status:true,data:Data})
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
    }
}

module.exports ={createBatch,updateSession}