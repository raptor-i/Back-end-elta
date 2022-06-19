const express = require("express");
const app = express();
const cors = require("cors")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


const {UploadImage, GetImage} = require("./S3Bucket");

app.use(cors());

app.post("/image", upload.single("image"),async (req,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const file = req.file;
    const result = await UploadImage(file);
    console.log(result);
    res.send("File " + result.Key +" Uploaded Successfully");
});

app.get("/image/:filename",(req,res) =>
{
    const filename =req.params.filename;
    console.log(req.params.filename);
    const result = GetImage(filename);

    if(result)
    {
        res.send(" result : "+result);
        return;
    }
    res.send("No such a image!");
    
});

app.listen(5000, () => {console.log("Server Up")});