require('dotenv').config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");



const BucketName = process.env.S3_BUCKET_NAME;
const BucketReg = process.env.S3_BUCKET_REG;
const BucketAK = process.env.S3_BUCKET_ACESS_KEY;
const BucketSK = process.env.S3_BUCKET_SECRET_KEY;


const s3 = new S3(
    {
        BucketReg,BucketAK,BucketSK
    }
);

function UploadImage(file)
{
    console.log(file);
    const FileStream = fs.createReadStream(file.path);
    const params = {
        Bucket : BucketName,
        Body : FileStream,
        Key : file.originalname
    }

    return s3.upload(params).promise();
}

exports.UploadImage = UploadImage;

function GetImage(filename)
{
    const params = 
    {
        Bucket : BucketName,
        Key : filename
    }
    
    
    const result = s3.getObject(params, (err, data) => {
        if (err) {
            console.log("errorrrr");
          return;
        }
        const objectData = data.Body.toString('utf-8');
        return objectData;
      });

    return result;
}

exports.GetImage = GetImage;
