const categoryModel = require('../modal/categoryModel')
const StatusCodes = require('http-status-codes')
const programModal = require('../modal/programModal')


const createCategory = async(req,res)=>{

    try{
        let data = req.body
if(Object.keys(data).length==0) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"Please enter fileds "})
    let storedata = await categoryModel.create(data)
    res.status(StatusCodes.CREATED).json({status:true,data:storedata})

    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
    }

}

const updateCategory = async(req,res)=>{
    try{
        let data = req.body
        let Id= data.id
        let Data = await categoryModel.findOneAndUpdate({_id:Id},{$set:data,updateAt:new Date(Date.now())},{new:true})
        if(!Data) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"No category found"})
        res.status(StatusCodes.CREATED).json({status:true,data:Data})
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
    }
}

const deleteCategory = async(req,res)=>{
    try{
        let value= req.params.categoryId
        let cat = req.params.category
      //  console.log(value,cat)
        let findvalue = await categoryModel.findById({_id:value})
        if(!findvalue) return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:"No category found"})
       findvalue[cat]=[]
       let findvaluebycat = await categoryModel.findByIdAndUpdate({_id:value},findvalue,{new:true})
        res.status(StatusCodes.OK).send({status:true})
    
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
    }
}

const getAllcategory= async(req,res)=>{
    try{
        let data = await programModal.find()
        res.status(StatusCodes.OK).json({status:true,data:data})
    }
    catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status:false,message:err.message})
    }
}


const getSingleCategory= async(req,res)=>{
   try{
     
    let cat = req.query
    cat=Object.keys(cat)
    let findData = await categoryModel.find()
    let arr=[]
    let data=findData[0][cat]
  
    for(let i=0;i<data.length;i++){
        let find = await programModal.findById({_id:data[i]})
        arr.push(find)
     }
     if(arr.length==0) return res.status(StatusCodes.NOT_FOUND).json({status:false,message:"Data not found"})
    res.status(StatusCodes.OK).json({status:true,data:arr})
   }
   catch(err){
    //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
   }
}

const getListCategory= async(req,res)=>{
    try{
     let cat = req.query
     let findData = await categoryModel.find()
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
        let find = await programModal.findById({_id:arr[i]})
        arr1.push(find)
     }
    
     if(arr1.length==0) return res.status(StatusCodes.NOT_FOUND).json({status:false,message:"Data not found"})
     res.status(StatusCodes.OK).json({status:true,data:arr1})
    }
    catch(err){
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:err.message})
    }
 }

module.exports ={createCategory,updateCategory,deleteCategory,getAllcategory,getSingleCategory,getListCategory}