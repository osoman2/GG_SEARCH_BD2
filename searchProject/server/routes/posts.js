const fs = require('fs');
const express = require('express');
const router = express.Router();

const axios = require('axios');

const PostAPI = 'https://jsonplaceholder.typicode.com';

router.get("/posts", function(req, res){
    const data = JSON.parse(fs.readFileSync('db.json'));
    res.json(data);
})

/*router.get('/posts', (req, res)=>{
    axios.get(`${PostAPI}/posts`).then(posts=>{
        //console.log(posts.data);
        res.status(200).json(posts.data);
    }).catch(error =>{
        res.status(500).send(error);
    })
});*/

module.exports = router;
