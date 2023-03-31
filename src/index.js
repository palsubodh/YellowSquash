const express= require('express')
const { default: mongoose } = require('mongoose')
const route= require('./routes/route')
const app = express()

require('dotenv').config({path:'./.env'})

app.use(express.json())
mongoose
  .connect(
    process.env.MONGO_URL
    ,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is Connected."))
  .catch((error) => console.log(error));


app.use("/",route)

app.use(function (req, res) {
  var err = new Error("Not Found.")
  err.status = 404
  return res.status(404).send({ status: "404", msg: "Path not Found." })
})



app.listen(process.env.PORT  ,function(){
    console.log(  `Express App Running on Port ${process.env.PORT}`)
})

