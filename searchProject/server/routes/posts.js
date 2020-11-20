const fs = require('fs');
const express = require('express');
const router = express.Router();

const axios = require('axios');

router.get("/posts", function(req, res){
    const data = JSON.parse(fs.readFileSync('db.json'));
    res.json(data);
})

module.exports = router;
