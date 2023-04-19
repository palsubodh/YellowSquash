require('dotenv').config({path:'./.env'})
const AWS = require('aws-sdk')
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const fs = require('fs')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region:process.env.AWS_REGION
})

let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        let s3 = new AWS.S3({ apiVersion: '2006-03-01' });
        // let fileStream = fs.createReadStream(file.buffer)
        // console.log(fileStream)
        var uploadParams = {
            // ACL: "public-read",
            Bucket: "ysdbresources",
            Key:   file.originalname,
            Body: file.buffer
        }

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            // console.log("File Uploaded Succesfully")
            return resolve(data.Location)
        })
    })
}

// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();

exports.downloadImageFromBucket = (Bucket,  Key, res) => {
  const params = {
    Bucket: Bucket,
    Key:  Key
  };
  const s3Stream = s3.getObject(params).createReadStream();
  s3Stream.on('error', err => {
    console.log(err);
    res.status(500).send('Error retrieving image from S3 bucket');
  });
  res.set('Content-Type', 'image/jpeg');
  s3Stream.pipe(res);
};



module.exports = uploadFile 