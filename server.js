var express = require('express');
var cors = require('cors');
const multer = require("multer");
const upload = multer({dest: "files/"});
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.get("/api/hello", (req, res) => {
    return res.send("Hello");
})

app.post("/api/fileanalyse", upload.any(), (req, res) => {
    if (!req.files || !req.files[0]) return res.json({});
    return res.json({
        name: req.files[0].originalname,
        type: req.files[0].mimetype,
        size: req.files[0].size
    })
})


const port = process.env.PORT || 3060;
app.listen(port, function () {
    console.log('Your app is listening on port ' + port)
});
