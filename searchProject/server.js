const express = require('express');
const path = require('path');
const app = express();

const routes = require('./server/routes/posts');

app.use(express.static(path.join(__dirname, 'dist/searchProject')));
app.use('/routes', routes);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'dist/searchProject/index.html'))
});

const port = 4600;

app.listen(port, (req, res)=>{
    console.log(`RUNNING on port ${port}`);
})