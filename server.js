const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db/db");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const config = require("./config");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
// multer looks for name equals file
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get("/images", (req, res) => {
    db.getImages().then(results => {
        res.json(results);
    });
});

app.post("/upload", s3.upload, uploader.single("file"), function(req, res) {
    console.log(req.file);
    db.addImage(
        config.s3Url + req.file.filename,
        req.body.username,
        req.body.title,
        req.body.description
    ).then(image => {
        console.log("image:", image);
        res.json({
            success: true,
            image: image
        });
    });
});

app.listen(8080, () => console.log(`I'm listening`));
