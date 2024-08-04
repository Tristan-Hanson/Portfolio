const {S3Client} = require('@aws-sdk/client-s3');
require('dotenv').config();

const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if(!accessKey || !secretAccessKey){
    console.error("AWS credentials are not set");
    process.exit(1);
};

const s3Project = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion,
    endpoint: `https://s3.${bucketRegion}.amazonaws.com`
});

module.exports = s3Project;