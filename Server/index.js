const express = require('express')
const app = express()
const cors=require('cors')
require("dotenv").config()
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const PORT = process.env.PORT || 8000;
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
});


const upload = multer({
    storage: multerS3({
        s3: new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }),
        bucket: process.env.AWS_S3_BUCKET,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
});

app.post('/uploadvideo', upload.array('video', 10), (req, res) => {
    res.send('Videos uploaded');
});

app.post('/uploadjson', (req, res) => {
    console.log(req.body);
    res.send('JSON object created');
});

app.get('/videos', (req, res) => {
    const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
    };
    s3.listObjects(params, (err, data) => {
        if (err) return res.status(500).send(err);
        const videos = data.Contents.map(({ Key, ETag, Size, LastModified }) => ({
            Key,
            ETag,
            Size,
            LastModified,
            url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${Key}`,
        }));
        res.send(videos);
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port @ http://localhost:${PORT}`);
});