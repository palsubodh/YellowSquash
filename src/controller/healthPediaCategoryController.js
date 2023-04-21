const HealthCategoryModal = require('../modal/healthPediaCategory')
const StatusCodes = require('http-status-codes')
const healthPediaModel = require('../modal/healthpediaModal')



const createhealthPediaCategory = async(req,res)=>{

    try{
        let data = req.body
if(Object.keys(data).length==0) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"Please enter fileds "})
    let storedata = await HealthCategoryModal.create(data)
    res.status(StatusCodes.CREATED).json({status:true,data:storedata})

    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
    }

}
const updatehealthPediaCategory = async(req,res)=>{
    try{
        let data = req.body
        let Id= data.id
        let Data = await HealthCategoryModal.findOneAndUpdate({_id:Id},{$set:data,updateAt:new Date(Date.now())},{new:true})
        if(!Data) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"No category found"})
        res.status(StatusCodes.CREATED).json({status:true,data:Data})
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
    }
}


const deletehealthPediaCategory = async(req,res)=>{
    try{
        let value= req.params.categoryId
        let cat = req.params.category
      //  console.log(value,cat)
        let findvalue = await HealthCategoryModal.findById({_id:value})
        if(!findvalue) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"No category found"})
       findvalue[cat]=[]
       let findvaluebycat = await HealthCategoryModal.findByIdAndUpdate({_id:value},findvalue,{new:true})
        res.status(StatusCodes.OK).send({status:true})
    
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
    }
}

const getAllHealthPediacategory= async(req,res)=>{
    try{
        let data = await healthPediaModel.find()
        res.status(StatusCodes.OK).json({status:true,data:data})
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status:false,message:err.message})
    }
}



const gethealthPediaSingleCategory= async(req,res)=>{
    try{
      
     let cat = req.query
     cat=Object.keys(cat)
     let findData = await HealthCategoryModal.find()
     let arr=[]
     let data=findData[0][cat]
    
   
     for(let i=0;i<data.length;i++){
         let find = await healthPediaModel.findById({_id:data[i]})
         arr.push(find)
      }
     res.status(StatusCodes.OK).json({status:true,data:arr})
    }
    catch(err){
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
    }
 }


 const getListHealthPediaCategory= async(req,res)=>{
    try{
     let cat = req.query
     let findData = await HealthCategoryModal.find()
     let data = Object.keys(cat)
     let arr=[]
     let arr1=[]
     for(let i=0;i<data.length;i++){
       let category = data[i]
       let find=findData[0][category]

      if(find){
        for(let j=0;j<find.length;j++){
            let duplicate= arr.includes(find[j])
            if(!duplicate){
             arr.push(find[j])
            }    
        }
      }
      else{
        return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"please select valid category"})
      }
     }
     for(let i=0;i<arr.length;i++){
        let find = await healthPediaModel.findById({_id:arr[i]})
        arr1.push(find)
     }
     res.status(StatusCodes.OK).json({status:true,data:arr1})
    }
    catch(err){
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
    }
 }





module.exports ={createhealthPediaCategory,updatehealthPediaCategory,deletehealthPediaCategory,getAllHealthPediacategory,gethealthPediaSingleCategory,getListHealthPediaCategory}
