const express = require('express');
const path = require('path');
const app = express();

//Getting out POSTS routes
const routes = require('./server/routes/posts');

//using middleware
app.use(express.static(path.join(__dirname, 'dist/searchProject')));
app.use('/routes', routes);

//Catch all other routes request and return it to the index
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'dist/searchProject/index.html'))
});

const port = 4600;

app.listen(port, (req, res)=>{
    console.log(`RUNNING on port ${port}`);
})