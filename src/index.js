//create port 
const express = require('express');
const index = express();
require('../src/database/db')
const router = require('../src/router/route')
const routerPost = require('../src/router/posts')
const port = 8000;

index.use(express.json());

// use router
index.use("/employee", router)
index.use("/employees", routerPost)
//listen to port 
index.listen(port, () =>{
    console.log(`connected port ${port}`)
})