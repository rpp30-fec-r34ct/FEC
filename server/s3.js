const token = require('./config.js')
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

const bucketName = token.AWS_BUCKET_NAME
const region = token.AWS_BUCKET_REGION
const accessKeyId = token.AWS_ACCESS_KEY
const secretAccessKey = token.AWS_SECRET_KEY

const s3 = new S3({

  region,
  accessKeyId,
  secretAccessKey
})

const uploadToS3 = (file) => {
  const fileStream = fs.createReadStream(file.path)

  const fileDetails = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(fileDetails).promise()
}

module.exports = { uploadToS3 }
