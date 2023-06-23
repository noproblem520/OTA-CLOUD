var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("OKOK");
});

router.get('/test', (req, res) => {

  try {
    const parentDirectoryPath = path.dirname(__dirname);
    const directoryPath = path.join(parentDirectoryPath, 'public', 'updatepackages');

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files",
        });
      } else {
        res.send(files);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Unable to scan files",
    });
  }

});


module.exports = router;
